objective_supply_usedBuildings = [];


objective_supply_construct = {
  private ["_depots", "_players"];

  call objective_supply_constructDepots;
  _depots = depots_supply_depots; 
  if (count _depots > 0) then {
    call objective_supply_constructMarkers;
  };
};


objective_supply_onObjectivesCreated = {};

objective_supply_displayName = {
  "Supply run";
};

objective_supply_joinInProgress = {
  private ["_unit"];
  _unit = _this select 0;
  [_unit] call objective_supply_setPlayerRating;
  //TODO: JIP supply markers  
};

objective_supply_setPlayerRating = {};

objective_supply_validate = {
  true;
};

objective_supply_insideDepot = {};

objective_supply_overridesAppearance = {
  false;
};

objective_supply_defaultIfNeccessary = {};

objective_supply_overrideMoveToHideout = {
  false;
};

objective_supply_overrideHideoutCache = {
  false;
};

objective_supply_onKilled = {};

objective_supply_onDisconnected = {};

objective_supply_canOpenLootBoxes = {
  true;
};

objective_supply_constructSquadMarkers = {
  private ["_squad"]; 
  _squad = _this select 0;

  {
    private ["_building", "_squadData", "_intelPositions"];
    _building = _x select 0;
    _intelPositions = _x select 2;

    _squadData = [_squad, _building] call objective_supply_getSquadData;

    {
      [
        [
          _building,
          _squadData select 3,
          _squadData select 4
        ], 
        "markers_createSupplyDepotMarkers",
        _x,
        true,
        true
      ] call BIS_fnc_MP;
    } forEach ([_squad] call getPlayersInSquad);

  } forEach objective_supply_data;
};

objective_supply_constructMarkers = {
  private ["_positions", "_intelBoxes", "_players"];
  _positions = [];
  _intelBoxes = [];
  _players = [['guard', 'raid']] call objectiveController_getPlayersWithoutObjectives;
  

  {
    _positions pushBack (_x select 1);
    _intelBoxes = _intelBoxes + (_x select 2);
  } forEach objective_supply_data;
  
  {
    [[_intelBoxes], "markers_createSupplyBriefring", _x, true, true] call BIS_fnc_MP;
  } forEach _players;
};

objective_supply_data = []; //building, areaCenter, intelBoxes, squadData

objective_supply_getSquadData = { // squadId, intelAmount, collectedIntelPosition, markerPosition, markerRadius
  private ["_squad", "_building"];
  _squad = _this select 0;
  _building = _this select 1;
  _result = [];

  {
    _supplyData = _x;

    if (_supplyData select 0 == _building) then {
      {
        _squadData = _x;
        if ((_squadData select 0) == ([_squad] call getSquadId)) then {
          _result = _squadData;
        };
      } forEach (_supplyData select 3);

      if (count _result == 0) then {
        _result = [[_squad] call getSquadId, 0, [], [], 0];
        (_supplyData select 3) pushBack _result;
      }
    };
  } forEach objective_supply_data;

  _result;
};

objective_supply_constructDepots = {

  {
    private ["_building", "_objectData", "_intelBoxes", "_areaCenter"];
    _building = _x select 0;

    _areaCenter = [_building, 1000] call SHK_pos;

    [_building] call objective_supply_placeLootBoxes;
    [_building, objective_supply_cleanUpBox, [_building]] call buildingDestroyer_init;
    _intelBoxes = [_building, _areaCenter] call objective_supply_createIntelBoxes;
    [_building] spawn objective_supply_destroyDepot;
    
    objective_supply_data pushBack [_building, _areaCenter, _intelBoxes, []];

  } forEach depots_supply_depots;
};

objective_supply_createIntelBox = {
  private ["_position", "_direction", "_addKey"];
  _position = _this select 0;
  _direction = _this select 1;
  _addKey = _this select 2;

  _object = createVehicle ["Box_NATO_Wps_F", [0,0,3000], [], 0, "FLYING"];
  _object setDir _direction;
  _object setPos _position;

  clearWeaponCargoGlobal _object;
  clearMagazineCargoGlobal _object;
  clearItemCargoGlobal _object;
  clearBackpackCargoGlobal _object;

  [_object, "lootItems_populateSupplyIntelBox", []] call lootItems_populateSupplyBox;
  if (_addKey) then {
    _object addItemCargoGlobal ["IKRS_supply_key", 1];
  }
};

