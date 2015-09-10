
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
  private ["_unit"];
  _unit = _this select 0;

  {
    [_x select 0, "joinInProgress", [_unit, _x select 2]] call baseModule_callModule;
  } foreach ([([_unit] call getSquadForUnit)] call hideout_getHideoutForSquad select 3);

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

hideout_createHideout = {
  private ["_squad", "_position", "_direction", "_modules", "_hideoutData", "_moduleData", "_cache"];
  _squad = _this select 0;
  _position = ATLToASL (_this select 1);
  _direction = 0;
  _modules = [_squad] call getHideoutModules;
  _moduleData = [_modules, _position, _direction] call baseModule_createBaseModules;

  [_squad, _position] call hideout_createHidoutMarkerForPlayers;
  _cache = [_squad, ([_position, _direction, _moduleData] call baseModule_getCacheLocation)] call hideout_createHideoutCache;
  [
    _squad,
    ([_position, _direction, _moduleData] call baseModule_getVehicleLocations),
    ([_position, _direction, _moduleData] call baseModule_getHeloLocations)
  ] call hideout_createVehicles;
  [_squad, _position] call hideout_createHideoutTrigger;

  _hideoutData = [
    _squad,
    _position,
    _direction,
    _moduleData,
    _cache
  ];

  {
    [_x select 0, "onHideoutCreated", [_hideoutData]] call baseModule_callModule;
  } forEach _moduleData;

  hideout_hideouts pushBack _hideoutData;
};

hideout_createVehicles = {
  private ["_squad", "_helicopters", "_vehicles", "_vehiclePositions", "_heloPositions", "_vehicle", "_vehicleClasses"];
  _squad = _this select 0;
  _vehiclePositions = _this select 1;
  _heloPositions = _this select 2;
  _helicopters = 0;
  _vehicles = 0;
  _vehicleClasses = [_squad] call equipment_getVehicles;


  if (count _vehicleClasses == 0) then {
    _vehicleClasses pushBack "C_Hatchback_01_F";
  };

  {
    private ["_position", "_vehicleClass", "_direction"];
    _position = nil;
    _direction = 0;
    _vehicleClass = _x;

    if (_vehicleClass isKindOf "Helicopter") then {
      if (count _heloPositions >= (_helicopters + 1)) then {
        _position = ASLToATL (_heloPositions select _helicopters select 0);
        _direction = _heloPositions select _helicopters select 1;
        _helicopters = _helicopters + 1;
      };
    } else {
      if (count _vehiclePositions >= (_vehicles + 1)) then {
        _position = ASLToATL (_vehiclePositions select _vehicles select 0);
        _direction = _vehiclePositions select _vehicles select 1;
        _vehicles = _vehicles + 1;
      };
    };

    if (! isNil{_position}) then {
      _vehicle = [
        _vehicleClass,
        _position,
        _direction
      ] call vehicle_spawnVehicle;
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
  private ["_squad", "_moduleData", "_box", "_equipment", "_weapons", "_directionAndPosition", "_direction", "_position"];
  _squad = _this select 0;
  _directionAndPosition = _this select 1;

  _position = _directionAndPosition select 0;
  _direction = _directionAndPosition select 1; 
  
  _box = createVehicle ["IG_supplyCrate_F", [0,0,3000], [], 0, "FLYING"];
  _box setDir _direction;
  _box setPosASL _position;
  
  clearWeaponCargoGlobal _box;
  clearMagazineCargoGlobal _box;
  clearItemCargoGlobal _box;
  clearBackpackCargoGlobal _box;

  _equipment = [_squad] call getSquadEquipment;
  
  if ([_squad, "overrideHideoutCache", [_squad, _equipment, _box]] call objectiveController_callSquadObjective) exitWith {
    _box;
  };

  [_equipment, _box, _squad] call equipment_equipHideoutCache;
  
  
  _box addItemCargoGlobal ['ACE_EarPlugs', 12];
  //_box addItemCargoGlobal ['ACE_quikclot', 40];
  _box addItemCargoGlobal ['ACE_fieldDressing', 40];
  //_box addItemCargoGlobal ['ACE_tourniquet', 10];
  _box addItemCargoGlobal ['ACE_morphine', 10];

  _box addItemCargoGlobal ['V_Rangemaster_belt', 8];
  _box addWeaponCargoGlobal ['hlc_rifle_aks74u', 4];
  _box addMagazineCargoGlobal ['hlc_30Rnd_545x39_B_AK', 20];
  _box addBackpackCargoGlobal ['B_AssaultPack_khk', 3];
  //_box addWeaponCargoGlobal ['CUP_sgun_M1014', 4];
  //_box addMagazineCargoGlobal ['CUP_8Rnd_B_Beneli_74Slug', 20];

  _box addItemCargoGlobal ['ACE_RangeTable_82mm', 1];
  
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
      };
    };
    
    if (alive _x && ! missionControl_objectivesGenerated && ! (_x in _unitsPresent)) then {
      [_unit, _squad] call hideout_movePlayerToHideout;
    };

    if (_x in _playersAtHideout &&  ! (_x in _unitsPresent)) then {
      [_x, 'onLeaveHideout', [_x]] call objectiveController_callUnitObjective;
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
  private ["_squad", "_hideout", "_position", "_unit"];
  _unit = _this select 0;
  _squad = _this select 1;
  _hideout = [_squad] call hideout_getHideoutForSquad;

  _unit setPosASL (_hideout select 1);
};

hideout_moveSquadToHideout = {
  private ["_squad", "_hideout", "_position"];
  _squad = _this select 0;
  _hideout = [_squad] call hideout_getHideoutForSquad;
  
  {
    _x setPosASL (_hideout select 1);
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