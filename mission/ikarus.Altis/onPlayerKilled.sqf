
private ["_killed", "_uid"];
_killed = _this select 0;
_uid = getPlayerUID _killed;

serverCommand format ["#kick %1",_uid];