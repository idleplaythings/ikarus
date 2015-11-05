depots_supply_depots = [];
depots_town_depots = [];
depots_military_depots = [];

depots_holdPriority = if (random 1 > 0.5) then {true;} else {false;};

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

depots_isDepot = {
  private ["_building"];
  _building = _this select 0;
  [_building] call depots_getDistanceToClosestDepot < 2;
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

depots_getWeighedInitilaAmountOfNormalDepots = {
  private ["_supplies", "_normal", "_weighed"];
  _supplies = (["supply"] call objectiveController_getSquadsWithObjective);
  _normal = floor ((count _supplies) / 2);
  _weighed = 0;

  {
    private ["_squad"];
    _squad = _x;
    _weighed = _weighed + (count ([_squad] call getPlayersInSquad) * 0.17);
  } forEach _supplies;

  _weighed = floor _weighed;

  if (_weighed < _normal) exitWith {
    _weighed;
  };

  _normal;
};

depots_getAmountOfDepotsToSpawn = {
  private ["_normal", "_town", "_holds", "_supplies"];

  if (count (["military"] call objectiveController_getSquadsWithObjective) > 0) exitWith {
    [0,0,1];
  };

  _holds = count ([["hold"]] call objectiveController_getSquadsWithObjectives);
  _town = floor (_holds / 2);

  //two hold objectives are enough to spawn one depot
  /*
  if (_holds >= 2 && _town == 0) then {
    _town = 1;
  };
  */

  _supplies = count (["supply"] call objectiveController_getSquadsWithObjective);
  _normal = call depots_getWeighedInitilaAmountOfNormalDepots;
  
  if (depots_holdPriority) then {
    //if no depots, but one hold objective, spawn one town depot
    if (_town == 0 && _normal == 0 && _holds >= 1) then {
      _town = 1;
    };

    //if no depots, but one supply objective, spawn one supply depot
    if (_town == 0 && _normal == 0 && _supplies >= 1) then {
      _normal = 1;
    };
  } else {
    //if no depots, but one supply objective, spawn one supply depot
    if (_town == 0 && _normal == 0 && _supplies >= 1) then {
      _normal = 1;
    };

    //if no depots, but one hold objective, spawn one town depot
    if (_town == 0 && _normal == 0 && _holds >= 1) then {
      _town = 1;
    };
  };
    

  

  //if thre are no depots at all, but atleast one assasination, spawn one normal depot.
  if (_town == 0 && _normal == 0 && count (["assasination"] call objectiveController_getSquadsWithObjective) >= 1) then {
    _normal = 1;
  };

  // If there are for example 3 holds and 1 supply (which would spawn only one town depot), spawn one more normal depot.
  if (floor ((_holds + _supplies) / 2) > (_town + _normal)) then {
    _normal = _normal + 1;
  };

  //if there are 4 or more squads, change one normal depot to town
  /*
  if (_town == 0 && _normal > 1 && _holds >= 1 && count squads >= 4) then {
    _town = 1;
    _normal = _normal - 1;
  };
  */

  //manhunt will substract one depot. supply first, normal second.
  if (count (["manhunt"] call objectiveController_getSquadsWithObjective) >= 1) then {
    if (_normal > 0) then {
      _normal = _normal - 1;
    } else {
      if (_town > 0) then {
        _town = _town - 1;
      };
    };
  };

  [_normal, _town, 0];
};

depots_getAmountOfPossibleGuards = {
  private ["_amount"];

  if (call depots_getAmountOfMilitaryDepotsToSpawn > 0) exitWith {0};

  _amount = call depots_getAmountOfTownDepotsToSpawn + call depots_getAmountOfNormalDepotsToSpawn;

  if (count (["manhunt"] call objectiveController_getSquadsWithObjective) > 0) then {
    _amount = _amount + 2;
  };

  _amount;
};

depots_getAmountOfMilitaryDepotsToSpawn = {
  call depots_getAmountOfDepotsToSpawn select 2;
};

depots_getAmountOfTownDepotsToSpawn = {
  call depots_getAmountOfDepotsToSpawn select 1;
};


depots_getAmountOfNormalDepotsToSpawn = {
  call depots_getAmountOfDepotsToSpawn select 0;
  2;
};

depots_getRadiusOfSupplyAO = {
  (call depots_getAmountOfNormalDepotsToSpawn) * 1.0 * 1000;
};

depots_constructMilitaryDepot = {
  private ["_centerOfAO", "_radius", "_position", "_data", "_objectData"];

  _centerOfAO = _this select 0;
  _radius = _this select 1;
  _position = [_centerOfAO, 0, _radius] call popoRandom_findLand;
  _position = [_position] call emptyPositionFinder_findMilitaryBasePosition;

  _data = [] call depotPositions_getPremiumDepotObjects;
  _objectData = [_position, random 360, _data] call houseFurnisher_furnish_location;

  [_position, _objectData];
};

depots_constructSupplyDepot = {
  private ["_position", "_centerOfAO", "_radius", "_buildingData", "_building", "_objectData", "_objects"];
  _centerOfAO = _this select 0;
  _radius = _this select 1;
  _position = [] call depots_getRandom;

  if (isNil{_position}) then {
    _position = _centerOfAO;
  } else {
    _position = getPos (_position select 0);
  };

  _building = [_position, _radius, _radius * 2] call depotPositions_findRandomHouse;
  
  [_building, []];
};

depots_constructTownDepot = {
  private ["_centerOfAO", "_radius", "_buildingData", "_building", "_objectData", "_objects"];
  _centerOfAO = _this select 0;
  _radius = _this select 1;

  _buildingData = [_centerOfAO, _radius, _radius * 2] call depotPositions_findDepotInTown;
  _building = _buildingData select 0;
  _objectData = _buildingData select 1;

  _objects = [_building, _objectData] call houseFurnisher_furnish;

  [_building, _objects];
};

depots_getRadiusOfTownAO = {
  4000;
};
