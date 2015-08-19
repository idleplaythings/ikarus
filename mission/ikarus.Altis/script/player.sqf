assembleSquads = {
  {
    [[_x] call getPlayersInSquad] call joinPlayers;
  } forEach squads;
};

player_setSquadVariable = {
  {
    private ["_squad"];
    _squad = [_x] call getSquadForUnit;
    [_x, _squad] call player_setSquadVariableForUnit;
  } forEach (call getAllPlayers);
};

player_setSquadVariableForUnit = {
  private ["_squad", "_unit"];
  _unit = _this select 0;
  _squad = _this select 1;

  _unit setVariable ["playerSquadId", ([_squad] call getSquadId), true];
};


joinPlayers = {
  private ["_players", "_leader"];
  _players = _this select 0;

  {
     [_x] join grpNull;
  } forEach _players;
  
  _leader = _players select 0;
  
  if (isNil{_leader}) exitWith {};

  _players = _players - [_leader];
  _players joinSilent group _leader;
};

getAllPlayers = {
  private ["_players"];
  if ( missionControl_test ) exitWith {
    [player, friend];
  };

  _players = [];

  {
    if ( ! isNil {([_x] call getSquadForUnit)}) then {
      _players pushBack _x;
    }
  } forEach playableUnits;

  _players;
};

getAllPlayersBeforeSquads = {
  if ( missionControl_test ) exitWith {
    [player, friend];
  };

  playableUnits;
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
    [[_message], "client_textMessage", _x, false, false] call BIS_fnc_MP;
  } forEach call getAllPlayersBeforeSquads;
};

broadcastMessageTo = {
  private ["_message", "_recipient"];
  _message = _this select 0;
  _recipient = _this select 1;
  _type = [_this, 2, ""] call BIS_fnc_param;
  
  [[_message, _type], "client_textMessage", _recipient, true, false] call BIS_fnc_MP;
};

broadcastFailureMessageTo = {
  _this pushBack "TaskFailed";
  _this call broadcastTaskMessageTo;
};

broadcastSuccessMessageTo = {
  _this pushBack "TaskSucceeded";
  _this call broadcastTaskMessageTo;
};

broadcastTaskMessageTo = {
  private ["_message", "_recipient"];
  _message = _this select 0;
  _recipient = _this select 1;
  _type = [_this, 2, ""] call BIS_fnc_param;
  
  [[_message, _type], "client_taskMessage", _recipient, false, false] call BIS_fnc_MP;
};

hasOnlyOneSquadLeft = {
  private ["_squadIds"];
  _squadIds = [];
  {
    private ["_squadId"];

    _squadId = [[_x] call getSquadForUnit] call getSquadId;

    if ! (_squadId in _squadIds) then {
      _squadIds pushBack _squadId;
    };

  } forEach call getAllPlayers;

  count _squadIds == 0;
};