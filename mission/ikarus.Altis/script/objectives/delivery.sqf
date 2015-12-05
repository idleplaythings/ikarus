
// Array of arrays:
//  0: currently active depot
//  1: depot number
//  2: depot
//  3: squad id of the squad holding the depot
//  4: percentage held
//  5: number of backpacks delivered
objective_delivery_sites = [];
objective_delivery_lastSiteIndex = -1;
objective_delivery_siteDectivationScript = nil;
objective_delivery_firstSiteActivationDelay = 20;
objective_delivery_nextSiteActivationDelay = 30;
objective_delivery_currentSiteDeactivationDelay = 30;

// objective_delivery_increment = 0.33;
objective_delivery_increment = 20;
objective_delivery_maxDeliveryDistance = 5;

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

    _otherPlayers = [['delivery', 'raid']] call objectiveController_getPlayersWithoutObjectives;
    [_depots, _otherPlayers] call objective_delivery_constructMarkersForOpfor;

    {      
      objective_delivery_sites pushBack [false, _foreachindex + 1, _x, nil, 0.0, 0];
    } forEach _depots;
  };
};

objective_delivery_onObjectivesCreated = {
  call objective_delivery_activateNextSiteAfterDelay;
};

objective_delivery_activateNextSiteAfterDelay = {
  private ["_delay"];

  _this spawn {
    sleep objective_delivery_nextSiteActivationDelay;
    [objective_delivery_lastSiteIndex + 1] call objective_delivery_activateSiteByIndex;
  };
};

objective_delivery_deactivateSiteAfter = {
  private ["_delay", "_activeSite", "_players"];

  objective_delivery_siteDectivationScript = _this spawn {
    sleep objective_delivery_currentSiteDeactivationDelay;
    _activeSite = call objective_delivery_getActiveSite;
    _players = [['raid']] call objectiveController_getPlayersWithoutObjectives;
    {
      [[format ["Delivery site #%1 no longer active.", _activeSite select 1], 'deliverySiteInfo'], "client_textMessage", _x, true, false] call BIS_fnc_MP;
    } forEach _players;
    call objective_delivery_deactivateCurrentAndStartNextDeliverySiteActivationDelay;
  };
};

objective_delivery_displayName = {
  "Delivery";
};

objective_delivery_joinInProgress = {

};

objective_delivery_validate = {
  private ["_squad", "_backpackCount"];
  _squad = _this select 0;
  _backpackCount = 0;

  {
    if (_x == "IKRS_merchandise_backpack") then {
      _backpackCount = _backpackCount + 1;
    }
  } forEach ([_squad] call loot_findSquadLoot);

  _backpackCount >= 9;
};

objective_delivery_defaultIfNeccessary = {};

objective_delivery_onKilled = {};

objective_delivery_onDisconnected = {};

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

};

objective_delivery_createVehicle = {

};

objective_delivery_getActiveSite = {
  private ["_objective"];
  _objective = [];

  {
    if (_x select 0) exitWith {
      _objective = _x;
    };
  } forEach objective_delivery_sites;

  _objective;
};

objective_delivery_hasActiveSite = {
  private ["_objective"];
  _objective = call objective_delivery_getActiveSite;

  count _objective > 0;
};

objective_delivery_resolveDepotHold = {
  private ["_activeSite", "_players", "_playersAndDistances", "_playersAndDistancesOrdered", "_depot", "_building"];
  
  if (! call objective_delivery_hasActiveSite) exitWith {};

  _activeSite = call objective_delivery_getActiveSite;
  _depot = _activeSite select 2;
  _building = _depot select 0;
  _players = [['raid']] call objectiveController_getPlayersWithoutObjectives;
  _playersAndDistances = [_players, { [_x, _x distance _building] }] call AEX_map;
  _playersAndDistancesOrdered = [_playersAndDistances, AEX_order_asc, { _x select 1; }] call AEX_sort;

  {
    private ["_player", "_distance"];    
    _player = _x select 0;
    _distance = _x select 1;

    if (_distance > 15) exitWith {};

    [_x, _distance, _activeSite] call objective_delivery_hintDeliverySiteInfo;

    if (_foreachindex > 1) exitWith {};

    [_player] call objective_delivery_markCurrentDeliverySiteHeldByPlayerSquad;
    call objective_delivery_incrementCurrentDeliverySiteHoldCounter;

    if (call objective_delivery_isCurrentSiteHeld) then {
      call objective_delivery_rewardLoot;
      call objective_delivery_announceDeliverySiteHeld;
      call objective_delivery_deactivateCurrentAndStartNextDeliverySiteActivationDelay;
    };
  } forEach _playersAndDistancesOrdered;
};

objective_delivery_addSubmitBackpackAction = {
  private ["_player", "_building"];
  _player = _this select 0;
  _building = _this select 1;

  [[_building], "client_addSubmitBackpackAction", _player, true, false] call BIS_fnc_MP;
};

objective_delivery_removeAllActions = {
  private ["_player", "_building"];
  _player = _this select 0;
  _building = _this select 1;

  [[_building], "client_removeAllActions", _player, true, false] call BIS_fnc_MP;
};

