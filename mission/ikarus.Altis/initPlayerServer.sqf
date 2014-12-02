private["_unit", "_uid"];
_unit = _this select 0;
_uid = getPlayerUID _unit;

if (missionControl_gameStarted) exitWith {
  ['playerUnknown', [_uid]] call sock_rpc;
};

['playerConnected', [_uid]] call sock_rpc;