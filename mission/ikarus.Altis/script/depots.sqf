depots_supply_depots = [];
depots_town_depots = [];

depots_create_depots = {
  private ["_centerOfAO"];
  _centerOfAO = _this select 0;

  [_centerOfAO] call depots_create_supply;
  [_centerOfAO] call depots_create_town;
};

depots_getTotalAmount = {
  call depots_getAmountOfNormalDepotsToSpawn + call depots_getAmountOfTownDepotsToSpawn;
};

depots_getAll = {
  depots_town_depots + depots_supply_depots;
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

depots_getAmountOfNormalDepotsToSpawn = {
  call objective_supply_getAmountOfDepots;
};

depots_getRadiusOfSupplyAO = {
  (call depots_getAmountOfNormalDepotsToSpawn) * 0.5 * 1000;
};

depots_constructSupplyDepot = {
  private ["_centerOfAO", "_radius", "_buildingData", "_building", "_objectData"];
  _centerOfAO = _this select 0;
  _radius = _this select 1;

  _buildingData = [_centerOfAO, _radius] call depotPositions_findRandomHouseForDepot;
  _building = _buildingData select 0;
  _objectData = _buildingData select 1;

  [_building, _objectData] call houseFurnisher_furnish;

  [_building, _objectData];
};

depots_constructTownDepot = {
  private ["_centerOfAO", "_radius", "_buildingData", "_building", "_objectData"];
  _centerOfAO = _this select 0;
  _radius = _this select 1;

  _buildingData = [_centerOfAO, _radius] call depotPositions_findDepotInTown;
  _building = _buildingData select 0;
  _objectData = _buildingData select 1;

  [_building, _objectData] call houseFurnisher_furnish;

  [_building, _objectData];
};

depots_getAmountOfTownDepotsToSpawn = {
  call objective_hold_getAmountOfDepots;
};

depots_getRadiusOfTownAO = {
  4000;
};
