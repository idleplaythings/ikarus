
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

getDisconnectedLoot = {
  _this select 0 select 9;
};

addDisconnectedLoot = {
  private ["_squad", "_currentLoot"];
  _squad = _this select 0;
  _currentLoot = (_squad select 9) + (_this select 1);

  _squad set [9, _currentLoot];
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
  [(getPlayerUID _unit)] call getSquadForUid;
};

getSquadForUid = {
  private ["_uid", "_uids", "_squad"];
  _uid = _this select 0;
  _squad = nil;
  {
    _uids = [_x] call getSquadPlayerUIDs;

    if (_uid in _uids) then {
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