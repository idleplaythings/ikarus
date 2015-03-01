
objectiveController_types = ['supply', 'hold', 'guard'];

objectiveController_createObjectives = {
  private ["_AO_center"];
  
  _AO_center = call AO_getRandomLandPosition;
  ["defaultIfNeccessary", []] call objectiveController_callObjectives;
  [_AO_center] call depots_create_depots;
  ["construct", []] call objectiveController_callObjectives;
  
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




