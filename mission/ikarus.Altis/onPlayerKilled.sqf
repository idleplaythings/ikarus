private ["_unit", "_killer"];
_unit = _this select 0;
_killer = _this select 1;

titleCut ["", "BLACK IN", 2];
sleep 2;

onPlayerKilled = [_unit, _killer, lastDamager];
publicVariableServer "onPlayerKilled";