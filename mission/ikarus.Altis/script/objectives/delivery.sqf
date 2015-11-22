
// Array of arrays:
//  0: currently active depot
//  1: depot number
//  2: depot
//  3: squad id of the squad holding the depot
//  4: percentage held
//  5: number of backpacks delivered
objective_delivery_objectives = [];
//objective_delivery_increment = 0.33;
objective_delivery_increment = 0;

"deliverBackpack" addPublicVariableEventHandler {
  private ["_unit"];
  _unit = _this select 1 select 0;
  [_unit] call objective_delivery_deliverBackpack;
};

objective_delivery_construct = {
  private ["_depots", "_players"];

  // call objective_delivery_constructDepots;
  _depots = depots_delivery_depots; 
  if (count _depots > 0) then {
    _deliveryPlayers = [['delivery']] call objectiveController_getPlayersWithObjectives;
    [_depots, _deliveryPlayers] call objective_delivery_constructMarkers;

    _otherPlayers = [['delivery']] call objectiveController_getPlayersWithoutObjectives;
    [_depots, _otherPlayers] call objective_delivery_constructMarkersForOpfor;

    {      
      objective_delivery_objectives pushBack [false, _foreachindex + 1, _x, nil, 0.0, 0];
    } forEach _depots;
  };
};

objective_delivery_onObjectivesCreated = {
  // {
  //   private ["_squad"];
  //   _squad = _x;
    
  //   {
  //     [_x] call objective_delivery_constructMarkers;
  //   } forEach ([_squad] call getPlayersInSquad);
  // } forEach (["delivery"] call objectiveController_getSquadsWithObjective);
};

objective_delivery_displayName = {
  "Delivery";
};

objective_delivery_joinInProgress = {
  // private ["_unit"];
  // _unit = _this select 0;
  // [[objective_delivery_markerPositions], "markers_createSupplyBriefing", _unit, false, true] call BIS_fnc_MP;
};

objective_delivery_validate = {
  true;
};

// objective_delivery_insideDepot = {};

// objective_delivery_overridesAppearance = {
//   false;
// };

objective_delivery_defaultIfNeccessary = {};

// objective_delivery_overrideMoveToHideout = {
//   false;
// };

// objective_delivery_overrideHideoutCache = {
//   false;
// };

objective_delivery_onKilled = {};

objective_delivery_onDisconnected = {};

// objective_delivery_canOpenLootBoxes = {
//   true;
// };

objective_delivery_markerPositions = [];

objective_delivery_constructMarkers = {
  private ["_depots", "_players", "_radius", "_offset", "_positions"];
  _depots = _this select 0;
  _players = _this select 1;
  _positions = [];

  {
    private ["_building"];
    _building = _x select 0;
    _position = getPos _building;
    _positions pushBack _position;
  } forEach _depots;
  
  {
    [[_positions], "markers_createDeliveryBriefing", _x, false, true] call BIS_fnc_MP;
  } forEach _players;
};

objective_delivery_constructMarkersForOpfor = {
  private ["_depots", "_players", "_radius", "_offset", "_positions"];
  _depots = _this select 0;
  _players = _this select 1;
  _radius = 500;
  _offset = _radius / 2;
  _positions = [];
  
  {
    private ["_building"];
    _building = _x select 0;
    _position = [_building, _offset] call SHK_pos;
    _positions pushBack _position;
  } forEach _depots;

  {
    [[_positions], "markers_createDeliveryOpforBriefing", _x, false, true] call BIS_fnc_MP;
  } forEach _players;

  objective_delivery_markerPositions = _positions;
};

objective_delivery_constructDepots = {
  // {
  //   private ["_building", "_objectData"];
  //   _building = _x select 0;
  //   _objectData = _x select 1;

  //   [_building] call objective_delivery_createVehicle;
  //   [_building, _objectData] call objective_delivery_placeLootBoxes;
  //   [_building, objective_delivery_cleanUpBox, [_building]] call buildingDestroyer_init;
  //   [_building] spawn objective_delivery_destroyDepot;

  // } forEach depots_supply_depots;
};

objective_delivery_createVehicle = {
//   private ["_depot", "_vehiclePos", "_vehicleClass", "_vehicle"];
//   _depot = _this select 0;
//   _vehicleClass = call objective_delivery_getDepotCarClass;
//   _vehiclePos = getPos _depot findEmptyPosition [10,30,_vehicleClass];

//   if (count _vehiclePos > 0) then {
//     _vehicle = createVehicle [_vehicleClass, _vehiclePos, [], 0, "none"];
//     [_vehicle] call vehicle_preventGuardUse;
//   };  
};


// objective_delivery_getDepotCarClass = {
//   private ["_cars"];
//   _cars = [
//     //"C_SUV_01_F", "C_SUV_01_F", "C_SUV_01_F",
//     "C_Offroad_01_F", "C_Offroad_01_F",
//     "C_Van_01_box_F","C_Van_01_transport_F","C_Van_01_box_F","C_Van_01_transport_F","C_Van_01_box_F",
//     "UAZ_Unarmed",
//     "BAF_Offroad_D",
//     "BAF_Offroad_W"
//   ];
  
