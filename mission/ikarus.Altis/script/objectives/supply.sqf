
objective_supply_construct = {
  private ["_depots", "_players"];

  call objective_supply_constructDepots;
  _depots = depots_supply_depots; 
  _players = [['guard']] call objectiveController_getPlayersWithoutObjectives;
  if (count _depots > 0) then {
    [_depots, _players] call objective_supply_constructMarkers;
  };
};


objective_supply_onObjectivesCreated = {};

objective_supply_displayName = {
  "Supply run";
};

objective_supply_joinInProgress = {
  private ["_unit"];
  _unit = _this select 0;
  [_unit] call objective_supply_setPlayerRating;
};

objective_supply_setPlayerRating = {
  private ["_unit"];
  _unit = _this select 0;
  _unit addRating -20000;
};

objective_supply_validate = {
  true;
};

objective_supply_insideDepot = {};

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

objective_supply_constructMarkers = {
  private ["_depots", "_players", "_radius", "_offset"];
  _depots = _this select 0;
  _players = _this select 1;
  _radius = 500;
  _offset = _radius / 2;
  
  {
    private ["_building"];
    _building = _x select 0;
    _position = [_building, _offset] call SHK_pos;
    {
      [[_position, _radius], "markers_createSupplyMarker", _x, false, true] call BIS_fnc_MP;
    } forEach _players;  
  } forEach _depots;
  
  
  {
    [[], "markers_createSupplyBriefring", _x, false, true] call BIS_fnc_MP;
  } forEach _players;
};

objective_supply_constructDepots = {
  {
    private ["_building", "_objectData"];
    _building = _x select 0;
    _objectData = _x select 1;

    [_building] call objective_supply_createVehicle;
    [_building, _objectData] call objective_supply_placeLootBoxes;
    [_building, objective_supply_cleanUpBox, [_building]] call buildingDestroyer_init;
    [_building] spawn objective_supply_destroyDepot;

  } forEach depots_supply_depots;
};

objective_supply_createVehicle = {
  private ["_depot", "_vehiclePos", "_vehicleClass", "_vehicle"];
  _depot = _this select 0;
  _vehicleClass = call objective_supply_getDepotCarClass;
  _vehiclePos = getPos _depot findEmptyPosition [10,30,_vehicleClass];

  if (count _vehiclePos > 0) then {
    _vehicle = createVehicle [_vehicleClass, _vehiclePos, [], 0, "none"];
    _vehicle setVariable ['noGuards', true];

    [_vehicle] call vehicle_preventGuardUse;
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
    _directionAndPosition = [_building, _x] call houseFurnisher_getPosASLAndDirectionFromBuilding;
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
  
  if (count _objectives == 1) exitWith {
    1;
  };

  _amount;
  10;
};