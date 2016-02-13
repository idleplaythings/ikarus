objective_guard_guards = []; //array containing unit, depot and rewards
objective_guard_AIguards = [];
objective_guard_killRadius = 1000;
objective_guard_eastGroup = nil;

objective_guard_eastSide = createCenter east;
objective_guard_eastGroup = createGroup east;

objective_guard_construct = {};

objective_guard_displayName = {
  "Guard duty";
};

objective_guard_joinInProgress = {
  private ["_unit", "_depot"];
  _unit = _this select 0;
  
  _depot = call depots_getRandom;
  if (! isNil{_depot}) then {
    [_unit] call objective_guard_createGuardMarkersForUnit;
    [_unit] call objective_guard_equipGuard;
  };
};

objective_guard_onObjectivesCreated = {
  call objective_guard_initSquads;
  if (count squads == 1) then {
    call objective_guard_createAIGuards;

    [] spawn {
      waitUntil {
        private ["_squadsWithTwoOrMore"];

        sleep 10;

        _squadsWithTwoOrMore = 0;

        {
          if (count ([_x] call getPlayersInSquad) > 1) then {
            _squadsWithTwoOrMore = _squadsWithTwoOrMore + 1;
          };
        } forEach squads;

        _squadsWithTwoOrMore > 1;
      };

      call objective_guard_killAllAiGuards;
    };
  };

  [] spawn {
    sleep (30 * 60);
    call objective_guard_removePardropActionFromEveryone;
  };
};

objective_guard_validate = {
  private ["_squad"];
  _squad = _this select 0;
  count squads > 1;
};

objective_guard_overridesAppearance = {
  false;
};

objective_guard_insideDepot = {};

objective_guard_onKilled = {
  private ["_unit", "_killer", "_guardData", "_closestDepot"];
  _unit = _this select 0;
  _killer = _this select 1;
  
  diag_log "player killed (guard objective)";

  _guardData = [_killer] call objective_guard_getGuardData;
  
  if (isNil {_guardData}) exitWith {};
  diag_log "guard data not nil";
  player globalChat "guard data not nil";
  
  if ([_unit, _killer] call hasSameSquad) exitWith {};
  diag_log "does not have same squad";
  player globalChat "does not have same squad";
  
  _closestDepot = [_killer] call depots_getClosestDepot select 0;

  diag_log "guard " + str _killer + " killed a trespasser";
  player globalChat "guard " + str _killer + " killed a trespasser";

  [_guardData] call objective_guard_reward;
  
};

objective_guard_onDisconnected = {
  private ["_squad", "_unit", "_inHideout", "_guardData", "_squad", "_amount"];
  _squad = _this select 0;
  _unit = _this select 1;
  _inHideout = _this select 2;
  
  if (_inHideout) then {
    _guardData = [_unit] call objective_guard_getGuardData;
    
    _amount = count (_guardData select 1);
    
    while {_amount > 0} do {
      _amount = _amount -1;
      [_squad, ["IKRS_guard_survive_reward"]] call addDisconnectedLoot;
    };
   
  };
};

objective_guard_canOpenLootBoxes = {
  false;
};

objective_guard_reward = {
  private ["_guardData", "_squad", "_reward"];

  _guardData = _this select 0;
  _reward = ["IKRS_guard_kill_reward"];
  _squad = [(_guardData select 0)] call getSquadForUnit;

  if (isNil{_squad}) exitWith {false;};
    
  [_squad, _reward] call addDisconnectedLoot;
  
  _guardData set [1, (_guardData select 1) + _reward ];
};

objective_guard_getGuardData = {
  private ["_unit", "_result"];
  _unit = _this select 0;
  _result = nil;
  
  if ([_unit] call objectiveController_getUnitsObjective != "guard") exitWith {nil;};

  {
    if ((_x select 0) == _unit) exitWith {
      _result = _x;
    };
  } forEach objective_guard_guards;
  
  if (isNil {_result}) exitWith {
    _result = [_unit, []];
    objective_guard_guards pushBack _result;
    _result;
  };
  _result;
};

objective_guard_defaultIfNeccessary = {
  call objective_guard_defaultIfMilitary;
  call objective_guard_defaultRaided;
  call objective_guard_default;
};

