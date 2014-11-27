assembleSquads = {
  {
    [[_x] call getPlayersInSquad] call joinPlayers;
  } forEach squads;
};

joinPlayers = {
  private ["_players", "_leader"];
  _players = _this select 0;
  
  _leader = _players select 0;
  _players joinSilent group _leader;
};

getAllPlayers = {
  if (count playableUnits == 0) exitWith {[player, friend]};
  playableUnits;
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