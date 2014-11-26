
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
  
  _vehiclePos = getPos _building findEmptyPosition [10,20,"I_Truck_02_covered_F"];
  createVehicle ["C_Hatchback_01_F", _vehiclePos, [], 0, "flying"];
  // create weapon cache
  
  _cache = [_squad, _building] call hideout_createHideoutCache;
  [_squad, _cache] call setSquadCache;
  
  [_squad, _building] call hideout_createHideoutTrigger;
  [_squad, _building] call hideout_createHidoutMarkerForPlayers;
};

hideout_createHidoutMarkerForPlayers = {
  private ["_building", "_squad"];
  _squad = _this select 0;
  _building = _this select 1;
  
  {
    [[_building], "markers_createHideoutMarker", _x, true] call BIS_fnc_MP;
  } forEach ([_squad] call getPlayersInSquad);  
};

hideout_createHideoutCache = {
  private ["_squad", "_building", "_box", "_equipment", "_weapons"];
  _squad = _this select 0;
  _building = _this select 1;


  _box = createVehicle ["Box_IND_Wps_F", getPos _building, [], 0, "CAN_COLLIDE"];
  
  clearWeaponCargoGlobal _box;
  clearMagazineCargoGlobal _box;
  clearItemCargoGlobal _box;
  clearBackpackCargoGlobal _box;

  _equipment = [_squad] call getSquadEquipment;
  _weapons = _equipment select 0;
  
  {
    _box addWeaponCargoGlobal [_x, 1];
  } forEach _weapons;
  
  _box;
};

hideout_createHideoutTrigger = {
  private ["_squad", "_building", "_trigger"];
  _squad = _this select 0;
  _building = _this select 1;
  
  _trigger = createTrigger["EmptyDetector", getPos _building];
  _trigger setTriggerArea[20, 20, 0, false];
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
        ["You are at hideout", "hint", nil, false, true] call BIS_fnc_MP;
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
    [_x] call hideout_movePlayerToHideout;
  } forEach call getAllPlayers;
};

hideout_movePlayerToHideout = {
  private ["_unit", "_building"];
  _unit = _this select 0;
  
  if ([_unit] call hasSquad) then {
    _building = [[_unit] call getSquadForUnit] call getSquadHideoutBuilding;
    _unit setPos getPos _building;
  }
};

hideout_findHouseSuitableForHideout = {
  private ["_position", "_buildings", "_building", "_found", "_objects"];
  _position = _this select 0;
  _building = nil;
  _objects = nil;
  _found = false;
  
  _buildings = nearestObjects [_position, ["house"], 5000];
  
  for [{_i= 0},{_i < count _buildings and ! false},{_i = _i + 1}] do {
    _building = _buildings select _i;
    _objects = [_building] call depotPositions_getHideoutObjects;
    
    if ( ! isNil {_objects} and [_building] call hideout_checkIsSuitableHouseForHideout) exitWith {
      _building;
    };
  };
  
  [_building, _objects];
};

hideout_checkIsSuitableHouseForHideout = {
  private ["_building", "_vehiclePos"];
  _building = _this select 0;
  
  _vehiclePos = getPos _building findEmptyPosition [10,20,"I_Truck_02_covered_F"];
  if (count _vehiclePos == 0) exitWith {false};
  
  true;
};

