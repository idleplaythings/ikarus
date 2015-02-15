
hideout_hideoutRadius = 20;

hideout_createHideoutForSquads = {
 {
   [_x] call hideout_createHideoutForSquad;
 } forEach squads;
};

hideout_createHideoutForSquad = {
  private ["_startPosition", "_squad", "_building", "_objectData", "_hideoutBuildingData", "_vehiclePos", "_cache"];
  _squad = _this select 0;
  _startPosition = [_squad] call getSquadStartingPosition;
  
  _hideoutBuildingData = [_startPosition] call hideout_findHouseSuitableForHideout;
  _building = _hideoutBuildingData select 0;
  _objectData = _hideoutBuildingData select 1;

  hideoutBuilding = _building;
  [_building, _objectData] call houseFurnisher_furnish;
  
  [_squad, _building] call setSquadHideoutBuilding;
  
  _vehiclePos = getPos _building findEmptyPosition [10,40,"I_Truck_02_covered_F"];
  if (count _vehiclePos > 0) then {
    createVehicle ["C_Hatchback_01_F", _vehiclePos, [], 0, "none"];
  };
  
  _vehiclePos = getPos _building findEmptyPosition [5,50,"C_Quadbike_01_F"];
  if (count _vehiclePos > 0) then {
    createVehicle ["C_Quadbike_01_F", _vehiclePos, [], 0, "none"];
  };
  
  _vehiclePos = getPos _building findEmptyPosition [5,50,"C_Quadbike_01_F"];
  if (count _vehiclePos > 0) then {
    createVehicle ["C_Quadbike_01_F", _vehiclePos, [], 0, "none"];
  };
  
  // create weapon cache
 
  _cache = [_squad, _building, _objectData] call hideout_createHideoutCache;
  [_squad, _cache] call setSquadCache;
  
  [_squad, _building] call hideout_createHideoutTrigger;
  [_squad, _building] call hideout_createHidoutMarkerForPlayers;
};

hideout_createHidoutMarkerForPlayers = {
  private ["_building", "_squad"];
  _squad = _this select 0;
  _building = _this select 1;
  
  {
    [[_building], "markers_createHideoutMarker", _x, false, true] call BIS_fnc_MP;
  } forEach ([_squad] call getPlayersInSquad);  
};

hideout_createHideoutCache = {
  private ["_squad", "_building", "_box", "_equipment", "_weapons", "_objectData"];
  _squad = _this select 0;
  _building = _this select 1;
  _objectData = _this select 2;
  _objectData = [_objectData, 1] call depotPositions_getRandomPlaceholdersFromObjects;

  private ["_directionAndPosition", "_direction", "_position"];
  _directionAndPosition = [_building, (_objectData select 0)] call houseFurnisher_getPosASLAndDirection;
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
  private ["_squad", "_building", "_trigger"];
  _squad = _this select 0;
  _building = _this select 1;
  
  _trigger = createTrigger["EmptyDetector", getPos _building];
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
  private ["_squad", "_building", "_position", "_cache"];
  _squad = _this select 0;
  _building = [_squad] call getSquadHideoutBuilding;
  _cache = [_squad] call getSquadCache;
  
  {
    _x setPosASL getPosASL _cache;
  } forEach ([_squad] call getPlayersInSquad);
  
};

hideout_findHouseSuitableForHideout = {
  private ["_position", "_buildings", "_building", "_found", "_objects"];
  _position = _this select 0;
  _building = nil;
  _objects = nil;
  _found = false;
  
  _buildings = nearestObjects [_position, ["house"], 5000];
  
  {
    _building = _x;
    _objects = [_building] call depotPositions_getHideoutObjects;
    
    if ( ! isNil {_objects} and [_building] call hideout_checkIsSuitableHouseForHideout) exitWith {
      _building;
    };
  } forEach _buildings;
  
  [_building, _objects];
};

hideout_checkIsSuitableHouseForHideout = {
  private ["_building", "_vehiclePos"];
  _building = _this select 0;
  
  _vehiclePos = getPos _building findEmptyPosition [10,40,"I_Truck_02_covered_F"];
  if (count _vehiclePos == 0) exitWith {
    player globalChat "no room for car";
    false;
  };
  
  if ( ! ([getPosASL _building, 100] call depotPositions_checkNothingInDistance)) exitWith {
    player globalChat "something too close";
    false;
  };
  
  true;
};


hideout_isInHideout = {
  private ["_unit", "_squad", "_building"];
  _unit = _this select 0;
  _squad = [_unit] call getSquadForUnit;
  
  if (isNil{_squad}) exitWith {false;};
  
  _building = [_squad] call getSquadHideoutBuilding;
  
  if (([_building, _unit] call BIS_fnc_distance2D) > hideout_hideoutRadius) exitWith {false;};
  
  true;
};

hideout_bodyIsInHideout = {
  private ["_body", "_uid", "_squad", "_building"];
  _body = _this select 0;
  _uid = _this select 1;
  _squad = [_uid] call getSquadForUid;
  diag_log "hideout_bodyIsInHideout";
  if (isNil{_squad}) exitWith {false;};
  diag_log "squad";
  diag_log squad;
  
  _building = [_squad] call getSquadHideoutBuilding;
  
  if (([_building, _body] call BIS_fnc_distance2D) > hideout_hideoutRadius) exitWith {false;};
  
  diag_log "true";
  true;
};