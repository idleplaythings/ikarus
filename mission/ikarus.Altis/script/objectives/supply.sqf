
objective_supply_construct = {
  private ["_depots", "_players"];

  call objective_supply_constructDepots;
  _depots = depots_supply_depots; 
  _players = [['guard', 'raid']] call objectiveController_getPlayersWithoutObjectives;
  if (count _depots > 0) then {
    [_depots, _players] call objective_supply_constructMarkers;
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
  [[objective_supply_markerPositions], "markers_createSupplyBriefring", _unit, false, true] call BIS_fnc_MP;
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

objective_supply_markerPositions = [];

objective_supply_constructMarkers = {
  private ["_depots", "_players", "_radius", "_offset", "_positions"];
  _depots = _this select 0;
  _players = _this select 1;
  _radius = 500;
  _offset = _radius / 2;
  _positions = [];
  
  {
    private ["_building"];
    _building = _x select 0;
    _position = [_building, _offset] call SHK_pos;
    _positions pushBack _position;
  } forEach _depots;

  {
    [[_positions], "markers_createSupplyBriefring", _x, false, true] call BIS_fnc_MP;
  } forEach _players;

  objective_supply_markerPositions = _positions;
};

objective_supply_constructDepots = {
  {
    private ["_building", "_objectData"];
    _building = _x select 0;
    _objectData = _x select 1;

    [_building] call objective_supply_createVehicle;
    [_building, _objectData] call objective_supply_placeLootBoxes;
    [_building, objective_supply_cleanUpBox, [_building]] call buildingDestroyer_init;
    [_building] spawn objective_supply_destroyDepot;

  } forEach depots_supply_depots;
};

objective_supply_createVehicle = {
  private ["_depot", "_vehiclePos", "_vehicleClass", "_vehicle"];
  _depot = _this select 0;
  _vehicleClass = call objective_supply_getDepotCarClass;
  _vehiclePos = getPos _depot findEmptyPosition [10,30,_vehicleClass];

  if (count _vehiclePos > 0) then {
    _vehicle = createVehicle [_vehicleClass, _vehiclePos, [], 0, "none"];
    [_vehicle] call vehicle_preventGuardUse;
  };  
};


objective_supply_getDepotCarClass = {
  private ["_cars"];
  _cars = [
    //"C_SUV_01_F", "C_SUV_01_F", "C_SUV_01_F",
    "C_Offroad_01_F", "C_Offroad_01_F",
    "C_Van_01_box_F","C_Van_01_transport_F","C_Van_01_box_F","C_Van_01_transport_F","C_Van_01_box_F",
    "UAZ_Unarmed",
    "BAF_Offroad_D",
    "BAF_Offroad_W"
  ];
  
  _cars call BIS_fnc_selectRandom;
};

objective_supply_destroyDepot = {
  sleep (3000 + random 300);
  [_this select 0] call airStrike_createFlyOverAndBombingRun;
};

objective_supply_placeLootBoxes = {
  private ["_building", "_objectData", "_boxes"];
  _building = _this select 0;
  _objectData = _this select 1;
  _boxes = [];
  
  
  _objectData = [_objectData, 3] call depotPositions_getRandomPlaceholdersFromObjects;
  
  for "_i" from 0 to 2 do {
    private ["_data", "_directionAndPosition", "_direction", "_position", "_box"];
    _data = _objectData select _i;
    _position = getPosASL _data;
    _direction = direction _data; 
    
    if (_i < 2) then {
      _boxes pushBack ([_position, _direction] call lootbox_createSupplyBox);
    } else {
      if (count squads > 1) then {
        [_position, _direction] call lootbox_createAdvancedSupplyBox;
      }
    };
  };

  [(_boxes call BIS_fnc_selectRandom), ['IKRS_signal_device']] call lootBox_addExtraLoot;

};

objective_supply_cleanUpBox = {
  private ["_building"];
  _building = _this select 0;
  [_building, 20] call lootBox_deleteBoxesAround;
};