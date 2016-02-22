
hideout_hideouts = []; // [squad, position, direction, modules, cache]
hideout_hideoutRadius = 20;

hideout_getHideoutForSquad = {
  private ["_squad", "_hideout"];
  _squad = _this select 0;
  _hideout = [];

  {
    if ((_x select 0 select 0) == (_squad select 0)) exitWith {
      _hideout = _x;
    };
  } forEach hideout_hideouts;

  _hideout;
};

hideout_joinInProgress = {

};

hideout_getHideoutCacheForSquad = {
  private ["_squad"];
  _squad = _this select 0;

  [_squad] call hideout_getHideoutForSquad select 4;
};

hideout_createHideoutForSquads = {
 {
   [_x] call hideout_createHideoutForSquad;
 } forEach squads;
};

hideout_getClosestHideout = {
  private ["_position", "_closest"];
  _position = _this select 0;
  _closest = nil;
  
  {
    if (isNil{_closest}) then {
      _closest = _x;
    };

    if (_x select 1 distance _position < _closest select 1 distance _position) then {
      _closest = _x;
    };
  } forEach hideout_hideouts;

  _closest;
};

hideout_distanceFromClosestHideout = {
  private ["_distance", "_position"];
  _position = _this select 0;
  _distance = 999999;

  {
    if (_x select 1 distance _position < _distance) then {
      _distance = _x select 1 distance _position;
    };
  } forEach hideout_hideouts;

  _distance;
};

hideout_createHideoutForSquad = {
  private ["_startPosition", "_squad"];
  _squad = _this select 0;
  _startPosition = [_squad] call getSquadStartingPosition;

  _hideoutPosition = [_startPosition] call emptyPositionFinder_findHideoutPosition;
  [_squad, _hideoutPosition] call hideout_createHideout;
};

hideout_findHouseForHideout = {
  private ["_position", "_buildings", "_building", "_result", "_searchRadius"];
  _position = _this select 0;
  _searchRadius = [_this, 1, 50] call BIS_fnc_param;
  _result = nil;

  _buildings = nearestObjects [_position, ["house"], _searchRadius];

  {
    _building = _x;
    
    if ([getPos _building] call depotPositions_checkIsSuitableForDepot 
      && count (_building call BIS_fnc_buildingPositions) > 2) exitWith {
      _result = _building;
    };
  } forEach _buildings;


  if (isNil{_result}) exitWith {
    [_position, _searchRadius + 500] call hideout_findHouseForHideout;
  };

  _result;
};

hideout_createHideout = {
  private ["_squad", "_building", "_position", "_direction", "_hideoutData", "_cache"];
  _squad = _this select 0;
  _building = [_this select 1] call hideout_findHouseForHideout;
  _position = getPosASL _building;
  _direction = getDir _building;
  
  [_position] call depotPositions_registerPosition;

  [_squad, _position] call hideout_createHidoutMarkerForPlayers;
  _cache = [_squad, ([_building] call BIS_fnc_buildingPositions) call BIS_fnc_selectRandom, _direction] call hideout_createHideoutCache;
  [
    _squad,
    _position
  ] call hideout_createVehicles;
  [_squad, _position] call hideout_createHideoutTrigger;

  _hideoutData = [
    _squad,
    _position,
    _direction,
    [],
    _cache
  ];

  hideout_hideouts pushBack _hideoutData;
};

hideout_findEmptyPositionInHideout = {
  private ["_initialPosition", "_position", "_range", "_distance", "_minRange", "_nearestObject"];

  _initialPosition = _this select 0;
  _distance = [_this, 1, 3] call BIS_fnc_param;
  _range = [_this, 2, 10] call BIS_fnc_param;
  _minRange = [_this, 3, 10] call BIS_fnc_param;
  _position = [_initialPosition, _minRange, _range, 3, 0, 20, 0, [], [[0,0,0], [0,0,0]]] call BIS_fnc_findSafePos;

  if (_position select 0 == 0 && _position select 1 == 0 && _position select 2 == 0 ) exitWith {
    [_initialPosition, _distance, _range + 5] call hideout_findEmptyPositionInHideout;
  };

  _nearestObject = nearestObject _position;
  if (_nearestObject distance2D _position < 4) exitWith {
    [_position, _distance, _range] call hideout_findEmptyPositionInHideout;
  };

  _position;
};

