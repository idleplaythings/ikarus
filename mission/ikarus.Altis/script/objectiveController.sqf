
objectiveController_types = ['supply', 'hold', 'guard'];

"chooseObjective" addPublicVariableEventHandler {
  private ["_unit", "_objective", "_squad"];
  _unit = _this select 1 select 0;
  _objective = _this select 1 select 1;
  _squad = [_unit] call getSquadForUnit;
  [_squad, _objective] call objectiveController_changeSquadObjective;
};

objectiveController_setPlayerRatings = {
  {
    [_x, 'setPlayerRating', [_x]] call objectiveController_callUnitObjective;
  } forEach (call getAllPlayers);
};

objectiveController_startObjectiveChoosing = {
  {
    [_x] call objectiveController_sendChooseObjectiveMenu;
  } forEach squads;
};

objectiveController_sendChooseObjectiveMenu = {
  private ["_leader", "_objectives", "_squad", "_valid", "_displayName"];
  _squad = _this select 0;
  _objectives = [];

  _leader = [_squad] call getSquadLeader;

  if ( isNil {_leader}) exitWith {};

  {
    _valid = [_x, 'validate', [_squad]] call objectiveController_callObjective;
    if (_valid) then {
      _displayName = [_x, 'displayName', []] call objectiveController_callObjective;
      _objectives pushBack [_displayName, _x];
    };
  } forEach objectiveController_types;

  [
    [
      _objectives,
      ([_squad] call getChosenObjective),
      missionControl_timeObjectivesGenerated
    ], 
    "objectiveDialog_show", 
    _leader, 
    false, 
    true
  ] call BIS_fnc_MP;
};

objectiveController_hideChooseObjectiveMenu = {
  {
    [[], "objectiveDialog_ready", _x, false, true] call BIS_fnc_MP;
  } forEach call getAllPlayers;
};

objectiveController_changeSquadObjective = {
  private ["_objective", "_squad", "_valid"];

  if (missionControl_objectivesGenerated) exitWith {};

  _squad = _this select 0;
  _objective = _this select 1;
  _valid = [_objective, 'validate', [_squad]] call objectiveController_callObjective;
  if (! _valid) exitWith {};

  [_squad, _objective] call setChosenObjective;
};

objectiveController_createObjectives = {
  private ["_AO_center"];
  
  _AO_center = call AO_getRandomLandPosition;
  ["defaultIfNeccessary", []] call objectiveController_callObjectives;
  [_AO_center] call depots_create_depots;
  ["construct", []] call objectiveController_callObjectives;
  ["onObjectivesCreated", []] call objectiveController_callObjectives;
  call objectiveController_setPlayerRatings;
};

objectiveController_getSquadsWithObjectives = {
  private ["_squads", "_objectives"];
  _objectives = _this select 0;
  _squads = [];
  
  {
    _squads = _squads + [_x] call objectiveController_getSquadsWithObjective;
  } forEach _objectives;
  
  _squads;
};

objectiveController_getSquadsWithObjective = {
  private ["_squads", "_objective"];
  _objective = _this select 0;
  _squads = [];
  
  {
    if (([_x] call getChosenObjective) == _objective) then {
      _squads pushBack _x;
    };
  } forEach squads;
  
  _squads;
};

objectiveController_getSquadsWithOutObjective = {
  private ["_squads", "_objective"];
  _objective = _this select 0;
  _squads = [];
  
  {
    if (([_x] call getChosenObjective) != _objective) then {
      _squads pushBack _x;
    };
  } forEach squads;
  
  _squads;
};

objectiveController_callObjectives = {
  private ["_functionName", "_arguments"];
  _functionName = _this select 0;
  _arguments = _this select 1;
  
  {
    [_x, _functionName, _arguments] call objectiveController_callObjective;
  } forEach objectiveController_types;
};

objectiveController_callObjective = {
  private ["_objective", "_functionName", "_arguments"];
  _objective = _this select 0;
  _functionName = _this select 1;
  _arguments = _this select 2;
  
  call compile format ["_arguments call objective_%1_%2;", _objective, _functionName];
  
};

objectiveController_callSquadObjective = {
  private ["_squad", "_objective", "_functionName", "_arguments"];
  
  _squad = _this select 0;
  _functionName = _this select 1;
  _arguments = _this select 2;
  _objective = [_squad] call getChosenObjective;
  
  [_objective, _functionName, _arguments] call objectiveController_callObjective;
  
};

objectiveController_callUnitObjective = {
  private ["_squad", "_unit"];
  _unit = _this select 0;
  _functionName = _this select 1;
  _arguments = _this select 2;
  _squad = [_unit] call getSquadForUnit;
  
  [_squad, _functionName, _arguments] call objectiveController_callSquadObjective;
};

objectiveController_getUnitsObjective = {
  private ["_unit"];
  _unit = _this select 0;

  [([_unit] call getSquadForUnit)] call getChosenObjective;
};

objectiveController_getPlayersWithoutObjectives = {
  private ["_objectives"];
  _objectives = _this select 0;
  _players = [];

  {
    private ["_objective"];
    _objective = [_x] call objectiveController_getUnitsObjective;
    if ! (_objective in _objectives) then {
      _players pushBack _x;
    }
  } forEach (call getAllPlayers);

  _players;
};

objectiveController_getPlayersWithObjectives = {
  private ["_objectives"];
  _objectives = _this select 0;
  _players = [];

  {
    private ["_objective"];
    _objective = [_x] call objectiveController_getUnitsObjective;
    if (_objective in _objectives) then {
      _players pushBack _x;
    }
  } forEach (call getAllPlayers);

  _players;
};