"gatherSupplyIntel" addPublicVariableEventHandler {
  private ["_unit", "_position"];
  _unit = _this select 1 select 0;
  _position = _this select 1 select 1;

  [_unit, _position] call objective_supply_gatherIntel;
};

objective_supply_gatherIntel = {
  private ["_unit", "_position", "_intelAmount", "_mapPosition"];
  _unit = _this select 0;
  _position = _this select 1;
  _squad = [_unit] call getSquadForUnit;
  _intelAmount = (random 5) + 20;

  if (_unit distance2D _position > 2) exitWith {};
 
  {
    _building = _x select 0;
    {
      if (_position distance2D _x < 1) exitWith {
        [_squad, _intelAmount, _position, _building, _unit] call objective_supply_addIntel;
      };
    } forEach (_x select 2);
  } forEach objective_supply_data;

};


objective_supply_addIntel = {
  private ["_squad", "_amount", "_position", "_building", "_unit", "_collectedIntel", "_collected"];
  _squad = _this select 0;
  _amount = _this select 1;
  _position = _this select 2;
  _building = _this select 3;
  _unit = _this select 4;
  _collected = false;

  _squadData = [_squad, _building] call objective_supply_getSquadData;

  {
    if (_x distance2D _position < 1) exitWith {
      [["You have already collected this intel.", 'supplyIntel'], "client_textMessage", _unit, true, false] call BIS_fnc_MP;
      _collected = true;
    };
  } forEach (_squadData select 2);

  if (_collected) exitWith {};

  [["Intel collected.", 'supplyIntel'], "client_textMessage", _unit, true, false] call BIS_fnc_MP;

  _collectedIntel = _squadData select 1;
  _squadData set [1, _collectedIntel + _amount];
  (_squadData select 2) pushBack _position;
  [_squadData, _collectedIntel, _building, _squad] call objective_supply_updateIntelIfneeded;
};

objective_supply_updateIntelIfneeded = {
  private ["_squadData", "_oldAmount", "_building", "_position", "_players"];
  _squadData = _this select 0;
  _oldAmount = _this select 1;
  _building = _this select 2;
  _squad = _this select 3;
  _currentAmount = _squadData select 1;
  _players = [_squad] call getPlayersInSquad;


  systemChat str _currentAmount;
  if (_oldAmount < 100 && _currentAmount >= 100) exitWith {
    _squadData set [3, getPos _building];
    _squadData set [4, 0];
    [_squad] call objective_supply_constructSquadMarkers;
    {
      [["New intel on depot position received.", 'supplyIntel'], "client_textMessage", _x, true, false] call BIS_fnc_MP;
    } forEach _players;
  };

  if (_oldAmount < 80 && _currentAmount >= 80 && _currentAmount < 90) exitWith {
    _position = [_building, 100] call SHK_pos;

    _squadData set [3, _position];
    _squadData set [4, 50];
    [_squad] call objective_supply_constructSquadMarkers;
    {
      [["New intel on depot position received.", 'supplyIntel'], "client_textMessage", _x, true, false] call BIS_fnc_MP;
    } forEach _players;
  };

  if (_oldAmount < 75 && _currentAmount >= 75 && _currentAmount < 100) exitWith {
    _position = [_building, 100] call SHK_pos;

    _squadData set [3, _position];
    _squadData set [4, 100];
    [_squad] call objective_supply_constructSquadMarkers;
    {
      [["New intel on depot position received.", 'supplyIntel'], "client_textMessage", _x, true, false] call BIS_fnc_MP;
    } forEach _players;
  };

  if (_oldAmount < 50 && _currentAmount >= 50 && _currentAmount < 75) exitWith {
    _position = [_building, 500] call SHK_pos;

    _squadData set [3, _position];
    _squadData set [4, 250];
    [_squad] call objective_supply_constructSquadMarkers;
    {
      [["New intel on depot position received.", 'supplyIntel'], "client_textMessage", _x, true, false] call BIS_fnc_MP;
    } forEach _players;
  };
};

/*

    _object = createVehicle ["Land_SatellitePhone_F", [0,0,3000], [], 0, "FLYING"];
    _object setDir _direction;
    _object setPosASL _position;
    _object enableSimulationGlobal false;
*/

