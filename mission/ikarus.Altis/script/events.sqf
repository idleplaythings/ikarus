onPlayerKilled = nil;
lastConnectedPlayerUid = nil;

events_setWeaponDeployedEventHandler = {
  private ["_unit"];
  _unit = _this select 0;

  player addEventHandler [ "WeaponAssembled", {
    private ["_unit", "_weapon", "_squad"];
    _unit = _this select 0;
    _weapon = _this select 1;
    _squad = [_unit] call getSquadForUnit;

    [_weapon, _squad] call vehicle_setOwner;
  }];
};

"lastConnectedPlayerUid" addPublicVariableEventHandler {
  private ["_uid", "_unit", "_approved"];
  _uid = _this select 1 select 0;
  _unit = _this select 1 select 1;
  diag_log "player connected";
  diag_log _uid;

  _approved = ['playerConnected', [_uid]] call sock_rpc;

  if (! _approved) exitWith {
    _unit setDamage 1;
    deleteVehicle _unit;
  };

  _unit setSpeaker "NoVoice";

  [_unit] call events_setWeaponDeployedEventHandler;

  if (missionControl_objectivesGenerated || missionControl_gameStarted) exitWith {
    [_unit, _uid] call reinforcements_playerConnected;
  };
};

"onPlayerKilled" addPublicVariableEventHandler {
  private ["_unit", "_killer", "_unitUid", "_killerUid", "_lastDamagerUid", "_squad"];
  _unit = _this select 1 select 0;
  _killer = _this select 1 select 1;
  _unitUid = getPlayerUID _unit;
  _killerUid = getPlayerUID _killer;

  if (! missionControl_gameStarted) exitWith {};
  
  _lastDamagerUid = _this select 1 select 2;

  diag_log format["lastDamager %1", _lastDamagerUid];

  if (_unitUid == _killerUid || _killerUid == "" || isNil {_killerUid}) then {
    _killerUid = _lastDamagerUid;
  };

  diag_log format["player killed: '%1' killer: '%2'", _unitUid, str _killerUid];

  _killer = [_killerUid] call getPlayerByUID;
  _squad = [_killer] call getSquadForUnit;

  if (! isNil {_killer} && ! isNil {_squad}) then {
    [_squad, "onKilled", [_unit, _killer, true]] call objectiveController_callSquadObjective;
    [_squad, ['IKRS_kill_reward']] call addDisconnectedLoot;
    [_killer, _unit] call underdog_checkKillReward;
  };
  
  ['playerKilled', [_unitUid, _killerUid, '', getPos _unit]] call sock_rpc;
};

addMissionEventHandler ["HandleDisconnect", {
  private ["_unit, _uid"];
  _unit = _this select 0;
  _uid = _this select 2;
  
  diag_log "player disconnected";
  diag_log _uid;
  
  if ( ! missionControl_gameStarted) exitWith {
    diag_log "disconnected before game start";
    ['playerDisconnected', [_uid]] call sock_rpc;
    deleteVehicle _unit;
  };
  
  if ([_unit, _uid] call hideout_bodyIsInHideout and alive _unit) exitWith {
    diag_log "disconnected in hideout";
    [_unit, _uid] call events_playerDisconnectedInHideout;
  };

  diag_log "disconnected while game is running and not in hideout";
  ['playerDisconnected', [_uid]] call sock_rpc;
}];

events_playerDisconnectedInHideout = {
  private ["_unit", "_uid", "_loot", "_squad", "_vehicle"];
  _unit = _this select 0;
  _uid = _this select 1;
  _loot = [_unit] call loot_checkUnit;
  _squad = [_uid] call getSquadForUid;

  if (! isNil{_squad}) then {
    _vehicle = vehicle _unit;
    if (_vehicle != _unit && ([_vehicle] call vehicle_getAmountOfAliveCrew) == 1) then {
      _loot = _loot + ([_vehicle] call loot_checkContainer);
      _loot = _loot + [typeOf _vehicle];
      deleteVehicle _vehicle;
    };

    [_squad, _loot] call addDisconnectedLoot;
    [_squad, "onDisconnected", [_squad, _unit, true]] call objectiveController_callSquadObjective;
  };

  deleteVehicle _unit;
  ['playerDisconnected', [_uid]] call sock_rpc;
};
 