//   _cars call BIS_fnc_selectRandom;
// };

// objective_delivery_destroyDepot = {
//   sleep (3000 + random 300);
//   [_this select 0] call airStrike_createFlyOverAndBombingRun;
// };

// objective_delivery_placeLootBoxes = {
//   private ["_building", "_objectData", "_boxes"];
//   _building = _this select 0;
//   _objectData = _this select 1;
//   _boxes = [];
  
  
//   _objectData = [_objectData, 3] call depotPositions_getRandomPlaceholdersFromObjects;
  
//   for "_i" from 0 to 2 do {
//     private ["_data", "_directionAndPosition", "_direction", "_position", "_box"];
//     _data = _objectData select _i;
//     _position = getPosASL _data;
//     _direction = direction _data; 
    
//     if (_i < 2) then {
//       _boxes pushBack ([_position, _direction] call lootbox_createSupplyBox);
//     } else {
//       if (count squads > 1) then {
//         [_position, _direction] call lootbox_createAdvancedSupplyBox;
//       }
//     };
//   };

//   [(_boxes call BIS_fnc_selectRandom), ['IKRS_signal_device']] call lootBox_addExtraLoot;

// };

// objective_delivery_cleanUpBox = {
//   private ["_building"];
//   _building = _this select 0;
//   [_building, 20] call lootBox_deleteBoxesAround;
// };

objective_delivery_getActiveObjective = {
  private ["_objective"];
  _objective = [];

  {
    if (_x select 0) exitWith {
      _objective = _x;
    };
  } forEach objective_delivery_objectives;

  _objective;
};

objective_delivery_getActiveObjectiveIndex = {
  private ["_objectiveIndex"];
  _objectiveIndex = nil;

  {
    if (_x select 0) exitWith {
      _objectiveIndex = _foreachindex;
    };
  } forEach objective_delivery_objectives;

  _objectiveIndex;
};


objective_delivery_hasActiveObjective = {
  private ["_objective"];
  _objective = call objective_delivery_getActiveObjective;

  count _objective > 0;
};

objective_delivery_resolveDepotHold = {
  private ["_currentlyActiveObjective", "_players", "_playersAndDistances", "_playersAndDistancesOrdered", "_depot", "_building"];
  
  if (! call objective_delivery_hasActiveObjective) exitWith {};

  _currentlyActiveObjective = call objective_delivery_getActiveObjective;
  _depot = _currentlyActiveObjective select 2;
  _building = _depot select 0;
  _players = [['delivery']] call objectiveController_getPlayersWithObjectives;
  _playersAndDistances = [_players, { [_x, _x distance _building] }] call AEX_map;
  _playersAndDistancesOrdered = [_playersAndDistances, AEX_order_asc, { _x select 1; }] call AEX_sort;

  {
    private ["_player", "_distance"];    
    _player = _x select 0;
    _distance = _x select 1;

    if (_distance > 15) exitWith {};

    [_x, _distance, _currentlyActiveObjective] call objective_delivery_hintDeliverySiteInfo;

    if (_foreachindex > 1) exitWith {};

    [_player] call objective_delivery_markCurrentDeliverySiteHeldByPlayerSquad;
    call objective_delivery_incrementCurrentDeliverySiteHoldCounter;

    if (call objective_delivery_isCurrentObjectiveHeld) then {
      call objective_delivery_rewardLoot;
      call objective_delivery_announceDeliverySiteHeld;
      call objective_delivery_deactivateCurrentDeliverySite;
    };

    // _squadId = [([_player] call getSquadForUnit)] call getSquadId;

    // _can = [_player, "canOpenLootBoxes", [_player]] call objectiveController_callUnitObjective;

    // _isUnconscious = _player getvariable ["ACE_isUnconscious", false];

    // if (! _isUnconscious && _can && _building distance _player < 10 && ! (_squadId in _squadIds)) then {
    //   _squadIds pushBack _squadId;
    //   [_player, _objectiveData] call objective_hold_insideDepot;
    // };
  } forEach _playersAndDistancesOrdered;
  // } forEach call getAllPlayers;
};

objective_delivery_addSubmitBackpackAction = {
  private ["_player", "_building"];
  _player = _this select 0;
  _building = _this select 1;

  [[_building], "client_addSubmitBackpackAction", _player, true, false] call BIS_fnc_MP;
};

objective_delivery_hintDeliverySiteInfo = {
  private ["_player", "_distance", "_objective"];
  _player = _this select 0;
  _distance = _this select 1;
  _objective = _this select 2;

  [[format ["Distance to delivery site %1%<br/>Site %2% % held", _distance, _objective select 4], 'deliveryDistance'], "client_textMessage", _player, true, false] call BIS_fnc_MP;
};

objective_delivery_deactivateCurrentDeliverySite = {
  private ["_currentlyActiveObjective"];
  _currentlyActiveObjective = call objective_delivery_getActiveObjective;
  _currentlyActiveObjective set [0, false];
};

