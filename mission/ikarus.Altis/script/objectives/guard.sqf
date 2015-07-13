objective_guard_guards = []; //array containing unit, depot and rewards
objective_guard_killRadius = 1000;

objective_guard_construct = {};

objective_guard_displayName = {
  "Guard duty";
};

objective_guard_joinInProgress = {
  private ["_unit", "_depot"];
  _unit = _this select 0;
  
  _depot = call depots_getRandom;
  if (! isNil{_depot}) then {
    [_unit] call objective_guard_equipGuard;
    [_unit] call objective_guard_createGuardMarkersForUnit;
  };
};

objective_guard_setPlayerRating = {};

objective_guard_onObjectivesCreated = {
  call objective_guard_moveSquadsToDepot;
  if (count squads == 1) then {
    call objective_guard_createAIGuards;
  };
};

objective_guard_validate = {
  private ["_squad"];
  _squad = _this select 0;
  count ([_squad] call getPlayersInSquad) <= 3 && count squads > 1;
};

objective_guard_overridesAppearance = {
  true;
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

  if ((_killer distance _closestDepot) <= objective_guard_killRadius) exitWith {
    diag_log "guard " + str _killer + " killed a trespasser";
    player globalChat "guard " + str _killer + " killed a trespasser";

    if (rating _unit > 0 && uniform _unit == "U_Marshal" && vest _unit == "V_TacVest_blk_POLICE" && ! isNil{([_unit] call objective_guard_getGuardData);}) exitWith {
      ["You killed a friendly guard", _killer] call broadcastMessageTo;
      [_guardData] call objective_guard_penalize;
    };

    if (uniform _killer != "U_Marshal" && vest _killer != "V_TacVest_blk_POLICE") exitWith {
      ["You have to be wearing guard uniform and vest to be rewarded for kills", _killer] call broadcastMessageTo;
    };

    [_guardData] call objective_guard_reward;
  };
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
      [_squad, ["guard_objective_reward2"]] call addDisconnectedLoot;
    };
   
  };
};

objective_guard_canOpenLootBoxes = {
  false;
};

objective_guard_penalize = {
  private ["_guardData", "_squad", "_penalty"];

  _guardData = _this select 0;
  _penalty = ["guard_objective_penalty"];
  _squad = [(_guardData select 0)] call getSquadForUnit;

  if (isNil{_squad}) exitWith {false;};
    
  [_squad, _penalty] call addDisconnectedLoot;
  
  _guardData set [1, (_guardData select 1) + _penalty ];
};

objective_guard_reward = {
  private ["_guardData", "_squad", "_reward"];

  _guardData = _this select 0;
  _reward = ["guard_objective_reward1"];
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
  private ["_squads", "_supplyDepots"];
  _squads = ["guard"] call objectiveController_getSquadsWithObjective;
  _depots = call depots_getTotalAmount;
  
  if ((count _squads) > _depots ) exitWith {
    [(_squads call BIS_fnc_selectRandom), 'supply'] call setChosenObjective;
    call objective_guard_defaultIfNeccessary;
  };
};

objective_guard_moveSquadsToDepot = {
  {
    if (([_x] call getChosenObjective) == 'Guard') then {
      [_x] call objective_guard_moveToDepot;
    }
  } forEach squads;
};

objective_guard_moveToDepot = {
  private ["_depot", "_object", "_position"];
  _squad = _this select 0;
  
  _depot = call depots_getRandom;
  _object = [_depot select 1, 1] call depotPositions_getRandomPlaceholdersFromObjects select 0;
  _position = getPosASL _object;
  
  {
    _x setPosASL _position;
    [_x] call objective_guard_equipGuard;
    [_x] call objective_guard_createGuardMarkersForUnit;
  } forEach ([_squad] call getPlayersInSquad);
    
  true;
};

objective_guard_createGuardMarkersForUnit = {
  private ["_unit", "_allDepotPositions"];
  _unit = _this select 0;
  _allDepotPositions = call depots_getAllDepotPositions;

  [[], "markers_createGuardBriefing", _unit, false, true] call BIS_fnc_MP;
  {
    [[_x], "markers_createGuardMarker", _unit, false, true] call BIS_fnc_MP;
  } forEach _allDepotPositions;
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

  _group = createGroup west;
  _patrol = createGroup west;

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
  _waypoint setWaypointSpeed "NO CHANGE";
  _waypoint setWaypointFormation "FILE";

  _patrol addWaypoint [(_positions select 1), 1];
  _patrol addWaypoint [(_positions select 2), 2];
  _waypoint = _patrol addWaypoint [(_positions select 3), 3];
  _waypoint setWaypointType "CYCLE";
 
};

objective_guard_createAIGuard = {
  private ["_position", "_guard", "_group"];
  _position = _this select 0;
  _group = _this select 1;
  _guard = _group createUnit ["B_Soldier_02_f", _position, [], 0, "FORM"];
  [_guard] call objective_guard_equipAIGuard;
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