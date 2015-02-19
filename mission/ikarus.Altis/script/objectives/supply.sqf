objective_supply_depots = [];

objective_supply_construct = {
  private ["_centerOfAO", "_depots", "_players"];
  _centerOfAO = _this select 0;

  _depots = [ _centerOfAO] call objective_supply_constructDepots;
  _players = call objective_supply_getPlayers;
  objective_supply_depots = _depots;
  [_depots, _players] call objective_supply_constructMarkers;
};

objective_supply_overridesAppearance = {
  false;
};

objective_supply_defaultIfNeccessary = {};

objective_supply_overrideMoveToHideout = {
  false;
};

objective_supply_overrideHideoutCache = {
  false;
};

objective_supply_onKilled = {};

objective_supply_onDisconnected = {};

objective_supply_canOpenLootBoxes = {
  true;
};

objective_supply_getPlayers = {
  private ["_players"];
  _players = [];
  
  {
    _players = _players + ([_x] call getPlayersInSquad);
  } forEach (["supply"] call objectiveController_getSquadsWithObjective);

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
  
  
  {
    [[], "markers_createSupplyBriefring", _x, false, true] call BIS_fnc_MP;
  } forEach _players;
};

objective_supply_constructDepots = {
  private ["_centerOfAO", "_numberOfDepots", "_depots", "_radius", "_depot"];
  _centerOfAO = _this select 0;
  _numberOfDepots = call objective_supply_getAmountOfDepots;
  _radius = call objective_supply_getRadiusOfAO;
  _depots = [];
  
  while {_numberOfDepots > 0} do {
    _depot = [_centerOfAO, _radius] call objective_supply_constructDepot;
    
    [_depot] call objective_supply_createVehicle;
  
    _depots pushBack _depot;
    _numberOfDepots = _numberOfDepots - 1;
  };
  
  _depots;
};

objective_supply_createVehicle = {
  private ["_depot", "_vehiclePos", "_vehicleClass", "_vehicle"];
  _depot = _this select 0;
  _vehicleClass = call objective_supply_getDepotCarClass;
  _vehiclePos = getPos _depot findEmptyPosition [10,30,_vehicleClass];

  if (count _vehiclePos > 0) then {
    _vehicle = createVehicle [_vehicleClass, _vehiclePos, [], 0, "none"];
    _vehicle setVariable ['noGuards', true];

    _vehicle addEventHandler ["GetIn",  
    { 
        private ["_veh", "_unit", "_noGuardAllowed", "_objective"]; 
        _veh = _this select 0; 
        _unit = _this select 2;
        _noGuardAllowed = _veh getVariable ['noGuards', false];
        _objective = [_unit] call objectiveController_getUnitsObjective;  

        if (_objective == "guard" && _noGuardAllowed) then 
        { 
          _unit action ["Eject", vehicle _unit]; 
        }; 
    }]; 
  };  
};


objective_supply_getDepotCarClass = {
  private ["_cars"];
  _cars = [
    "C_Quadbike_01_F","C_Quadbike_01_F","C_Quadbike_01_F","C_Quadbike_01_F","C_Quadbike_01_F","C_Quadbike_01_F",
    "C_Offroad_01_F", "C_Offroad_01_F", "C_Offroad_01_F",
    "C_Van_01_transport_F","C_Van_01_box_F","C_Van_01_transport_F","C_Van_01_box_F","C_Van_01_transport_F","C_Van_01_box_F",
    "UAZ_Unarmed",
    "BAF_Offroad_D",
    "BAF_Offroad_W"
  ];
  
  _cars call BIS_fnc_selectRandom;
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
  
  [_building, objective_supply_cleanUpBox, [_building]] call buildingDestroyer_init;
  [_building] spawn objective_supply_destroyDepot;
  
  _building;
};

objective_supply_destroyDepot = {
  sleep (3000 + random 300);
  [_this select 0] call airStrike_createFlyOverAndBombingRun;
};

objective_supply_placeLootBoxes = {
  private ["_building", "_objectData", "_amount"];
  _building = _this select 0;
  _objectData = _this select 1;
  
  _amount = 2;
  _objectData = [_objectData, _amount] call depotPositions_getRandomPlaceholdersFromObjects;
  
  {
    private ["_directionAndPosition", "_direction", "_position", "_box"];
    _directionAndPosition = [_building, _x] call houseFurnisher_getPosASLAndDirection;
    _position = _directionAndPosition select 0;
    _direction = _directionAndPosition select 1; 
    
    [_position, _direction] call lootbox_create;
    
  } forEach _objectData;
};

objective_supply_cleanUpBox = {
  private ["_building"];
  _building = _this select 0;
  [_building, 20] call lootBox_deleteBoxesAround;
};

objective_supply_getAmountOfDepots = {
  private ["_objectives", "_amount"];
  _objectives = ["supply"] call objectiveController_getSquadsWithObjective;
  
  _amount = floor ((count _objectives) / 2);
  
  if (_amount == 0) exitWith {
    1;
  };

  _amount;
};

objective_supply_getRadiusOfAO = {
  private ["_amount"];
  (call objective_supply_getAmountOfDepots) * 0.5 * 1000;
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