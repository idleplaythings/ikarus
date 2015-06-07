reinforcements_playerConnected = {
  private ["_unit", "_uid", "_squad", "_existingSquad"];
  _unit = _this select 0;
  _uid = _this select 1;

  waitUntil {! missionControl_reinforcementsWait};

  _squad = ['getSquadForUid', [_uid]] call sock_rpc;
  
  [_unit, _squad] call equipment_setPlayerGearFromSquad;

  _existingSquad = [([_squad] call getSquadId)] call getSquadById;

  if (isNil{_existingSquad}) exitWith {
    [_unit, _squad] call reinforcements_createGuardSquad;
  };

  [_existingSquad, ([_squad] call getSquadPlayerUIDs)] call setSquadPlayerUIDs;
  [_unit, _existingSquad] call reinforcements_joinSquad;
};

reinforcements_createGuardSquad = {
  private ["_unit", "_squad"];
  _unit = _this select 0;
  _squad = _this select 1;

  squads = squads + [_squad];
  [_squad] call hideout_createHideoutForSquad;
  [_squad, "guard"] call setChosenObjective;
  [_unit] call reinforcements_moveToStart;
};

reinforcements_joinSquad = {
  private ["_unit", "_squad", "_players", "_players"];
  _unit = _this select 0;
  _squad = _this select 1;
  _players = [_squad] call getPlayersInSquad;
  _leader = _players select 0;

  if (! isNil{_leader}) then {
    [_unit] joinSilent group _leader;
  };

  [_unit] call reinforcements_moveToStart;
};

reinforcements_moveToStart = {
  private ["_unit", "_squad"];
  _unit = _this select 0;
  _squad = [_unit] call getSquadForUnit;

  [_unit, 'joinInProgress', [_unit]] call objectiveController_callUnitObjective;

  [_unit, _squad] call player_setSquadVariableForUnit;
  [_unit] call hideout_createHidoutMarkerForPlayer;

  [_unit] call reinforcements_paradrop;
};

reinforcements_paradrop = {
  private ["_unit", "_depot", "_squad", "_position"];
  _unit = _this select 0;

  _depot = call depots_getRandom;
  if (isNil{_depot}) exitWith {
    _squad = [_unit] call getSquadForUnit;
    [_unit, _squad] call hideout_movePlayerToHideout;
  };

  _position = getPos (_depot select 0);
  _position = [_position, 0, 1000] call popoRandom_findLand;

  _position set [2, 5000];
  _unit setPos _position;
  [[], "client_addParachute", _unit, false, false] call BIS_fnc_MP;
};
