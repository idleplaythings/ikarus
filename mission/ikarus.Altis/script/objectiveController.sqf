
objectiveController_list = [];

objectiveController_types = ['supply'];

objectiveController_createObjectives = {
  private ["_AO_center", "_objectives"];
  
  _AO_center = call AO_getRandomLandPosition;
  player globalChat str _AO_center;
  objectiveController_list = [_AO_center] call objectiveController_compileObjectives;
  
};

objectiveController_compileObjectives = {
  private ["_AO_center", "_objectives", "_objective"];
  _objectives = [];
  _AO_center = _this select 0;
  
  {
    _objective = ([_x] call getChosenObjectives) select 0;
    _objectives set [count _objectives, [_objective, _x]];
  } forEach squads;
  
  
  [_objectives, _AO_center] call objectiveController_constructTypes;
};

objectiveController_constructTypes = {
  private ["_AO_center", "_objectives", "_constructedObjectives"];
  _objectives = _this select 0;
  _AO_center = _this select 1;
  _constructedObjectives = [];
  
  {
    [_x, _objectives, _constructedObjectives, _AO_center] call objectiveController_constructType;
  } forEach objectiveController_types;
  
  _constructedObjectives;
};

objectiveController_constructType = {
  private ["_type", "_objectives", "_constructedObjectives", "_AO_center"];
  _type = _this select 0;
  _objectives = _this select 1;
  _constructedObjectives = _this select 2;
  _AO_center = _this select 3;
  
  _objectives = [_type, _objectives] call objectiveController_getObjectivesOfType;
  
  _objectives = call compile format ["[_objectives, _AO_center] call objective_%1_construct;", _type];
  _constructedObjectives = _constructedObjectives + _objectives;
  
  _constructedObjectives;
};

objectiveController_getObjectivesOfType = {
  private ["_type", "_objectives", "_objectivesOfType"];
  _type = _this select 0;
  _objectives = _this select 1;
  _objectivesOfType = [];

  {
    if ((_x select 0) == _type) then {
      _objectivesOfType set [count _objectivesOfType, _x];
    };
  } forEach _objectives;
  
  _objectivesOfType;
};