objective_supply_createIntelMap = {
  private ["_position", "_direction"];
  _position = _this select 0;
  _direction = _this select 1;
  _objectClass = ["IKRS_File1_F", "IKRS_File2_F", "IKRS_Photos_F"] call BIS_fnc_selectRandom;
  _position set [2, (_position select 2) + 0.5];
  _position = [ATLToASL _position] call findFloor;
  _object = createVehicle [_objectClass, [0,0,0], [], 0, "CAN_COLLIDE"];
  _position set [2, (_position select 2) + 0.10];
  _object setPosASL _position;
  _object setDir _direction;
  _object enableSimulation false;
  _object allowDamage false;

  [[_object], "client_addSupplyIntelAction", true, true, true] call BIS_fnc_MP;
};

objective_supply_empties = [];
objective_supply_crates = [];
objective_supply_intels = [];


objective_supply_createIntelBoxes = {
  private [
    "_building",
    "_intelBoxes",
    "_center",
    "_buildings",
    "_searchRadius",
    "_intels",
    "_crates",
    "_empties",
    "_keys"
  ];
  _building = _this select 0;
  _center = _this select 1;
  _intelBoxes = [];
  _buildings = [];
  _searchRadius = 1000;
  _intels = 0;
  _crates = 0;
  _empties = 0;
  _keys = 0;
  
  while {count _buildings < 100} do {
    _buildings = nearestObjects [_center, ["house"], _searchRadius];
    _searchRadius = _searchRadius + 500;

    _buildings = [_buildings, {
      count ([_this] call BIS_fnc_buildingPositions) > 0 && ! ([_this] call depots_isDepot);
    }] call AEX_filter;
  };
  
  _buildings = _buildings call objective_supply_arrayShuffle;

  while {_intels < 20 || _crates < 20 || _empties < 20} do {
    private ["_building", "_position", "_direction", "_object", "_added"];
    _building = _buildings deleteAt 0;
    _position = ([_building] call BIS_fnc_buildingPositions) call BIS_fnc_selectRandom;
    _direction = direction _building;
    _added = false;

    if (_intels < 20) then {
      _intels = _intels + 1;
      [_position, _direction] call objective_supply_createIntelMap;
      _added = true;
      objective_supply_intels pushBack _position;
    };

    if (_crates < 20 && ! _added) then {
      private ["_addKey"];
      _addKey = false;

      if (_keys < 10) then {
        _keys = _keys + 1;
        _addKey = true;
      };

      _crates = _crates + 1;
      [_position, _direction, _addKey] call objective_supply_createIntelBox;
      _added = true;
      objective_supply_crates pushBack _position;
    };

    if (_empties < 20 && ! _added) then {
      _empties = _empties + 1;

      objective_supply_empties pushBack _position;
    };

    objective_supply_usedBuildings pushBack _building;

    _intelBoxes pushBack _position;
  };

  _intelBoxes;
};

objective_supply_destroyDepot = {
  sleep (3000 + random 300);
  [_this select 0] call airStrike_createFlyOverAndBombingRun;
};

objective_supply_placeLootBoxes = {
  private ["_building", "_boxes", "_droneUplinkPosition"];
  _building = _this select 0;
  _boxes = [];
  _droneUplinkPosition = nil;

  _buildingPositions = ([_building] call BIS_fnc_buildingPositions) call objective_supply_arrayShuffle;

  for "_i" from 0 to 3 do {
    private ["_direction", "_position"];
    _position = AGLToASL (_buildingPositions select _i);
    _direction = direction _building; 


    if (_i < 2) then {
      _boxes pushBack ([_position, _direction] call lootbox_createSupplyBox);
    };

    
    if (_i == 2 && count squads > 1) then {
      [_position, _direction] call lootbox_createAdvancedSupplyBox;
    };
  };

};



objective_supply_arrayShuffle = {
  private ["_array","_newArray"];
  _array = _this;
  _newArray = [];
  while {count _array > 0} do {
    _newArray pushBack (_array deleteAt floor random count _array);
  };
  
  _newArray;
};

objective_supply_cleanUpBox = {
  private ["_building"];
  _building = _this select 0;
  [_building, 20] call lootBox_deleteBoxesAround;
};