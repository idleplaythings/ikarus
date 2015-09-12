emptyPositionFinder_maxGradient = 0.3;
emptyPositionFinder_radius = 10;

emptyPositionFinder_findWithGrid = {
  private ["_startPosition", "_validation", "_accuracy", "_distance", "_distanceStep", "_maxDistance"];
  _startPosition = _this select 0;
  _validation = _this select 1;
  _accuracy = [_this, 2, 0.5] call BIS_fnc_param;
  _distanceStep = [_this, 3, 1000] call BIS_fnc_param;
  _maxDistance = [_this, 4, 2000] call BIS_fnc_param; 

  if (count ([_startPosition] call _validation) == 3)  exitWith {_startPosition}; 

  _distance = 0;
 
  _result = [];
  _break = false;

  while {! _break && _distance < _maxDistance} do {
    private ["_degree", "_degreeStep"];
    _distance = _distance + _distanceStep;
    _degree = 0;
    _degreeStep = 360 * (100 * _accuracy) / _distance;

    while {! _break && _degree < 360} do {
      _position = [_degree, _distance, _startPosition] call getPositionInDirection;
      
      /*
      _marker = createMarkerLocal ["test" + str _position, _position];
      _marker setMarkerTypeLocal "mil_box";
      _marker setMarkerColorLocal "ColorBlue";
      */

      _position = [_position] call _validation;
      if (count _position == 3) then {
        _result = _position;
        _break = true;
      };

      _degree = ceil (_degree + _degreeStep);
    };

  };

  _result;
};

emptyPositionFinder_landValidation = {
  private ["_position"];
  _position = _this select 0;

  if (getTerrainHeightASL _position > 0) exitWith {
    _position;
  };

  [];
};

emptyPositionFinder_landSearchDistance = 1000;
emptyPositionFinder_landSearchAccuracy = 1;
emptyPositionFinder_landSearchMaxDistance = 20000;

emptyPositionFinder_findLand = {
  private ["_startPosition", "_distance", "_distanceStep"];
  _startPosition = _this select 0;

  [
    _startPosition, 
    emptyPositionFinder_landValidation,
    emptyPositionFinder_landSearchAccuracy,
    emptyPositionFinder_landSearchDistance,
    emptyPositionFinder_landSearchMaxDistance
  ] call emptyPositionFinder_findWithGrid;
};

/*
emptyPositionFinder_findClosestWithGrid = {
  private ["_startPosition", "_maxDistance", "_validation", "_radius", "_gradient"];
  _startPosition = _this select 0;
  _maxDistance = _this select 1;
  _validation = [_this, 2, {true;}] call BIS_fnc_param;
  _radius = [_this, 3, emptyPositionFinder_radius] call BIS_fnc_param;
  _gradient = [_this, 4, emptyPositionFinder_maxGradient] call BIS_fnc_param;

  _searchDistance = 5;

  _startPosition = [_startPosition] call emptyPositionFinder_findLand;
  
  [
    _startPosition, 
    {
      private ["_position"];
      _position = _this select 0;

      [_position, _validation, _radius, _gradient] call emptyPositionFinder_checkPosition;
    },
    0.2,
    10
  ] call emptyPositionFinder_findWithGrid;

};
*/

emptyPositionFinder_findClosest = {
  private ["_try", "_result", "_startPosition", "_position", "_maxDistance", "_validation", "_radius", "_gradient"];
  _position = _this select 0;
  _maxDistance = _this select 1;
  _validation = [_this, 2, {true;}] call BIS_fnc_param;
  _radius = [_this, 3, emptyPositionFinder_radius] call BIS_fnc_param;
  _gradient = [_this, 4, emptyPositionFinder_maxGradient] call BIS_fnc_param;
  _try = [_this, 5, 1] call BIS_fnc_param;

  _searchDistance = 50;

  _position = [_position] call emptyPositionFinder_findLand;
  _startPosition = _position;
  _result = [];
  
  while {true} do {

    _position = [_position, _validation, _radius, _gradient] call emptyPositionFinder_checkPosition;

    if (count _position == 3) exitWith {_result = _position};

    _position = _startPosition;
    _searchDistance = _searchDistance + 10;

    if (_searchDistance >= _maxDistance) exitWith {};

    _position = [_position, 0, _searchDistance] call popoRandom_findLand;
    //_position = [_position, _searchDistance, random 360, 0, [0, 0], "I_Heli_light_03_unarmed_F"] call SHK_pos;
  };

  if (count _result == 0) exitWith {
    
    //_startPosition = [_startPosition, 100, 300] call popoRandom_findLand;
    _startPosition = [_startPosition, _maxDistance / 2, random 360, 1] call SHK_pos;
    [_startPosition, _maxDistance, _validation, _radius, _gradient, _try + 1] call emptyPositionFinder_findClosest;
  };
  _result;
};

