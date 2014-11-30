
squads = [];

//These getters and setters all take a squad as a param

setSquadData = {
  squads = _this select 0;
};

getSquadAmount = {
  count squads;
};

getSquadId = {
  _this select 0 select 0;
};

getSquadPlayerUIDs = {
  _this select 0 select 1;
};

getSquadStartingPosition = {
  _this select 0 select 2;
};

getSquadEquipment = {
  _this select 0 select 3;
};

getSquadHideoutBuilding = {
  _this select 0 select 4;
};

setSquadHideoutBuilding = {
  _this select 0 set [4, _this select 1];
};

getSquadCache = {
  _this select 0 select 5;
};

setSquadCache = {
  _this select 0 set [5, _this select 1];
};

getPlayersAtHideout = {
  _this select 0 select 6;
};

getChosenObjectives = {
  _this select 0 select 7;
};

getForcedObjectives = {
  _this select 0 select 8;
};

setPlayersAtHideout = {
  private ["_newList"];
  _newList = + _this select 1;
  _this select 0 set [6, _newList];
};


getSquadById = {
  private ["_squadId"];
  _squadId = _this select 0;
  
  {
    if ([_x] call getSquadId == _squadId) exitWith {
      _x
    };
  } forEach squads;
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
    _uids = [_x] call getSquadPlayerUIDs;

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