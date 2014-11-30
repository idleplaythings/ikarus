onPlayerKilled = nil;
  
events_setEventHandlers = {
  "onPlayerKilled" addPublicVariableEventHandler {
  
    if (! missionControl_gameStarted) exitWith {};
  
    _uid = _this select 1;
    ['kickPlayer', [_uid]] call sock_rpc;
  };
 };
 