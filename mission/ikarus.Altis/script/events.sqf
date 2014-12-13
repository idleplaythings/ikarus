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
    
    diag_log "unit disconnected";
    diag_log _unit;
    
    if ( ! missionControl_gameStarted) exitWith {
      diag_log "game is not started";
      ['playerDisconnected', [_uid]] call sock_rpc;
    };
    
    if ([_unit, _uid] call hideout_bodyIsInHideout) exitWith {
      diag_log "unit disconnected in hideout";
      [_unit, _uid] call events_playerDisconnectedInHideout;
    };
    
    diag_log "player killed";
    ['playerKilled', [_uid]] call sock_rpc;
  }];
 };
 
 events_playerDisconnectedInHideout = {
  private ["_unit", "_uid", "_loot", "_squad"];
  _unit = _this select 0;
  _uid = _this select 1;
  _loot = [_unit] call loot_checkUnit;
  _squad = [_uid] call getSquadForUid;

  [_squad, _loot] call addDisconnectedLoot;
  
  deleteVehicle _unit;
  ['playerDisconnected', [_uid]] call sock_rpc;
 };
 