
squads = [
  [
    ["76561198007087657", "_SP_PLAYER_"], //Steam ID of players in this squad
    [14812.0, 16286.0] // coordinates of hideout
  ]
];

movePlayersToHideout = {
  {
    [_x] call movePlayerToHideout;
  } forEach call getAllPlayers;
};

movePlayerToHideout = {
  private ["_unit", "_pos"];
  _unit = _this select 0;
  
  if ([_unit] call hasSquad) then {
    _pos = [_unit] call getSquadHideoutPosForUnit;
    _unit setPos _pos;
  }
};

getSquadHideoutPosForUnit = {
  private ["_unit", "_squad"];
  _unit = _this select 0;
  
  _squad = [_unit] call getSquadForUnit;
  _squad select 1;
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