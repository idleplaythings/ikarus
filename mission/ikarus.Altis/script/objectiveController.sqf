
objectiveController_types = ['supply', 'guard'];

objectiveController_createObjectives = {
  private ["_AO_center"];
  
  _AO_center = call AO_getRandomLandPosition;
  ["defaultIfNeccessary", []] call objectiveController_callObjectives;
  ["construct", [_AO_center]] call objectiveController_callObjectives;
  
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





