objective_guard_guards = []; //array containing unit, depot and rewards
objective_guard_killRadius = 1000;

objective_guard_construct = {};

objective_guard_displayName = {
  "Guard duty";
};

objective_guard_onObjectivesCreated = {
  call objective_guard_moveSquadsToDepot;
};

objective_guard_validate = {
  private ["_squad"];
  _squad = _this select 0;
  count ([_squad] call getPlayersInSquad) <= 3;
};

objective_guard_overridesAppearance = {
  true;
};

objective_guard_insideDepot = {};

objective_guard_onKilled = {
  private ["_unit", "_killer", "_guardData"];
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
  
  if ((_killer distance ([_killer] call depots_getClosestDepot)) <= objective_guard_killRadius) exitWith {
    diag_log "guard " + str _killer + " killed a trespasser";
    player globalChat "guard " + str _killer + " killed a trespasser";
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
  private ["_depot", "_objects", "_position"];
  _squad = _this select 0;
  
  _depot = call depots_getRandom;
  _objects = [_depot select 1, 1] call depotPositions_getRandomPlaceholdersFromObjects select 0;
  _position = [_depot select 0, _objects] call houseFurnisher_getPosASLAndDirectionFromBuilding select 0;
  
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
  
  [[], "client_equipGuard", _unit, false, false] call BIS_fnc_MP;
};