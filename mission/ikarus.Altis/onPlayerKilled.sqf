private ["_unit"];
_unit = _this select 0;

onPlayerKilled = getPlayerUID _unit;
publicVariableServer "onPlayerKilled";