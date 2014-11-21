
hideoutClasses = [
  "Land_u_House_Big_01_V1_F", "Land_u_House_Big_01_V1_dam_F", "Land_d_House_Big_01_V1_F",
  
  "Land_i_Stone_HouseBig_V1_F", "Land_i_Stone_HouseBig_V1_dam_F", "Land_i_Stone_HouseBig_V2_F",
  "Land_i_Stone_HouseBig_V2_dam_F", "Land_i_Stone_HouseBig_V3_F", "Land_i_Stone_HouseBig_V3_dam_F", "Land_d_Stone_HouseBig_V1_F"
];

createHideoutForSquads = {
 {
   [_x] call createHideoutForSquad;
 } forEach squads;
};

createHideoutForSquad = {
  private ["_startPosition", "_squad", "_building", "_vehiclePos", "_cache"];
  _squad = _this select 0;
  _startPosition = [_squad] call getSquadStartingPosition;
  
  _building = [_startPosition] call findHouseSuitableForHideout;
  [_squad, _building] call setSquadHideoutBuilding;
  
  _vehiclePos = getPos _building findEmptyPosition [2,10,"C_Hatchback_01_F"];
  createVehicle ["C_Hatchback_01_F", _vehiclePos, [], 0, "NONE"];
  // create weapon cache
  
  _cache = [_squad, _building] call createHideoutCache;
  [_squad, _cache] call setSquadCache;
  
  [_squad, _building] call createHideoutTrigger;
};

createHideoutCache = {
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

createHideoutTrigger = {
  private ["_squad", "_building", "_trigger"];
  _squad = _this select 0;
  _building = _this select 1;
  
  _trigger = createTrigger["EmptyDetector", getPos _building];
  _trigger setTriggerArea[20, 20, 0, false];
  _trigger setTriggerActivation["ANY", "PRESENT", true];
  _trigger setTriggerStatements[
    "round (time % 1)==0",
    format ["[thislist, %1] call hideoutTriggerActivate;", str ([_squad] call getSquadId)], 
    ""
   ]; 
};

hideoutTriggerActivate = {
  private ["_unitsPresent", "_squadId", "_squad", "_playersInSquad", "_playersAtHideout"];
  _unitsPresent = _this select 0;
  _squadId = _this select 1;
  _squad = [_squadId] call getSquadById;
  _playersInSquad = [_squad] call getPlayersInSquad;
  _playersAtHideout = [_squad] call getPlayersAtHideout;
  
  {
    if (_x in _unitsPresent) then {
      if (! (_x in _playersAtHideout)) then {
        ["You are at hideout", "hint", _x, true] call BIS_fnc_MP;
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
movePlayersToHideout = {
  {
    [_x] call movePlayerToHideout;
  } forEach call getAllPlayers;
};

movePlayerToHideout = {
  private ["_unit", "_building"];
  _unit = _this select 0;
  
  if ([_unit] call hasSquad) then {
    _building = [[_unit] call getSquadForUnit] call getSquadHideoutBuilding;
    _unit setPos getPos _building;
  }
};

