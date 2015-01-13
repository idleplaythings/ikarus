private ["_unit"];
_unit = _this select 0;
_killer = _this select 1;

titleCut ["", "BLACK IN", 2];
sleep 2;

onPlayerKilled = [_unit, _killer];
publicVariableServer "onPlayerKilled";