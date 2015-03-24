
hideout_hideouts = []; // [squad, position, direction, modules]
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

hideout_createHideoutForSquads = {
 {
   [_x] call hideout_createHideoutForSquad;
 } forEach squads;
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
  private ["_startPosition", "_squad", "_validation"];
  _squad = _this select 0;
  _startPosition = [_squad] call getSquadStartingPosition;
  _validation = {
    private ["_position"];
    _position = _this select 0;

    [_position] call hideout_distanceFromClosestHideout > 100;
  };

  _hideoutPosition = [_startPosition, 1000, _validation] call emptyPositionFinder_findClosest;
  [_squad, _hideoutPosition] call hideout_createHideout;
};

hideout_createHideout = {
  private ["_squad", "_position", "_direction", "_modules", "_hideoutData", "_moduleData"];
  _squad = _this select 0;
  _position = ATLToASL (_this select 1);
  _direction = 0;
  _modules = [_squad] call getHideoutModules;
  _moduleData = [_modules, _position, _direction] call baseModule_createBaseModules;

  [_squad, _position] call hideout_createHideoutTrigger;
  [_squad, _position] call hideout_createHidoutMarkerForPlayers;
  [_squad, ([_position, _direction, _moduleData] call baseModule_getCacheLocation)] call hideout_createHideoutCache;
  [_squad, ([_position, _direction, _moduleData] call baseModule_getVehicleLocations)] call hideout_createVehicles;

  _hideoutData = [
    _squad,
    _position,
    _direction,
    _moduleData
  ];

  hideout_hideouts pushBack _hideoutData;
};

hideout_createVehicles = {
  private ["_squad", "_positions", "_vehicle"];
  _squad = _this select 0;
  _positions = _this select 1;
  
  _vehicleClass = [_squad] call equipment_getVehicle;

  if (count _positions == 0) exitWith {
    [_squad, [_vehicleClass]] call addDisconnectedLoot;
  };

  if (_vehicleClass == "") then {
    _vehicleClass = "C_Hatchback_01_F";
  };

  _vehicle = createVehicle [_vehicleClass, [0,0,3000], [], 0, "FLY"];
  _vehicle setPosASL (_positions select 0 select 0);
  _vehicle setDir (_positions select 0 select 1);
};

hideout_createHidoutMarkerForPlayers = {
  private ["_position", "_squad"];
  _squad = _this select 0;
  _position = _this select 1;
  
  {
    [[_position], "markers_createHideoutMarker", _x, false, true] call BIS_fnc_MP;
  } forEach ([_squad] call getPlayersInSquad);  
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
  
  [_equipment, _box] call equipment_equipUnit;
  
  _box addItemCargoGlobal ['AGM_Bandage', 30];
  _box addItemCargoGlobal ['AGM_Morphine', 10];
  _box addItemCargoGlobal ['V_Rangemaster_belt', 8];
  _box addWeaponCargoGlobal ['CUP_smg_MP5A5', 4];
  _box addMagazineCargoGlobal ['CUP_30Rnd_9x19_MP5', 20];
  _box addWeaponCargoGlobal ['CUP_sgun_M1014', 4];
  _box addMagazineCargoGlobal ['CUP_8Rnd_B_Beneli_74Slug', 20];
  
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
  private ["_unitsPresent", "_squadId", "_squad", "_playersInSquad", "_playersAtHideout"];
  _unitsPresent = _this select 0;
  _squadId = _this select 1;
  _squad = [_squadId] call getSquadById;
  _playersInSquad = [_squad] call getPlayersInSquad;
  _playersAtHideout = [_squad] call getPlayersAtHideout;
  
  {
    if (_x in _unitsPresent) then {
      if (! (_x in _playersAtHideout)) then {
        ["You are at hideout", "hint", _x, false, true] call BIS_fnc_MP;
      };
    };
    
    if (! (_x in _unitsPresent)) then {
      if (_x in _playersAtHideout) then {
        ["", "hint", _x, true] call BIS_fnc_MP;
      };
    };
   
  } forEach _playersInSquad;
  
  [_squad, _unitsPresent] call setPlayersAtHideout;
};

hideout_movePlayersToHideout = {
  {
    if (! ([_x, "overrideMoveToHideout", [_x]] call objectiveController_callSquadObjective)) then {
      [_x] call hideout_moveSquadToHideout;
    };
  } forEach squads;
};

hideout_moveSquadToHideout = {
  private ["_squad", "_hideout", "_position", "_cache"];
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
  
  if (([(_hideout select 1), _unit] call BIS_fnc_distance2D) > hideout_hideoutRadius) exitWith {false;};
  
  true;
};

hideout_bodyIsInHideout = {
  private ["_body", "_uid", "_squad", "_hideout"];
  _body = _this select 0;
  _uid = _this select 1;
  _squad = [_uid] call getSquadForUid;
  diag_log "hideout_bodyIsInHideout";
  if (isNil{_squad}) exitWith {false;};
  diag_log "squad";
  diag_log squad;
  
  _hideout = [_squad] call hideout_getHideoutForSquad;
  
  if (([(_hideout select 1), _body] call BIS_fnc_distance2D) > hideout_hideoutRadius) exitWith {false;};
  
  diag_log "true";
  true;
};