objective_guard_defaultIfMilitary = {
  private ["_squads", "_amount"];

  if (call depots_getAmountOfMilitaryDepotsToSpawn == 0) exitWith {};

  _squads = ["guard"] call objectiveController_getSquadsWithObjective;
  
  {
    [_x, 'supply'] call setChosenObjective;
  } forEach _squads;
};

objective_guard_default = {
  private ["_squads", "_amount"];
  _squads = ["guard"] call objectiveController_getSquadsWithObjective;
  _amount = call depots_getAmountOfPossibleGuards;
  
  if ((count _squads) > _amount ) exitWith {
    [(_squads call BIS_fnc_selectRandom), 'supply'] call setChosenObjective;
    call objective_guard_defaultIfNeccessary;
  };
};

objective_guard_defaultRaided = {
  private ["_squads"];
  _squads = ["guard"] call objectiveController_getSquadsWithObjective;

  {
    if (count ([_x] call objective_raid_getRaidersAgainstDefender) > 0) exitWith {
      [_x, 'supply'] call setChosenObjective;
      call objective_guard_defaultRaided;
    };
  } forEach _squads;
};

objective_guard_initSquads = {
  {
    [_x] call objective_guard_initUnit;
  } forEach (["guard"] call objectiveController_getSquadsWithObjective);
};

objective_guard_initUnit = {
  private ["_squad"];
  _squad = _this select 0;
  
  {
    [_x] joinSilent objective_guard_eastGroup;
    if ([_x ] call hideout_isInHideout) then {
      [_x] call objective_guard_onEnterHideout;
    };
    [_x] call objective_guard_createGuardMarkersForUnit;
  } forEach ([_squad] call getPlayersInSquad);
};

objective_guard_createGuardMarkersForUnit = {
  private ["_unit", "_allDepotPositions"];
  _unit = _this select 0;
  _allDepotPositions = call depots_getAllDepotPositions;

  [[_allDepotPositions], "markers_createGuardBriefing", _unit, false, true] call BIS_fnc_MP;
};

objective_guard_overrideHideoutCache = {
  false;
};

objective_guard_equipGuard = {
  private ["_unit"];
  _unit = _this select 0;

  _loot = [_unit] call loot_checkUnit;
  _squad = [_unit] call getSquadForUnit;
  [_squad, _loot] call addDisconnectedLoot;

  _unit setVariable ["isGuard", true, true];
  
  [[], "client_equipGuard", _unit, false, false] call BIS_fnc_MP;
};

objective_guard_createAIGuards = {
  private ["_position", "_guard", "_group", "_patrol", "_offset", "_positions", "_waypoint"];
  _position = (call depots_getRandom select 0);

  if (typeName _position != "ARRAY") then {
    _position = getPos _position;
  };

  _group = createGroup east;
  _patrol = createGroup east;

  for "_i" from 1 to 6 do {
    _offset = [_position, 10, 50] call popoRandom_findLand;
    [_offset, _group] call objective_guard_createAIGuard;
  };

  _waypoint = _group addWaypoint [_position, 0];
  _waypoint setWaypointType "DISMISSED";
  _waypoint setWaypointBehaviour "SAFE";
  _waypoint setWaypointCombatMode "RED";
  _waypoint setWaypointStatements ["true",""];
  _waypoint setWaypointSpeed "NO CHANGE";

  _waypoint = _group addWaypoint [_position, 1];
  _waypoint setWaypointType "SAD";
  _waypoint setWaypointBehaviour "COMBAT";
  _waypoint setWaypointCombatMode "RED";
  _waypoint setWaypointStatements ["true",""];
  _waypoint setWaypointSpeed "NO CHANGE";

  _positions = [
    [(_position select 0) - 50, (_position select 1) + 50],
    [(_position select 0) + 50, (_position select 1) + 50],
    [(_position select 0) + 50, (_position select 1) - 50],
    [(_position select 0) - 50, (_position select 1) - 50]
  ];

  for "_i" from 1 to 2 do {
    [(_positions select 0), _patrol] call objective_guard_createAIGuard;
  };

  _waypoint = _patrol addWaypoint [(_positions select 0), 0];
  _waypoint setWaypointType "MOVE";
  _waypoint setWaypointBehaviour "SAFE";
  _waypoint setWaypointCombatMode "RED";
  _waypoint setWaypointStatements ["true",""];
  _waypoint setWaypointSpeed "LIMITED";
  _waypoint setWaypointFormation "FILE";

  _patrol addWaypoint [(_positions select 1), 1];
  _patrol addWaypoint [(_positions select 2), 2];
  _waypoint = _patrol addWaypoint [(_positions select 3), 3];
  _waypoint setWaypointType "CYCLE";
 
};

