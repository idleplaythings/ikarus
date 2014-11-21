
squads = [
  [
    ["76561198007087657", "76561197962172634", "_SP_PLAYER_", "_SP_AI_"], //Steam ID of players in this squad
    [14812.0, 22600.0], // starting location
    [["arifle_Katiba_F","arifle_Katiba_F","arifle_Katiba_F","arifle_Katiba_F"]] //equipment: weapons, magazines, items, backpack
    // hideout building when found and created
    // hideout weapon cache
  ]
];

getSquadPlayerUIDs = {
  _this select 0 select 0;
};

getSquadStartingPosition = {
  _this select 0 select 1;
};

getSquadEquipment = {
  _this select 0 select 2;
};

getSquadHideoutBuilding = {
  _this select 0 select 3;
};

setSquadHideoutBuilding = {
  _this select 0 set [3, _this select 1];
};

getSquadCache = {
  _this select 0 select 4;
};

setSquadCache = {
  _this select 0 set [4, _this select 1];
};


getSquadHideoutPosForUnit = {
  private ["_unit", "_squad"];
  _unit = _this select 0;
  
  _squad = [_unit] call getSquadForUnit;
  [_squad] call getSquadStartingPosition;
};

getSquadForUnit = {
  private ["_unit", "_uids", "_squad"];
  _unit = _this select 0;
  _squad = nil;
  {
    _uids = _x select 0;

    if (getPlayerUID _unit in _uids) then {
      _squad = _x;
    };
  } forEach squads;
  
  _squad;
};

hasSquad = {
  ! isNil { 
    [_this select 0] call getSquadForUnit; 
  };
};