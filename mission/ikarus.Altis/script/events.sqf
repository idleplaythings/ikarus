onPlayerKilled = nil;
  
events_setEventHandlers = {
  "onPlayerKilled" addPublicVariableEventHandler {
  
    _uid = _this select 1;
    ['kickPlayer', [_uid]] call sock_rpc;
  };
 };
 