objective_delivery_hintDeliverySiteInfo = {
  private ["_player", "_distance", "_objective", "_percentageSign"];
  _player = _this select 0;
  _distance = _this select 1;
  _objective = _this select 2;
  _percentageSign = "%";

  [[format ["Distance to delivery site %1% meters<br/>Site %2%%3% held", [_distance] call CBA_fnc_formatNumber, _objective select 4, _percentageSign], 'deliverySiteInfo'], "client_textMessage", _player, true, false] call BIS_fnc_MP;
};

objective_delivery_rewardLoot = {
  private ["_activeSite", "_squadId", "_backpacksDelivered", "_squad"];
  _activeSite = call objective_delivery_getActiveSite;
  _squadId = _activeSite select 3; 
  _backpacksDelivered = _activeSite select 5;

  _squad = [_squadId] call getSquadById;  

  if (([_squad] call getChosenObjective) == "delivery") then {
    if (_backpacksDelivered >= 3) then {
      [_squad, ["IKRS_delivery_delivery_success"]] call addDisconnectedLoot;
    } else {
      [_squad, ["IKRS_delivery_delivery_failure"]] call addDisconnectedLoot;
    };
  } else {
    [_squad, ["IKRS_delivery_deny"]] call addDisconnectedLoot;
  };
};

objective_delivery_announceDeliverySiteHeld = {
  private ["_activeSite", "_players"];
  _activeSite = call objective_delivery_getActiveSite;
  _players = [['raid']] call objectiveController_getPlayersWithoutObjectives;

  {
    [[format ["Delivery site #%1 held!", _activeSite select 1], 'deliverySiteInfo'], "client_textMessage", _x, true, false] call BIS_fnc_MP;
  } forEach _players;
};

objective_delivery_markCurrentDeliverySiteHeldByPlayerSquad = {
  private ["_activeSite", "_player"];
  _player = _this select 0;
  _activeSite = call objective_delivery_getActiveSite;
  _activeSite set [3, [[_player] call getSquadForUnit] call getSquadId];
};

objective_delivery_incrementCurrentDeliverySiteHoldCounter = {
  private ["_activeSite"];
  _activeSite = call objective_delivery_getActiveSite;
  _activeSite set [4, (_activeSite select 4) + objective_delivery_increment]
};

objective_delivery_isCurrentSiteHeld = {
  private ["_activeSite"];
  _activeSite = call objective_delivery_getActiveSite;
  _activeSite select 4 >= 100;
};

objective_delivery_activateSiteByIndex = {
  private ["_siteIndex", "_site", "_depot", "_building"];
  _siteIndex = _this select 0;

  if (_siteIndex + 1 > count objective_delivery_sites) exitWith {};

  _site = objective_delivery_sites select _siteIndex;
  _depot = _site select 2;
  _building = _depot select 0;

  _site set [0, true];

  _players = [['raid']] call objectiveController_getPlayersWithoutObjectives;
  {
    [_x, _building] call objective_delivery_addSubmitBackpackAction;
    [[format ["Delivery site #%1 active", _site select 1], 'deliverySiteInfo'], "client_textMessage", _x, true, false] call BIS_fnc_MP;
  } forEach _players;

  [15] call objective_delivery_deactivateSiteAfter;
};

objective_delivery_deactivateCurrentAndStartNextDeliverySiteActivationDelay = {
  private ["_activeSite", "_depot", "_building", "_players"];
  _activeSite = call objective_delivery_getActiveSite;
  _depot = _activeSite select 2;
  _building = _depot select 0;

  terminate objective_delivery_siteDectivationScript;

  if (count _activeSite > 0) then {
    _activeSite set [0, false];
  };

  objective_delivery_lastSiteIndex = objective_delivery_lastSiteIndex + 1;

  if (count objective_delivery_sites >= objective_delivery_lastSiteIndex) then {
    call objective_delivery_activateNextSiteAfterDelay;
  }
};

objective_delivery_deliverBackpack = {
  private ["_unit", "_activeSite", "_depot", "_building"];
  _unit = _this select 0;
  _activeSite = call objective_delivery_getActiveSite;

  if (count _activeSite == 0) exitWith {};

  _depot = _activeSite select 2;
  _building = _depot select 0;

  if (backpack _unit != "IKRS_merchandise_backpack") exitWith {
    [[format ["You need to have a merchandise backpack equipped!"], 'deliveryNoBackpack'], "client_textMessage", _unit, true, false] call BIS_fnc_MP;
  };

  if (_unit distance _building > objective_delivery_maxDeliveryDistance) exitWith {
    [[format ["You need to be within %1 meters of delivery site to deliver a backpack!", objective_delivery_maxDeliveryDistance], 'deliveryBackpackTooFar'], "client_textMessage", _unit, true, false] call BIS_fnc_MP;
  };

  removeBackpack _unit;
  _activeSite set [5, (_activeSite select 5) + 1];

  [[format ["Backpack delivered"], 'deliveryBackpackDelivered'], "client_textMessage", _unit, true, false] call BIS_fnc_MP;
};

_this spawn {
  while { true } do {

    sleep 1;
    call objective_delivery_resolveDepotHold;
  }
};
