br = toString [13,10];//(carriage return & line feed)
buildingData = [];

[] execVM "buildingChecker.sqf";
[] execVM "script\houseFurnisher.sqf";
[] execVM "script\math.sqf";
[] execVM "similarBuildings.sqf";
[] execVM "script\depotPositions.sqf";

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
  private ["_data", "_building", "_objectData", "_azimuth", "_height", "_aboveTerrain"];
  _data = [];
  _objectData = [];
  _building = nearestBuilding curatorCamera;
  
  _data set [0, [typeOf _building] call similarBuildings_getSimilar];
  _data set [1, _objectData];
  
  {
    _azimuth = ([getDir _x, getDir _building * -1] call addToDirection);
    _aboveTerrain = true;
    _height = getPosATL _x select 2;
    
    if ( _x getVariable "heightFromHouse" ) then {
      player globalChat "object with heightFromHouse";
      _height = (getPosASL _x select 2) - (getPosASL _building select 2);
      _aboveTerrain = false;
    };
    
   
    _objectData set [count _objectData, [typeOf _x, ([_building, _x] call getNormalizedDirectionFromBuilding), [getPosASL _building, getPosASL _x] call BIS_fnc_distance2D, _azimuth, _height, _aboveTerrain]];

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
