onPlayerKilled = nil;
  
events_setEventHandlers = {
  "onPlayerKilled" addPublicVariableEventHandler {
  
    if (! missionControl_gameStarted) exitWith {};
  
    _uid = _this select 1;
    ['playerKilled', [_uid]] call sock_rpc;
  };
  
  addMissionEventHandler ["HandleDisconnect", {
    private ["_unit, _uid"];
    _unit = _this select 0;
    _uid = _this select 2;
    
    
    if ( ! missionControl_gameStarted) exitWith {
      ['playerDisconnected', [_uid]] call sock_rpc;
    };
    
    if ([_unit] call hideout_isInHideout) exitWith {
      [_unit, _uid] call events_playerDisconnectedInHideout;
    };
    
    ['playerKilled', [_uid]] call sock_rpc;
  }];
 };
 
 events_playerDisconnectedInHideout = {
  private ["_unit", "_uid", "_loot"];
  _unit = _this select 0;
  _uid = _this select 1;
  _loot = [_unit] call loot_checkUnit;
  
  deleteVehicle _unit;
  
  ['playerDisconnected', [_uid, _loot]] call sock_rpc;
 };
 