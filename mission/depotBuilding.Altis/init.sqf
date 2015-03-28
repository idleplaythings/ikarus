br = toString [13,10];//(carriage return & line feed)
buildingData = [];

[] execVM "buildingChecker.sqf";
[] execVM "script\houseFurnisher.sqf";
[] execVM "script\math.sqf";
[] execVM "similarBuildings.sqf";
[] execVM "script\depotPositions.sqf";

placeObjects = {
  private ["_data", "_building", "_objectData"];
  _building = [getPos curatorCamera] call getNearestBuilding;
  
  if (isNil {buildingData select 0}) exitWith {
    hint "No object data saved!";
  };
  
  if (! (typeOf _building in (buildingData select 0))) exitWith {
    hint "Wrong type of building!";
  };
  
  {
    deleteVehicle _x;
  } forEach ([_building] call findObjects);
  
  [_building, (buildingData select 1)] call furnishAHouse;
};

getNearestBuilding = {
  private ["_position"];
  _position = _this select 0;
  _position nearestObject "House";
};

saveObjectsFromMarker = {
  private ["_data", "_object", "_objectData", "_azimuth", "_height", "_aboveTerrain"];
  _data = [];
  _objectData = [];
  _object = _this select 0;
  
  _data set [0, [typeOf _object] call similarBuildings_getSimilar];
  _data set [1, _objectData];
  
  {
    _azimuth = ([getDir _x, getDir _object * -1] call addToDirection);
    _aboveTerrain = true;
    _height = getPosATL _x select 2;
    
    if ( _x getVariable "heightFromHouse" ) then {
      _height = (getPosASL _x select 2) - (getPosASL _object select 2);
      _aboveTerrain = false;
    };
    
   
    _objectData set [count _objectData, [typeOf _x, ([_object, _x] call getNormalizedDirectionFromBuilding), [getPosASL _object, getPosASL _x] call BIS_fnc_distance2D, _azimuth, _height, _aboveTerrain]];

  } forEach ([_object] call findObjects);
  
  buildingData = _data;
  hint ("Objects saved for building: " + typeOf _object + " azimuth: " + str getDir _object);
};

saveObjects = {
  private ["_building"];
  _data = [];
  _objectData = [];
  _building = [getPos curatorCamera] call getNearestBuilding;
  
  [_building] call saveObjectsFromMarker;
};

saveObjectsFromArrow = {
  private ["_arrow"];
  _data = [];
  _objectData = [];
  _arrow = call findArrow;
  player globalChat str _arrow;
  [_arrow] call saveObjectsFromMarker;
};

findObjects = {
  private ["_allMObjects", "_object", "_distance"];
  _allMObjects = [];
  _object = _this select 0;
  //_building = nearestBuilding curatorCamera;
  
  {
    _distance = [_object, _x] call BIS_fnc_distance2D;
    if (side _x == civilian and ! isAgent teamMember _x and _distance < 20) then {
      _allMObjects set [count _allMObjects, _x];
    };
  } forEach allMissionObjects "";

  _allMObjects;
};

findArrow = {
  private ["_arrow", "_position", "_distance"];
  _arrow = "";
  _position = getPos curatorCamera;

  {
    _distance = [_position, _x] call BIS_fnc_distance2D;
    if (side _x == civilian and ! isAgent teamMember _x and _distance < 20 and typeOf _x == "Sign_Arrow_Yellow_F") exitWith {
      _arrow = _x;
    };
  } forEach allMissionObjects "";

  _arrow;
};