objective_guard_used_depots = [];
objective_guard_guards = []; //array containing unit, depot and rewards
objective_guard_killRadius = 1000;

objective_guard_construct = {};

objective_guard_onKilled = {
  private ["_unit", "_killer", "_guardData"];
  _unit = _this select 0;
  _killer = _this select 1;
   
  diag_log "player killed (guard objective)";

  _guardData = [_killer] call objective_guard_getGuardData;
  
  if (isNil {_guardData}) exitWith {};
  
  if ([_unit, _killer] call hasSameSquad) exitWith {};
  
  if (_killer distance _guardData select 1 <= objective_guard_killRadius) exitWith {
    diag_log "guard " + str _killer + " killed a trespasser";
    [_guardData] call objective_guard_reward;
  };
};

objective_guard_onDisconnected = {
  private ["_unit", "_killer", "_inHideout", "_guardData", "_squad", "_amount"];
  _unit = _this select 0;
  _killer = _this select 1;
  _inHideout = _this select 2;
  
  if (_inHideout) then {
    _guardData = [_killer] call objective_guard_getGuardData;
    
    _amount = count _guardData select 2;
    _squad = [_killer] call getSquadForUnit;
    
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
  [_squad, _reward] call addDisconnectedLoot;
  
  _guardData set [2, (_guardData select 2) + _reward ];
};

objective_guard_getGuardData = {
  private ["_unit", "_result"];
  _unit = _this select 0;
  _result = nil;
  
  {
    if ((_x select 0) == _unit) exitWith {
      _result = _x;
    };
  } forEach objective_guard_guards;
  
  _result;
};

objective_guard_defaultIfNeccessary = {
  private ["_squads", "_supplyDepots"];
  _squads = ["guard"] call objectiveController_getSquadsWithObjective;
  _supplyDepots = call objective_supply_getAmountOfDepots;
  
  if ((count _squads) > _supplyDepots ) exitWith {
    [(_squads call BIS_fnc_selectRandom), 'supply'] call setChosenObjective;
    call objective_guard_defaultIfNeccessary;
  };
};

objective_guard_overrideMoveToHideout = {
  private ["_validDepots", "_depot", "_objects", "_position"];
  _squad = _this select 0;
  
  _validDepots =  objective_supply_depots - objective_guard_used_depots;
  _depot = _validDepots call BIS_fnc_selectRandom;
  objective_guard_used_depots pushBack _depot;
  
  _objects = [_depot] call depotPositions_getSupplyDepotObjects;
  _objects = [_objects, 1] call depotPositions_getRandomPlaceholdersFromObjects select 0;
  
  _position = [_depot, _objects] call houseFurnisher_getPosASLAndDirection select 0;
  
  {
    _x setPosASL _position;
    [_x] call objective_guard_equipGuard;
    objective_guard_guards pushBack [_x, _depot, []];
    [[getPos _depot], "markers_createGuardMarker", _x, false, true] call BIS_fnc_MP;
  } forEach ([_squad] call getPlayersInSquad);
    
  true;
};

objective_guard_overrideHideoutCache = {
  false;
};

objective_guard_equipGuard = {
  private ["_unit"];
  _unit = _this select 0;
  
  removeUniform _unit;

  _unit forceAddUniform "U_Marshal";
  _unit addVest "V_TacVest_blk_POLICE";
  for "_i" from 1 to 6 do {_unit addItemToVest "CUP_30Rnd_545x39_AK_M";};

  for "_i" from 1 to 6 do {_unit addItemToUniform "AGM_Bandage";};
  for "_i" from 1 to 2 do {_unit addItemToUniform "AGM_Morphine";};

  _unit addWeapon "CUP_arifle_AK74";

  _unit linkItem "ItemMap";
  _unit linkItem "ItemCompass";
  _unit linkItem "ItemWatch";
};