hideout_createVehicles = {
  private ["_squad", "_initialPosition", "_vehicle", "_vehicleClasses", "_direction"];
  _squad = _this select 0;
  _initialPosition = _this select 1;
  _vehicleClasses = [_squad] call equipment_getVehicles;
  _direction = random 360;

  if (count _vehicleClasses == 0) then {
    _vehicleClasses pushBack "C_Hatchback_01_F";
  };

  {
    private ["_position", "_vehicleClass"];
    _vehicleClass = _x;
    _position = [_initialPosition, 5] call hideout_findEmptyPositionInHideout;
    

    if (! isNil{_position}) then {
      _vehicle = [
        _vehicleClass,
        _position,
        _direction
      ] call vehicle_spawnVehicle;

      [_vehicle, _squad] call vehicle_setOwner;
    } else {
      [_squad, [_vehicleClass]] call addDisconnectedLoot;
    };
    
  } forEach _vehicleClasses;

};

hideout_createHidoutMarkerForPlayers = {
  private ["_position", "_squad"];
  _squad = _this select 0;
  _position = _this select 1;
  
  {
    [[_position], "markers_createHideoutMarker", _x, false, true] call BIS_fnc_MP;
  } forEach ([_squad] call getPlayersInSquad);  
};

hideout_createHidoutMarkerForPlayer = {
  private ["_unit", "_hideout", "_squad"];
  _unit = _this select 0;
  _hideout = [([_unit] call getSquadForUnit)] call hideout_getHideoutForSquad;
  [[(_hideout select 1)], "markers_createHideoutMarker", _unit, false, true] call BIS_fnc_MP;
};

hideout_createHideoutCache = {
  private ["_squad", "_moduleData", "_box", "_equipment", "_weapons", "_direction", "_position"];
  _squad = _this select 0;
  _position = _this select 1;
  _direction = _this select 2;
  
  _box = createVehicle ["Box_NATO_Wps_F", [0,0,3000], [], 0, "FLYING"];
  _box setDir _direction;
  _box setPos _position;
  _box allowDamage false;
  
  clearWeaponCargoGlobal _box;
  clearMagazineCargoGlobal _box;
  clearItemCargoGlobal _box;
  clearBackpackCargoGlobal _box;

  _equipment = [_squad] call getSquadEquipment;
  
  if ([_squad, "overrideHideoutCache", [_squad, _equipment, _box]] call objectiveController_callSquadObjective) exitWith {
    _box;
  };

  [_equipment, _box, _squad] call equipment_equipHideoutCache;
  
  
  /*
  _box addItemCargoGlobal ['ACE_EarPlugs', 12];
  _box addItemCargoGlobal ['ACE_quikclot', 40];
  //_box addItemCargoGlobal ['ACE_fieldDressing', 40];
  _box addItemCargoGlobal ['ACE_tourniquet', 10];
  _box addItemCargoGlobal ['ACE_morphine', 10];
  */

  _box addItemCargoGlobal ['FirstAidKit', 8];
  _box addItemCargoGlobal ['V_Rangemaster_belt', 8];
  _box addWeaponCargoGlobal ['CUP_arifle_AKS74U', 4];
  _box addMagazineCargoGlobal ['CUP_30Rnd_545x39_AK_M', 20];
  _box addBackpackCargoGlobal ['B_AssaultPack_khk', 3];
  _box addBackpackCargoGlobal ['B_Carryall_khk', 3];
  _box addWeaponCargoGlobal ['CUP_sgun_M1014', 1];
  _box addMagazineCargoGlobal ['CUP_8Rnd_B_Beneli_74Slug', 5];

  //_box addItemCargoGlobal ['ACE_RangeTable_82mm', 1];
  
  _box setVariable ['squadId', ([_squad] call getSquadId), true];
  _box;

};

