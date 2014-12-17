assembleSquads = {
  {
    [[_x] call getPlayersInSquad] call joinPlayers;
  } forEach squads;
};

joinPlayers = {
  private ["_players", "_leader"];
  _players = _this select 0;
  
  _leader = _players select 0;
  if (isNil{_leader}) exitWith {};
  {
    if (_x != _leader ) then {
      [_x] joinSilent group _leader;
    }
  } forEach _players;
};

getAllPlayers = {
  if ( missionControl_test ) exitWith {
    [player, friend, friend2];
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