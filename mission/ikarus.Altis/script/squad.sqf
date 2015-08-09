
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

setSquadPlayerUIDs = {
  _this select 0 set [1, _this select 1];
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

getChosenObjective = {
  _this select 0 select 7;
};

setChosenObjective = {
  _this select 0 set [7, _this select 1];
};

getHideoutModules = {
  _this select 0 select 8;
};

getPlayerGear = {
  private ["_uid", "_gear", "_squad"];
  _squad = _this select 0;
  _uid = _this select 1;
  _gear = nil;

  {
    if ((_x select 0) == _uid) then {
      _gear = _x;
    }
  } forEach (_squad select 9);

  if (isNil {_gear}) exitWith {nil;};
  _gear;
};

getOutpostLocations = {
  _this select 0 select 10;
};

getDisconnectedLoot = {
  _this select 0 select 11;
};

addDisconnectedLoot = {
  private ["_squad", "_currentLoot"];
  _squad = _this select 0;
  _currentLoot = (_squad select 11) + (_this select 1);

  _squad set [11, _currentLoot];
};

hasDisconnectedLoot = {
  private ["_squad", "_currentLoot", "_class", "_result"];
  _squad = _this select 0;
  _class = _this select 1;
  _result = false;

  _currentLoot = _squad select 11;

  {
    if (_x == _class) exitWith {
      _result = true;
    };
  } forEach _currentLoot;

  _result;
};

removeDisconnectedLoot = {
  private ["_squad", "_currentLoot", "_loot"];
  _squad = _this select 0;
  _loot = _this select 1;

  _currentLoot = (_squad select 11) - _loot;

  _squad set [11, _currentLoot];
};

getRenown = {
  _this select 0 select 12;
};

getCompanyName = {
  _this select 0 select 13;
};

setPlayersAtHideout = {
  private ["_newList"];
  _newList = + _this select 1;
  _this select 0 set [6, _newList];
};

getSquadById = {
  private ["_squadId", "_squad"];
  _squadId = _this select 0;
  _squad = nil;

  {
    if ([_x] call getSquadId == _squadId) exitWith {
      _squad = _x;
    };
  } forEach squads;

  if (isNil {_squad}) exitWith {nil;};

  _squad;
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
  
  if (isNil {_squad}) exitWith {nil;};
    
  _squad;
};

hasSquad = {
  ! isNil { 
    [_this select 0] call getSquadForUnit; 
  };
};

getSquadsWithPlayers = {
  private ["_squads"];
  _squads = [];

  {
    if (count ([_x] call getPlayersInSquad) > 0) then {
       _squads pushBack _x;
    }
  } forEach squads;

  _squads;
};

getSquadLeader = {
  private ["_squad"];
  _squad = _this select 0;

  [_squad] call getPlayersInSquad select 0;
};