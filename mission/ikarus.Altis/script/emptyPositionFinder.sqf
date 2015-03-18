emptyPositionFinder_findClosest = {
  private ["_startPosition", "_maxDistance", "_step", "_result"];
  _startPosition = _this select 0;
  _maxDistance = _this select 1;

  _startPosition = [_startPosition, 0] call SHK_pos;

  _step = 0;

  while {true} do {
    _result = [_startPosition, _step] call emptyPositionFinder_checkArea;

    if (count _result == 3) exitWith {};

    _step = _step + 2;

    if (_step >= _maxDistance) exitWith {};
  };

  _result;
};

emptyPositionFinder_checkArea = {
  private ["_startPosition", "_distance", "_result", "_direction", "_step"];
  _startPosition = _this select 0; 
  _distance = _this select 1;

  _result = [];
  _direction = 0;
  _step = 10;

  if (_distance == 0 && ([_startPosition, 10, 0.7] call emptyPositionFinder_isFlatAndEmpty)) exitWith {
    _startPosition;
  };

  while {_direction <= 360} do {
    private ["_position"];
    _position = [_direction, _distance, _startPosition] call getPositionInDirection;
    if ([_position, 10, 0.7] call emptyPositionFinder_isFlatAndEmpty) exitWith {
      _result = _position;
    };

    _direction = _direction + _step;
  };

  _result;
};


emptyPositionFinder_isFlatAndEmpty = {
  private ["_position", "_radius", "_gradient", "_result"];
  _position = _this select 0;
  _radius = _this select 1;
  _gradient = _this select 2;

  _result = _position isflatempty [
    _radius, //--- Minimal distance from another object
    1,        //--- If 0, just check position. If >0, select new one
    _gradient,        //--- Max gradient
    _radius, //--- Gradient area
    0,        //--- 0 for restricted water, 2 for required water,
    false        //--- True if some water can be in 25m radius
  ];

  if (count _result == 3 ) exitWith {true;};

  false;
};

/*
depotPositions_findBestPlace = {
  private ["_startPosition", "_maxDistance", "_exp", "_prec"];
  _startPosition = _this select 0;
  _maxDistance = _this select 1;
  _exp = "(1 + meadow) * (1 - forest) * (1 - trees) * (1 - sea)";
  _prec = 10;

  selectBestPlaces [_startPosition, _maxDistance, _exp, _prec, 1] select 0 select 0;
};

depotPositions_findRandomEmptyPosition = {
  private ["_startPosition", "_maxDistance", "_size", "_position"];
  _startPosition = _this select 0;
  _maxDistance = _this select 1;
  _size = _this select 2;
  
  [_startPosition, [0, _maxDistance], [0, 360], 0, [0, 0], _size] call SHK_pos;
};
*/