emptyPositionFinder_findMilitaryBasePosition = {
  [_this select 0, 1000, {true;}, 25, 0.2] call emptyPositionFinder_findClosest
};

emptyPositionFinder_findHideoutPosition = {
  private ["_validation"];
  _validation = {
    private ["_position"];
    _position = _this select 0;

    [_position] call hideout_distanceFromClosestHideout > 100;
  };

  [_this select 0, 1000, _validation, emptyPositionFinder_radius, 0.15] call emptyPositionFinder_findClosest
};

emptyPositionFinder_checkPosition = {
  private ["_position", "_validation", "_radius", "_gradient"];
  _position = _this select 0;
  _validation = _this select 1;
  _radius = [_this, 2, emptyPositionFinder_radius] call BIS_fnc_param;
  _gradient = [_this, 3, emptyPositionFinder_maxGradient] call BIS_fnc_param;

  _position = [_position, _radius, _gradient] call emptyPositionFinder_isFlatAndEmpty;

  if (count _position == 0) exitWith {
    [];
  }; 

  if ([_position] call _validation) exitWith {
    _position;
  };

  [];
};
/*
emptyPositionFinder_checkArea = {
  private ["_startPosition", "_distance", "_validation", "_result", "_direction", "_step"];
  _startPosition = _this select 0; 
  _distance = _this select 1;
  _validation = _this select 2;

  _result = [];
  _direction = 0;
  _step = 10;

  if (_distance == 0 && ([_startPosition, emptyPositionFinder_radius, emptyPositionFinder_maxGradient] call emptyPositionFinder_isFlatAndEmpty) && [_startPosition] call _validation) exitWith {
    _startPosition;
  };

  while {_direction <= 360} do {
    private ["_position"];
    _position = [_direction, _distance, _startPosition] call getPositionInDirection;
    if ([_position, emptyPositionFinder_radius, emptyPositionFinder_maxGradient] call emptyPositionFinder_isFlatAndEmpty && [_position] call _validation) exitWith {
      _result = _position;
    };

    _direction = _direction + _step;
  };

  _result;
};
*/

emptyPositionFinder_isFlatAndEmpty = {
  private ["_position", "_radius", "_gradient", "_result"];
  _position = _this select 0;
  _radius = _this select 1;
  _gradient = _this select 2;

  _position isflatempty [
    _radius, //--- Minimal distance from another object
    1,        //--- If 0, just check position. If >0, select new one
    _gradient,        //--- Max gradient
    _radius, //--- Gradient area
    0,        //--- 0 for restricted water, 2 for required water,
    false        //--- True if some water can be in 25m radius
  ];
};

emptyPositionFinder_test = {
  private ["_testFunction", "_step", "_size", "_radius", "_gradient", "_toCheck"];
  _testFunction = [_this, 0, emptyPositionFinder_findMilitaryBasePosition] call BIS_fnc_param;
  _step = [_this, 1, 100] call BIS_fnc_param;
  _toCheck = [];

  for "_i" from 0 to (19000 / _step) - 1 do {
    private ["_y1", "_x1"];
    _y1 = _i;

    for "_k" from 0 to (26000 / _step) - 1 do {
      _x1 = _k;
      _toCheck pushBack [
        _x1 * _step + 2000,
        _y1 * _step + 6000,
        0
      ];
    };
  };
  
  {
    private ["_position", "_marker"];
    sleep 0.01;
    _position = [_x] call _testFunction;

    if (count _position == 3) then {
      _marker = createMarkerLocal ["test" + str _position, _position];
      _marker setMarkerTypeLocal "mil_box";
      _marker setMarkerColorLocal "ColorGreen";
    } else {
      _marker = createMarkerLocal ["test" + str _x, _x];
      _marker setMarkerTypeLocal "mil_box";
      _marker setMarkerColorLocal "ColorRed";
    }
  } forEach _toCheck;
  
};