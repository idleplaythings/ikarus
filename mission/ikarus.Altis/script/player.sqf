assembleSquads = {
  {
    [[_x] call getPlayersInSquad] call joinPlayers;
  } forEach squads;
};

player_setSquadVariable = {
  {
    private ["_squad"];
    _squad = [_x] call getSquadForUnit;
    _x setVariable ["playerSquadId", ([_squad] call getSquadId), true];
  } forEach (call getAllPlayers);
};

joinPlayers = {
  private ["_players", "_leader"];
  _players = _this select 0;
  
  _leader = _players select 0;
  
  if (isNil{_leader}) exitWith {};

  _players = _players - [_leader];
  _players joinSilent group _leader;
};

getAllPlayers = {
  private ["_players"];
  if ( missionControl_test ) exitWith {
    [player, friend, friend2];
  };

  _players = [];

  {
    if ( ! isNil {([_x] call getSquadForUnit)}) then {
      _players pushBack _x;
    }
  } forEach playableUnits;

  _players;
};

getAllAlivePlayers = {
  private ["_players"];
  _players = [];
  
  {
    if ( alive _x) then {
       _players set [count _players, _x];
    };
  } forEach call getAllPlayers;
  
  _players;
};

getPlayerByUID = {
  private ["_uid"];
  _uid = _this select 0;

  {
    if (getPlayerUID _x == _uid) exitWith {
      _x;
    };
  } forEach call getAllPlayers;
};

getPlayersInSquad = {
  private ["_squad", "_players", "_player", "_playerIds"];
  _squad = _this select 0;
  _players = [];
  _playerIds = [_squad] call getSquadPlayerUIDs;
  
  {
    _player = [_x] call getPlayerByUID;
    
    if ( ! isNil {_player}) then {
      _players set [count _players, _player];
    };
  } forEach _playerIds;
  
  _players;
};

hasSameSquad = {
  private ["_a", "_b", "_squadA", "_squadB"];
  _a = _this select 0;
  _b = _this select 1;
  _squadA = [_a] call getSquadForUnit;
  _squadB = [_b] call getSquadForUnit;

  if ((isNil{_squadA}) or (isNil {_squadB})) exitWith {false;};
  
  if (([_squadA] call getSquadId) == ([_squadB] call getSquadId)) exitWith {true;};
  
  false;
};

broadcastMessage = {
  private ["_message"];
  _message = _this select 0;
  
  {
    [[_message], "markers_textMessage", _x, false, false] call BIS_fnc_MP;
  } forEach call getAllPlayers;
};

broadcastMessageTo = {
  private ["_message", "_recipient"];
  _message = _this select 0;
  _recipient = _this select 1;
  
  [[_message], "markers_textMessage", _recipient, false, false] call BIS_fnc_MP;
};
