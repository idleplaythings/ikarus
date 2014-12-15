private ["_unit"];
_unit = _this select 0;

titleCut ["", "BLACK IN", 2];
sleep 2;

onPlayerKilled = getPlayerUID _unit;
publicVariableServer "onPlayerKilled";