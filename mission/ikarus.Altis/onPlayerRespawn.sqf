private["_unit", "_oldUnit"];
_unit = _this select 0;
_oldUnit = _this select 1;
lastConnectedPlayerUid = [getPlayerUID _unit, _unit];

publicVariableServer "lastConnectedPlayerUid";


