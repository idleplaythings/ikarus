objective_supply_construct = {
  private ["_objectives", "_centerOfAO", "_depots", "_players"];
  _objectives = _this select 0;
  _centerOfAO = _this select 1;

  _depots = [_objectives, _centerOfAO] call objective_supply_constructDepots;
  _players = [_objectives] call objective_supply_getPlayers;
  
  [_depots, _players] call objective_supply_constructMarkers;
  
  ['hi'];
};

objective_supply_getPlayers = {
  private ["_objectives", "_players"];
  _objectives = _this select 0;
  _players = [];
  
  {
    _players = _players + ([(_x select 1)] call getPlayersInSquad);
  } forEach _objectives;

  _players;
};

objective_supply_constructMarkers = {
  private ["_depotPositions", "_players", "_radius", "_offset"];
  _depotPositions = _this select 0;
  _players = _this select 1;
  _radius = 500;
  _offset = _radius / 2;
  
  {
    _position = [_x, _offset] call SHK_pos;
    {
      [[_position, _radius], "markers_createSupplyMarker", _x, false, true] call BIS_fnc_MP;
    } forEach _players;  
  } forEach _depotPositions;
};

objective_supply_constructDepots = {
  private ["_objectives", "_centerOfAO", "_numberOfDepots", "_depots", "_radius", "_depotPosition"];
  _objectives = _this select 0;
  _centerOfAO = _this select 1;
  _numberOfDepots = [_objectives] call objective_supply_getAmountOfDepots;
  _radius = [_objectives] call objective_supply_getRadiusOfAO;
  _depots = [];
  
  while {_numberOfDepots > 0} do {
    _depotPosition = [_centerOfAO, _radius] call objective_supply_constructDepot;

    _depots set [count _depots, _depotPosition];
    _numberOfDepots = _numberOfDepots - 1;
  };
  
  _depots;
};

objective_supply_constructDepot = {
  private ["_centerOfAO", "_radius", "_position"];
  _centerOfAO = _this select 0;
  _radius = _this select 1;
  
  _position = [_centerOfAO, _radius] call SHK_pos;

  [_position] call objective_supply_aquireClosestDepot;
};

objective_supply_aquireClosestDepot = {
  private ["_position", "_buildingData", "_building", "_objectData"];
  _position = _this select 0;
  
  _buildingData = [_position] call objective_supply_findHouseForDepot;
  _building = _buildingData select 0;
  _objectData = _buildingData select 1;
  
  [_building, _objectData] call houseFurnisher_furnish;
  [_building, _objectData] call objective_supply_placeLootBoxes;
  
  getPosASL _building;
};

objective_supply_placeLootBoxes = {
  private ["_building", "_objectData", "_amount"];
  _building = _this select 0;
  _objectData = _this select 1;
  
  _amount = (ceil random 2) + 1;
  _objectData = [_objectData, _amount] call depotPositions_getRandomPlaceholdersFromObjects;
  
  {
    private ["_directionAndPosition", "_direction", "_position"];
    _directionAndPosition = [_building, _x] call houseFurnisher_getPosASLAndDirection;
    _position = _directionAndPosition select 0;
    _direction = _directionAndPosition select 1; 
    
    [_position, _direction] call lootbox_create;
    
  } forEach _objectData;
};

objective_supply_getAmountOfDepots = {
  private ["_objectives", "_amount"];
  _objectives = _this select 0;
  
  _amount = floor ((count _objectives) / 2);
  
  if (_amount == 0) exitWith {
    1;
  };

  _amount;
};

objective_supply_getRadiusOfAO = {
  1000;
};

objective_supply_checkIsSuitableForDepot = {
  private ["_position"];
  _position = _this select 0;
  
  [_position, 100] call depotPositions_checkNothingInDistance;
  
};

objective_supply_findHouseForDepot = {
  private ["_position", "_buildings", "_building", "_found", "_objects"];
  _position = _this select 0;
  _building = nil;
  _objects = nil;
  _found = false;
  
  _buildings = nearestObjects [_position, ["house"], 5000];
  
  for [{_i= 0},{_i < count _buildings and ! false},{_i = _i + 1}] do {
    _building = _buildings select _i;
    _objects = [_building] call depotPositions_getSupplyDepotObjects;
    
    if ( ! isNil {_objects} and [getPos _building] call objective_supply_checkIsSuitableForDepot) exitWith {
      _building;
    };
  };
  
  [_building, _objects];
};