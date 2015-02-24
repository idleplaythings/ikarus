getNormalizedDirectionFromBuilding = {
  private ["_building", "_object", "_direction"];
  _building = _this select 0;
  _object = _this select 1;
  
  _direction = [_building, _object] call getDirectionBetween;
  [_direction, getDir _building * -1] call addToDirection;
};

getDirectionBetween = {
  _vd = getPosASL (_this select 1) vectorDiff getPosASL (_this select 0);
  _dir = (_vd select 0) atan2 (_vd select 1); //_dir range from -180 to +180 
  if (_dir < 0) then {_dir = 360 + _dir}; //_dir range from 0 to 360
  _dir;
};

addToDirection = {
  private ["_current", "_add", "_result"];
  _current = _this select 0;
  _add = _this select 1;
  _add = _add % 360;
  _result = 0;

  if (_current + _add > 360) then {
      _result = 0+(_add-(360-_current));
  };
  
  if (_current + _add < 0) then {
      _result = 360 + (_current + _add);
  };
  
  if ((_current + _add >= 0) and (_current + _add <= 360)) then {
      _result = _current + _add;
  };
  
  _result
};

getPositionInDirection = {
  private ["_direction", "_distance", "_position", "_x", "_y"];
  _direction = _this select 0;
  _distance = _this select 1;
  _position = _this select 2;
  _x = _position select 0;
  _y = _position select 1;

  _x = _x + (_distance * (sin _direction));
  _y = _y + (_distance * (cos _direction));

  [_x, _y];
};

distance2d = {
  private ["_x1", "_x1", "_y1", "_y1", "_result"];
  _x1 = (getPosASL (_this select 0)) select 0;
  _x2 = (getPosASL (_this select 1)) select 0;
  _y1 = (getPosASL (_this select 0)) select 1;
  _y2 = (getPosASL (_this select 1)) select 1;
  
  _result = sqrt ((_x2 - x1)^2 + (_y2 - y1)^2);
  player globalChat str _result;
  _result;
};

getPositionInNearestTown = {
  private ["_startPos", "_towns", "_position"];
  _startPos = _this select 0;
  
  _towns = nearestLocations [_startPos, ["NameVillage","NameCity","NameCityCapital"], 25000]; 
  _position = locationPosition (_towns select 0);
  
  _position set [0, (_position select 0) + (random 300) - (random 300)]; 
  _position set [1, (_position select 1) + (random 300) - (random 300)];

  _position;
};





