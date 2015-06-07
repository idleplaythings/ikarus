objective_assasination_assasinData = [];

objective_assasination_construct = {};

objective_assasination_displayName = {
  "Assasination"
};

objective_assasination_getAssasinData = {
  private ["_unit", "_result"];
  _unit = _this select 0;
  _result = nil;
  
  if ([_unit] call objectiveController_getUnitsObjective != "assasination") exitWith {nil;};

  {
    if ((_x select 0) == _unit) exitWith {
      _result = _x;
    };
  } forEach objective_assasination_assasinData;
  
  if (isNil {_result}) exitWith {
    _result = [_unit, nil, []];
    objective_assasination_assasinData pushBack _result;
    _result;
  };
  _result;
};

objective_assasination_joinInProgress = {
  _this call objective_assasination_setPlayerRating;
};

objective_assasination_setPlayerRating = {
  _this call objective_supply_setPlayerRating;
};

objective_assasination_onObjectivesCreated = {
  call objective_assasination_getTargetForAll;
};

objective_assasination_validate = {
  private ["_squad"];
  _squad = _this select 0;
  count ([_squad] call getPlayersInSquad) == 1 && count squads > 1;
};

objective_assasination_overridesAppearance = {
  false;
};

objective_assasination_getTargetForAll = {
  private ["_assasins", "_data"];
  _assasins = [['assasination']] call objectiveController_getPlayersWithObjectives;

  {
    _data = [_x] call objective_assasination_getAssasinData;
    _data set [1, ([_x] call objective_assasination_getTargetForUnit)];
    [[], "markers_createAssasinBriefing", _x, false, true] call BIS_fnc_MP;
  } forEach _assasins;
};

objective_assasination_getTargetForUnit = {
  private ["_unit", "_players", "_squad"];
  _unit = _this select 0;
  _squad = [_unit] call getSquadForUnit;

  if (count ([_squad] call getSquadPlayerUIDs) > 1) exitWith {
    nil;
  };

  _players = [_unit, false] call objective_assasination_getPossibleTargets;

  if (count _players == 0) then {
    _players = [_unit, true] call objective_assasination_getPossibleTargets;
  };

  if (count _players == 0) exitWith {
    ["No new suitable targets for assasination", _unit] call broadcastMessageTo;
    nil;
  };

  _target = _players call BIS_fnc_selectRandom;
  _target;
};

objective_assasination_getPossibleTargets = {
  private ["_unit", "_allowGuards", "_players"];
  _unit = _this select 0;
  _allowGuards = [_this, 1, false] call BIS_fnc_param;

  _players = call getAllPlayers;

  _players = [_players, {
    private ["_target"];
    _target = _this;

    if (_target == _unit) exitWith {
      false;
    };

    if (! _allowGuards && [_target, "guard"] call objectiveController_unitHasObjective) exitWith {
      false;
    };

    if ([_unit, _target] call hasSameSquad) exitWith {
      false;
    };

    true;

  }] call AEX_filter;

  _players;  
};

objective_assasination_insideDepot = {};

objective_assasination_onKilled = {
  private ["_unit", "_killer", "_assasinData"];
  _unit = _this select 0;
  _killer = _this select 1;
  
  _assasinData = [_killer] call objective_assasination_getAssasinData;
  
  if (isNil {_assasinData} || isNil {_assasinData select 1}) exitWith {};
  
  if (_unit != _assasinData select 1) exitWith {};

  if (_killer != _assasinData select 0) exitWith {
    [_unit, _assasinData] spawn objective_assasination_targetDead;
  };
  
  [_assasinData] call objective_assasination_reward;
  [_unit, _assasinData] spawn objective_assasination_targetKilled;
};

objective_assasination_targetDead = {
  private ["_unit", "_assasinData"];
  _unit = _this select 0;
  _assasinData = _this select 1;

  sleep (30 + random 60);
  ["Your target has died. You will get a new target soon, if possible", _unit] call broadcastMessageTo;
  sleep (60 + random 120);
  _assasinData set [1, ([] call objective_assasination_getTargetForUnit)];
};

objective_assasination_targetKilled = {
  private ["_unit", "_assasinData"];
  _unit = _this select 0;
  _assasinData = _this select 1;
  
  sleep (10 + random 20);
  ["You have killed your target. You will get a new target soon, if possible", _unit] call broadcastMessageTo;
  sleep (60 + random 120);
  _assasinData set [1, ([] call objective_assasination_getTargetForUnit)];
};

objective_assasination_onDisconnected = {
  private ["_squad", "_unit", "_inHideout", "_assasinData", "_squad", "_amount"];
  _squad = _this select 0;
  _unit = _this select 1;
  _inHideout = _this select 2;
  
  if (_inHideout) then {
    _assasinData = [_unit] call objective_assasination_getAssasinData;
    
    _amount = count (_assasinData select 2);
    
    while {_amount > 0} do {
      _amount = _amount -1;
      [_squad, ["assasination_objective_reward2"]] call addDisconnectedLoot;
    };
   
  };
};

objective_assasination_canOpenLootBoxes = {true;};

objective_assasination_reward = {
  private ["_assasinData", "_squad", "_reward"];
  _assasinData = _this select 0;
  _reward = ["assasination_objective_reward1"];
  _squad = [(_assasinData select 0)] call getSquadForUnit;

  if (isNil{_squad}) exitWith {false;};
      
  [_squad, _reward] call addDisconnectedLoot;
  _assasinData set [2, (_assasinData select 2) + _reward ];
};

objective_assasination_defaultIfNeccessary = {};

objective_assasination_overrideHideoutCache = {false;};

objective_assasination_updateMarkers = {
  private ["_assasin", "_target", "_position", "_radius"];
  _radius = 300;

  {
    if (isNil {_x select 1}) exitWith {};

    _assasin = _x select 0;
    _target = _x select 1;
    _position = [_target, [0, _radius], random 360, 1] call SHK_pos;

    [[_position, _radius], "markers_updateAssasinMarker", _assasin, false, true] call BIS_fnc_MP;
  } forEach objective_assasination_assasinData;
};

_this spawn {
  while { true } do {

    sleep 60;
    call objective_assasination_updateMarkers;
  }
};

objective_assasination_getAmountOfDepots = {
  private ["_objectives", "_amount"];
  _objectives = ["assasination"] call objectiveController_getSquadsWithObjective;
  
  if (count _objectives > 0) exitWith {1;};

  0;
};