hideout_createHideoutTrigger = {
  private ["_squad", "_position", "_trigger"];
  _squad = _this select 0;
  _position = _this select 1;
  
  _trigger = createTrigger["EmptyDetector", _position];
  _trigger setTriggerArea[hideout_hideoutRadius, hideout_hideoutRadius, 0, false];
  _trigger setTriggerActivation["ANY", "PRESENT", true];
  _trigger setTriggerStatements[
    "round (time % 1)==0",
    format ["[thislist, %1] call hideout_hideoutTriggerActivate;", str ([_squad] call getSquadId)], 
    ""
   ]; 
};

hideout_hideoutTriggerActivate = {
  private ["_unitsPresent", "_squadId", "_squad", "_playersInSquad", "_playersAtHideout", "_hideout"];
  _unitsPresent = _this select 0;
  _squadId = _this select 1;
  _squad = [_squadId] call getSquadById;
  _playersInSquad = [_squad] call getPlayersInSquad;
  _playersAtHideout = [_squad] call getPlayersAtHideout;
  
  {
    if (_x in _unitsPresent) then {
      if (! (_x in _playersAtHideout)) then {
        [["You are in your base", "hideout"], "client_textMessage", _x, true, false] call BIS_fnc_MP;
        [_x, 'onEnterHideout', [_x]] call objectiveController_callUnitObjective;
        [_x] call outpost_onEnterHideout;
      };
    };
    
    if (alive _x && ! missionControl_objectivesGenerated && ! (_x in _unitsPresent)) then {
      [_unit, _squad] call hideout_movePlayerToHideout;
    };

    if (_x in _playersAtHideout &&  ! (_x in _unitsPresent)) then {
      [_x, 'onLeaveHideout', [_x]] call objectiveController_callUnitObjective;
      [_x] call outpost_onLeaveHideout;
    };
   
  } forEach _playersInSquad;
  
  [_squad, _unitsPresent] call setPlayersAtHideout;
};

hideout_movePlayersToHideout = {
  {
    [_x] call hideout_moveSquadToHideout;
  } forEach squads;
};

hideout_movePlayerToHideout = {
  private ["_squad", "_hideout", "_position", "_unit", "_buildingPos"];
  _unit = _this select 0;
  _squad = _this select 1;
  _hideout = [_squad] call hideout_getHideoutForSquad;
  _position = _hideout select 1;
  _building = nearestBuilding _position;

  _buildingPos = ([_building] call BIS_fnc_buildingPositions) call BIS_fnc_selectRandom;
  _unit setPos _buildingPos;
};

hideout_moveSquadToHideout = {
  private ["_squad", "_hideout", "_position"];
  _squad = _this select 0;
  _hideout = [_squad] call hideout_getHideoutForSquad;
  
  {
    [_x, _squad] call hideout_movePlayerToHideout;
  } forEach ([_squad] call getPlayersInSquad);
};

hideout_isInHideout = {
  private ["_unit", "_squad", "_hideout"];
  _unit = _this select 0;
  _squad = [_unit] call getSquadForUnit;

  if (isNil{_squad}) exitWith {false;};

  _hideout = [_squad] call hideout_getHideoutForSquad;
  
  if ((_hideout select 1) distance2D _unit > hideout_hideoutRadius) exitWith {false;};
  
  true;
};

hideout_bodyIsInHideout = {
  private ["_body", "_uid", "_squad", "_hideout"];
  _body = _this select 0;
  _uid = _this select 1;
  _squad = [_uid] call getSquadForUid;

  if (isNil{_squad}) exitWith {false;};
  
  _hideout = [_squad] call hideout_getHideoutForSquad;
  
  if ((_hideout select 1) distance2D _body <= hideout_hideoutRadius) exitWith {true;};
  
  if (([_body] call outpost_getDistanceToClosestActiveOutpost) <= hideout_hideoutRadius) exitWith {
    true;
  };

  if (call hasOnlyOneSquadLeft) exitWith {
    true;
  };

  false;
};