br = toString [13,10];//(carriage return & line feed)
buildingData = [];

[] execVM "buildingChecker.sqf";
[] execVM "houseFurnisher.sqf";
[] execVM "math.sqf";
[] execVM "similarBuildings.sqf";

placeObjects = {
  private ["_data", "_building", "_objectData"];
  _building = nearestBuilding curatorCamera;
  
  if (isNil {buildingData select 0}) exitWith {
    hint "No object data saved!";
  };
  
  if (! (typeOf _building in (buildingData select 0))) exitWith {
    hint "Wrong type of building!";
  };
  
  {
    deleteVehicle _x;
  } forEach call findObjects;
  
  [_building, (buildingData select 1)] call furnishAHouse;
};

saveObjects = {
  private ["_data", "_building", "_objectData", "_azimuth"];
  _data = [];
  _objectData = [];
  _building = nearestBuilding curatorCamera;
  
  _data set [0, [typeOf _building] call similarBuildings_getSimilar];
  _data set [1, _objectData];
  
  {
    _azimuth = ([getDir _x, getDir _building * -1] call addToDirection);
    //_x setDir 0;
    _objectData set [count _objectData, [typeOf _x, ([_building, _x] call getNormalizedDirectionFromBuilding), [getPosASL _building, getPosASL _x] call BIS_fnc_distance2D, _azimuth, (getPosATL _x) select 2]];
    //_x setDir _azimuth;
  } forEach call findObjects;
  
  buildingData = _data;
  hint ("Objects saved for building: " + typeOf _building + " azimuth: " + str getDir _building);
};

findObjects = {
  private ["_allMObjects", "_building", "_distance"];
  _allMObjects = [];
  _building = nearestBuilding curatorCamera;
  
  {
    _distance = [_building, _x] call BIS_fnc_distance2D;
    if (side _x == civilian and ! isAgent teamMember _x and _distance < 20) then {
      _allMObjects set [count _allMObjects, _x];
    };
  } forEach allMissionObjects "";

  _allMObjects;
};