objective_guard_killAllAiGuards = {
  {
    _x setDamage 1;
  } forEach objective_guard_AIguards;
};

objective_guard_createAIGuard = {
  private ["_position", "_guard", "_group"];
  _position = _this select 0;
  _group = _this select 1;
  _guard = _group createUnit ["O_G_Soldier_F", _position, [], 0, "FORM"];
  [_guard] call objective_guard_equipAIGuard;
  objective_guard_AIguards pushBack _guard;
  _guard;
};


objective_guard_equipAIGuard = {
  private ["_unit"];
  _unit = _this select 0;

  removeAllWeapons _unit;
  removeAllItems _unit;
  removeAllAssignedItems _unit;
  removeUniform _unit;
  removeVest _unit;
  removeBackpack _unit;
  removeHeadgear _unit;

  _unit forceAddUniform "U_Marshal";
  _unit addHeadgear "H_Cap_police";
  _unit addVest "V_TacVest_blk_POLICE";
  for "_i" from 1 to 6 do {_unit addItemToVest "30Rnd_556x45_Stanag";};
  for "_i" from 1 to 3 do {_unit addItemToUniform "16Rnd_9x21_Mag";};
  _unit addItemToVest "FirstAidKit";

  _unit addWeaponGlobal "arifle_TRG20_F";
  _unit addPrimaryWeaponItem "acc_flashlight";
  _unit addWeaponGlobal "Binocular";
  _unit addWeaponGlobal "hgun_P07_F";

  _unit linkItem "ItemMap";
  _unit linkItem "ItemCompass";
  _unit linkItem "ItemWatch";
};

objective_guard_onEnterHideout = {
  private ["_unit"];
  _unit = _this select 0;

  if (! missionControl_objectivesGenerated) exitWith {};

  if (call missionControl_getElapsedTime < (60 * 30)) then {
    [_unit] call objective_guard_addPardropAction;
  };
};

objective_guard_onLeaveHideout = {
  private ["_unit"];
  _unit = _this select 0;

  if (! missionControl_objectivesGenerated) exitWith {};

  [_unit] call objective_guard_removePardropAction;
};

objective_guard_addPardropAction = {
  private ["_unit"];
  if (isNil{call depots_getRandom}) exitWith {};
  _unit = _this select  0;
  [[], "client_setUpGuardParadropAction", _unit, false, false] call BIS_fnc_MP;
};

objective_guard_removePardropAction = {
  private ["_unit"];
  _unit = _this select  0;
  [[], "client_removeGuardParadropAction", _unit, false, false] call BIS_fnc_MP;
};

objective_guard_removePardropActionFromEveryone = {
  {
    {
      [_x] call objective_guard_removePardropAction;
    } forEach ([_x] call getPlayersInSquad);
  } forEach squads;
};

"guardParadrop" addPublicVariableEventHandler {
  private ["_unit"];
  _unit = _this select 1 select 0;

  [_unit] call objective_guard_doParadrop;
};

objective_guard_doParadrop = {
  private ["_unit"];
  _unit = _this select  0;

  if (isNil{call depots_getRandom}) exitWith {};

  if ! ([_unit, "guard"] call objectiveController_unitHasObjective) exitWith {};

  if ! ([_unit] call hideout_isInHideout) exitWith {};

  if (call missionControl_getElapsedTime > (60 * 30)) exitWith {};

  if (backpack _unit != "") exitWith {};
  
  if (vehicle _unit != _unit) exitWith {};

  [_unit] call objective_guard_removePardropAction;

  [_unit] spawn objective_guard_paradrop;
};

objective_guard_paradrop = {
  private ["_unit", "_depot", "_squad", "_position"];
  _unit = _this select 0;

  _depot = call depots_getRandom;
  if (isNil{_depot}) exitWith {
     ["There seem to be no depots to para drop to.", _unit] call broadCastMessageTo; 
  };

  _position = getPos (_depot select 0);
  _position = [_position, 0, 1000] call popoRandom_findLand;

  _position set [2, 5000];
  _unit setPos _position;
  [[], "client_addParachute", _unit, false, false] call BIS_fnc_MP;
};