objective_delivery_deactiveAllObjectives = {
  private ["_currentlyActiveObjective", "_players"];
  _currentlyActiveObjective = call objective_delivery_getActiveObjective;

  if (count _currentlyActiveObjective != 0) then {
    [format ["Delivery Objective #%1 deactivated", _currentlyActiveObjective select 1]] call client_taskMessage;
  };

  {
    _x set [0, false];
  } forEach objective_delivery_objectives;
};

objective_delivery_rewardLoot = {
  private ["_currentlyActiveObjective", "_squadId", "_backpacksDelivered", "_squad"];
  _currentlyActiveObjective = call objective_delivery_getActiveObjective;
  _squadId = _currentlyActiveObjective select 3; 
  _backpacksDelivered = _currentlyActiveObjective select 5;

  _squad = [_squadId] call getSquadById;  

  if ([_squad] call getChosenObjective == "delivery") then {
    if (_backpacksDelivered >= 3) then {
      [_squad, "IKRS_delivery_delivery"] call addDisconnectedLoot;
    };
  } else {
    [_squad, "IKRS_delivery_deny"] call addDisconnectedLoot;
  };
};

objective_delivery_announceDeliverySiteHeld = {
  private ["_currentlyActiveObjective", "_players"];
  _currentlyActiveObjective = call objective_delivery_getActiveObjective;
  _players = [['delivery']] call objectiveController_getPlayersWithObjectives;

  {
    [[format ["Delivery site #%1 held!", _currentlyActiveObjective select 1], 'deliveryDistance'], "client_textMessage", _x, true, false] call BIS_fnc_MP;
  } forEach _players;
};


objective_delivery_markCurrentDeliverySiteHeldByPlayerSquad = {
  private ["_currentlyActiveObjective", "_player"];
  _player = _this select 0;
  _currentlyActiveObjective = call objective_delivery_getActiveObjective;
  _currentlyActiveObjective set [3, [[_player] call getSquadForUnit] call getSquadId];
};

objective_delivery_incrementCurrentDeliverySiteHoldCounter = {
  private ["_curObjIdx", "_curObj"];
  _curObjIdx = call objective_delivery_getActiveObjectiveIndex;
  _curObj = objective_delivery_objectives select _curObjIdx;
  _curObj set [4, (_curObj select 4) + objective_delivery_increment];
};

objective_delivery_isCurrentObjectiveHeld = {
  private ["_currentlyActiveObjective"];
  _currentlyActiveObjective = call objective_delivery_getActiveObjective;
  _currentlyActiveObjective select 4 >= 100;
};

objective_delivery_markCurrentObjectiveHeld = {
  private ["_currentlyActiveObjective"];
  _currentlyActiveObjective = call objective_delivery_getActiveObjective;
  _currentlyActiveObjective select 4 >= 100;

  private ["_currentlyActiveObjective", "_players"];
  _currentlyActiveObjective = call objective_delivery_getActiveObjective;

  if (count _currentlyActiveObjective != 0) then {
    [format ["Delivery Objective #%1 succesfully held", _currentlyActiveObjective select 1]] call client_taskMessage;
  };

  {
    _x set [0, false];
  } forEach objective_delivery_objectives;
};

objective_delivery_activateObjectiveByIndex = {
  private ["_objectiveIndex", "_objective", "_depot", "_building"];
  _objectiveIndex = _this select 0;
  _objective = objective_delivery_objectives select _objectiveIndex;
  _depot = _objective select 2;
  _building = _depot select 0;

  _objective set [0, true];

  {
    [_x, _building] call objective_delivery_addSubmitBackpackAction;
  } forEach call getAllPlayers;  

  [format ["Delivery Objective #%1 active", _objective select 1]] call client_taskMessage;
};

objective_delivery_deliverBackpack = {
private ["_currentlyActiveObjective", "_depot", "_building", "_unit", "_unitBackpack"];
  _currentlyActiveObjective = call objective_delivery_getActiveObjective;
  _depot = _currentlyActiveObjective select 2;
  _building = _depot select 0;
  _unit = _this select 0;
  _unitBackpack = unitBackpack _unit;

  if (backpack _unit != "IKRS_delivery_backpack") exitWith {
    hint "You need to have a delivery backpack equipped!"
  };

  if (_unit distance _building > 5) exitWith {
    hint "You need to be within 5 meters of delivery site to deliver backpack!"
  };

  removeBackpack _unit;
  _currentlyActiveObjective set [5, (_currentlyActiveObjective select 5) + 1];

  hint "Backpack delivered";
};

_this spawn {
  while { true } do {

    sleep 1;
    call objective_delivery_resolveDepotHold;
  }
};

_this spawn {
  sleep 15;
  [0] call objective_delivery_activateObjectiveByIndex;
  sleep 1200;
  call objective_delivery_deactiveAllObjectives;

  sleep 15;
  [1] call objective_delivery_activateObjectiveByIndex;
  sleep 120;
  call objective_delivery_deactiveAllObjectives;

  sleep 15;
  [2] call objective_delivery_activateObjectiveByIndex;
  sleep 120;
  call objective_delivery_deactiveAllObjectives;
};
