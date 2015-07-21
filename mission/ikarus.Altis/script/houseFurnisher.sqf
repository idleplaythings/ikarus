
houseFurnisher_furnish = {
  private ["_building", "_data", "_objects"];
  _building = _this select 0;
  _data = _this select 1;
  _objects = [];
  
  _objects = _objects + ([getPosASL _building, getDir _building, _data] call houseFurnisher_furnish_location);

  [_building, houseFurnisher_clearBuilding, [_building, _objects]] call buildingDestroyer_init;

  _objects;
};

houseFurnisher_furnish_location = {
  private ["_origoPosition", "_origoDirection", "_data", "_objects"];
  _origoPosition = _this select 0;
  _origoDirection = _this select 1;
  _data = _this select 2;
  _objects = [];
  
  [_origoPosition] call depotPositions_registerPosition;

  {
    _objects = _objects + ([_origoPosition, _origoDirection, _x] call houseFurnisher_placeObject);
  } forEach _data;
  
  _objects;
};

houseFurnisher_clearBuilding = {
  private ["_building", "_objects"];
  _building = _this select 0;
  _objects = _this select 1;
  
  {
    private ["_position"];
    _position = getPosATL _x;
    _position set [2, 0];
    _x setPosATL _position;
  } forEach _objects;
};

houseFurnisher_getPosASLAndDirectionFromBuilding = {
  private ["_building", "_data"];
  _building = _this select 0;
  _data = _this select 1;

  [getPosASL _building, getDir _building, _data] call houseFurnisher_getPosASLAndDirection;
};

houseFurnisher_getPosASLAndDirection = {
  private ["_origoPosition", "_origoDirection", "_data", "_objectClass", "_direction", "_distance", "_position", "_azimuth", "_height", "_object", "_aboveTerrain"];
  _origoPosition = _this select 0;
  _origoDirection = _this select 1;
  _data = _this select 2;
  
  
  _objectClass = _data select 0;
  _direction = _data select 1;
  _distance = _data select 2;
  _azimuth = _data select 3;
  _height = _data select 4;
  _aboveTerrain = _data select 5;
  
  _direction = [_direction, _origoDirection] call addToDirection;
  _position = [_direction, _distance, _origoPosition] call getPositionInDirection;
  
  _position set [2, ((_origoPosition select 2) + _height)];
  
  if (_aboveTerrain) then {
    _position set [2, (getTerrainHeightASL _position) + _height];
  };
  
  _direction = [_azimuth, _origoDirection] call addToDirection;
  
  [_position, _direction];
};

houseFurnisher_placeObject = {
  private [
    "_objects",
    "_origoPosition",
    "_origoDirection",
    "_data",
    "_objectClass",
    "_aboveTerrain",
    "_direction",
    "_position",
    "_directionAndPosition",
    "_disableSimulation",
    "_extraObjects"
  ];

  _origoPosition = _this select 0;
  _origoDirection = _this select 1;
  _data = _this select 2;
  _objectClass = _data select 0;
  _aboveTerrain = _data select 5;
  _objects = [];

  _extraObjects = nil;
  if (count _data >= 8) then {
    _extraObjects = _data select 7;
  };

  _disableSimulation = false;
  if (count _data >= 7) then {
    _disableSimulation = _data select 6;
  };
  
  _directionAndPosition = [_origoPosition, _origoDirection, _data] call houseFurnisher_getPosASLAndDirection;
  _position = _directionAndPosition select 0;
  _direction = _directionAndPosition select 1; 
 
  _object = createVehicle [_objectClass, [0,0,3000], [], 0, "FLYING"];
  _object setDir _direction;
  _object setPosASL _position;

  if ([_objectClass] call depotPositions_isPlaceHolder) then {
    _object hideObjectGlobal true;
    _object enableSimulation false;
  };

  if (_disableSimulation) then {
    _object enableSimulationGlobal false;
  };

  _objects pushBack _object;

  if (!isNil{_extraObjects}) then {
    private ["_extraData"];
    _extraData = [_extraObjects] call depotPositions_getDepotObjectsByType;
    _objects = _objects + ([getPosASL _object, getDir _object, _extraData] call houseFurnisher_furnish_location);
  };

  _objects;
};














