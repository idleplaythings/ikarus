
houseFurnisher_furnish = {
  private ["_building", "_data"];
  _building = _this select 0;
  _data = _this select 1;
  
  [getPos _building] call depotPositions_registerPosition;

  {
    [_building, _x] call houseFurnisher_placeObject;
  } forEach _data;
};

houseFurnisher_getPosASLAndDirection = {
  private ["_building", "_data", "_objectClass", "_direction", "_distance", "_position", "_azimuth", "_height", "_object", "_aboveTerrain"];
  _building = _this select 0;
  _data = _this select 1;
  
  
  _objectClass = _data select 0;
  _direction = _data select 1;
  _distance = _data select 2;
  _azimuth = _data select 3;
  _height = _data select 4;
  _aboveTerrain = _data select 5;
  
  _direction = [_direction, getDir _building] call addToDirection;
  _position = [_direction, _distance, getPosASL _building] call getPositionInDirection;
  
  _position set [2, ((getPosASL _building select 2) + _height)];
  
  if (_aboveTerrain) then {
    _position set [2, (getTerrainHeightASL _position) + _height];
  };
  
  _direction = [_azimuth, getDir _building] call addToDirection;
  
  [_position, _direction];
};

houseFurnisher_placeObject = {
  private ["_building", "_data", "_objectClass", "_direction", "_position", "_directionAndPosition"];
  _building = _this select 0;
  _data = _this select 1;
  _objectClass = _data select 0;
  
   if ([_objectClass] call depotPositions_isPlaceHolder) exitWith {};
  
  _directionAndPosition = [_building, _data] call houseFurnisher_getPosASLAndDirection;
  _position = _directionAndPosition select 0;
  _direction = _directionAndPosition select 1; 
 
  _object = createVehicle [_objectClass, [0,0,3000], [], 0, "FLYING"];
  _object setDir _direction;
  _object setPosASL _position;
};














