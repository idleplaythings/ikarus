depots_supply_depots = [];
depots_town_depots = [];
depots_military_depots = [];

depots_create_depots = {
  private ["_centerOfAO"];
  _centerOfAO = _this select 0;

  [_centerOfAO] call depots_create_supply;
  [_centerOfAO] call depots_create_town;
  [_centerOfAO] call depots_create_military;
};

depots_getTotalAmount = {
  call depots_getAmountOfNormalDepotsToSpawn 
  + call depots_getAmountOfTownDepotsToSpawn 
  + call depots_getAmountOfMilitaryDepotsToSpawn;
};

depots_getAll = {
  depots_town_depots + depots_supply_depots + depots_military_depots;
};

depots_getRandom = {
  private ["_depots"];
  _depots = call depots_getAll;

  if (count _depots == 0) exitWith {
    nil;
  };
  (call depots_getAll) call BIS_fnc_selectRandom;
};

depots_getClosestDepot = {
  private ["_unit", "_depots", "_closest"];
  _unit = _this select 0;
  _depots = call depots_getAll;

  if (count _depots == 0) exitWith {
    nil;
  };

  _closest = nil;

  {
    if (isNil{_closest}) then {
      _closest = _x;
    };
    if ((_x select 0) distance _unit < (_closest select 0) distance _unit) then {
      _closest = _x;
    };
  } forEach _depots;

  _closest;
};

depots_getDistanceToClosestDepot = {
  private ["_unit", "_closest"];
  _unit = _this select 0;
  _closest = [_unit] call depots_getClosestDepot;

  if (isNil{_closest}) exitWith {
    999999999;
  };

  (_closest select 0) distance _unit;
};

depots_getAllDepotPositions = {
  private ["_depots", "_positions"];
  _depots = call depots_getAll;
  _positions = [];

  {
    if (typeName (_x select 0) == "ARRAY") then {
      _positions pushBack (_x select 0);
    } else {
      _positions pushBack getPos (_x select 0);
    };
  } forEach _depots;

  _positions;
};

depots_create_town = {
  private ["_centerOfAO"];
  _centerOfAO = _this select 0;
  _radius = call depots_getRadiusOfTownAO;
  _numberOfDepots = call depots_getAmountOfTownDepotsToSpawn;

  while {_numberOfDepots > 0} do {
    _depot = [_centerOfAO, _radius] call depots_constructTownDepot;
    depots_town_depots pushBack _depot;
    _numberOfDepots = _numberOfDepots - 1;
  };
};

depots_create_supply = {
  private ["_centerOfAO"];
  _centerOfAO = _this select 0;
  _radius = call depots_getRadiusOfSupplyAO;
  _numberOfDepots = call depots_getAmountOfNormalDepotsToSpawn;

  while {_numberOfDepots > 0} do {
    _depot = [_centerOfAO, _radius] call depots_constructSupplyDepot;
    depots_supply_depots pushBack _depot;
    _numberOfDepots = _numberOfDepots - 1;
  };
};

depots_create_military = {
  private ["_centerOfAO"];
  _centerOfAO = _this select 0;
  _radius = call depots_getRadiusOfSupplyAO;
  _numberOfDepots = call depots_getAmountOfMilitaryDepotsToSpawn;

  while {_numberOfDepots > 0} do {
    _depot = [_centerOfAO, _radius] call depots_constructMilitaryDepot;
    depots_military_depots pushBack _depot;
    _numberOfDepots = _numberOfDepots - 1;
  };
};

depots_getAmountOfMilitaryDepotsToSpawn = {
  private ["_amount"];
  call objective_military_getAmountOfDepots;
};

depots_getAmountOfNormalDepotsToSpawn = {
  private ["_amount", "_townAmount"];
  _amount = call objective_supply_getAmountOfDepots;
  _townAmount = call depots_getAmountOfTownDepotsToSpawn;
 
  if (count squads == 3 && _townAmount > 0) exitWith {0;};

  _amount;
};

depots_getRadiusOfSupplyAO = {
  (call depots_getAmountOfNormalDepotsToSpawn) * 0.5 * 1000;
};

depots_constructMilitaryDepot = {
  private ["_centerOfAO", "_radius", "_position", "_data", "_objectData"];

  _centerOfAO = _this select 0;
  _radius = _this select 1;
  _position = [_centerOfAO, 0, _radius] call popoRandom_findLand;
  _position = [_position, 1000, {true;}] call emptyPositionFinder_findClosest;

  _data = [] call depotPositions_getPremiumDepotObjects;
  _objectData = [_position, random 360, _data] call houseFurnisher_furnish_location;

  [_position, _objectData];
};

depots_constructSupplyDepot = {
  private ["_centerOfAO", "_radius", "_buildingData", "_building", "_objectData", "_objects"];
  _centerOfAO = _this select 0;
  _radius = _this select 1;

  _buildingData = [_centerOfAO, _radius] call depotPositions_findRandomHouseForDepot;
  _building = _buildingData select 0;
  _objectData = _buildingData select 1;

  _objects = [_building, _objectData] call houseFurnisher_furnish;

  [_building, _objects];
};

depots_constructTownDepot = {
  private ["_centerOfAO", "_radius", "_buildingData", "_building", "_objectData", "_objects"];
  _centerOfAO = _this select 0;
  _radius = _this select 1;

  _buildingData = [_centerOfAO, _radius] call depotPositions_findDepotInTown;
  _building = _buildingData select 0;
  _objectData = _buildingData select 1;

  _objects = [_building, _objectData] call houseFurnisher_furnish;

  [_building, _objects];
};

depots_getAmountOfTownDepotsToSpawn = {
  call objective_hold_getAmountOfDepots;
};

depots_getRadiusOfTownAO = {
  4000;
};
