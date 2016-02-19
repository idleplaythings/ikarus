
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
objective_delivery_firstSiteActivationDelay = 15 * 60;
objective_delivery_siteActivationDelay = 5 * 60;
objective_delivery_siteActiveDuration = 15 * 60;

objective_delivery_increment = 0.33;

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
  _this spawn {
    sleep objective_delivery_firstSiteActivationDelay;
    call objective_delivery_activateNextSite;
  };
};

objective_delivery_displayName = {
  "Delivery";
};

objective_delivery_joinInProgress = {
  private ["_unit", "_objective"];
  _unit = _this select 0;
  _objective = [_unit] call objectiveController_getUnitsObjective;

  if (_objective == "raid") exitWith {};

  //TODO: When unit joins, he must get the delivery briefing, and current up to date markers.
  //Suggest refactoring marker/briefing code so, that you can call it at any time for any unit
  //(calling it multiple times should not cause problems) and it will evaluate units objective
  //and current state of depots so that said unit gets the markers in correct state
};


objective_delivery_validate = {
  private ["_squad", "_backpackCount"];
  _squad = _this select 0;
  _backpackCount = 0;

  if (count squads < 2) exitWith { false; };

  if (count ([_squad] call getPlayersInSquad) < 1) exitWith { false; };

  {
    if (_x == "IKRS_merchandise_backpack") then {
      _backpackCount = _backpackCount + 1;
    }
  } forEach ([_squad] call loot_findSquadLoot);

  _backpackCount >= 9;
};

objective_delivery_defaultIfNeccessary = {
  if (call depots_getAmountOfDeliveryDepotsToSpawn > 0) exitWith {};
  call objective_delivery_defaultAll;
};

objective_delivery_defaultAll = {
  private ["_squads"];
  _squads = ["delivery"] call objectiveController_getSquadsWithObjective;

  {
    [_x, 'supply'] call setChosenObjective;
  } forEach _squads;
};

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

// Delivery site activation logic

objective_delivery_activateNextSiteAfterDelay = {
  private ["_delay"];

  _this spawn {
    sleep objective_delivery_siteActivationDelay;
    call objective_delivery_activateNextSite;
  };
};

objective_delivery_activateNextSite = {
  if (count objective_delivery_sites >= objective_delivery_lastSiteIndex) then {
    [objective_delivery_lastSiteIndex + 1] call objective_delivery_activateSiteByIndex;
  };
};

objective_delivery_activateSiteByIndex = {
  private ["_siteIndex", "_site", "_depot", "_building"];
  _siteIndex = _this select 0;

  if (_siteIndex + 1 > count objective_delivery_sites) exitWith {};

  _site = objective_delivery_sites select _siteIndex;
  _depot = _site select 2;
  _building = _depot select 0;

  _site set [0, true];

  _players = [['delivery']] call objectiveController_getPlayersWithObjectives;
  {
    [_x, _building] call objective_delivery_addSubmitBackpackAction;
  } forEach _players;

  _players = [['raid', 'delivery']] call objectiveController_getPlayersWithoutObjectives;
  {
    [_x, _building, _siteIndex] call objective_delivery_revealExactSiteLocation;
  } forEach _players;

  [getPos _building, 0, _building] call satelliteUplink_create;

  call objective_delivery_announceDeliverySiteActivated;
  call objective_delivery_deactivateSiteAfter;
};

objective_delivery_revealExactSiteLocation = {
  private ["_player", "_building", "_siteIndex", "_position"];
  _unit = _this select 0;
  _building = _this select 1;
  _siteIndex = _this select 2;
  _position = getPos _building;

  [[_position, _siteIndex + 1], "markers_createDeliveryTargetMarker", _unit, false, true] call BIS_fnc_MP;
  [[_siteIndex], "markers_removeDeliveryAreaMarker", _unit, false, true] call BIS_fnc_MP;
};

objective_delivery_deactivateSiteAfter = {
  objective_delivery_siteDectivationScript = _this spawn {
    sleep objective_delivery_siteActiveDuration;
    call objective_delivery_announceDeliverySiteDeactivated;
    call objective_delivery_deactivateCurrentSite;
    call objective_delivery_activateNextSite;
  };
};

objective_delivery_deactivateCurrentSite = {
  private ["_activeSite", "_depot", "_building", "_players"];
  _activeSite = call objective_delivery_getActiveSite;
  _depot = _activeSite select 2;
  _building = _depot select 0;

  terminate objective_delivery_siteDectivationScript;

  if (count _activeSite > 0) then {
    _activeSite set [0, false];
  };

  objective_delivery_lastSiteIndex = objective_delivery_lastSiteIndex + 1;

  [_building] call satelliteUplink_destroy;
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

objective_delivery_isSiteActive = {
  private ["_objective"];
  _objective = call objective_delivery_getActiveSite;

  count _objective > 0;
};

objective_delivery_resolveDepotHold = {
  private ["_activeSite", "_players", "_playersAndDistances", "_playersAndDistancesOrdered", "_depot", "_building"];

  if (! call objective_delivery_isSiteActive) exitWith {};

  _activeSite = call objective_delivery_getActiveSite;
  _depot = _activeSite select 2;
  _building = _depot select 0;
  _players = [['raid']] call objectiveController_getPlayersWithoutObjectives;
  _playersAndDistances = [_players, { [_x, _x distance _building] }] call AEX_map;
  _playersAndDistancesOrdered = [_playersAndDistances, AEX_order_asc, { _x select 1; }] call AEX_sort;

  //Filter players from list that are not inside the building.
  _playersAndDistancesOrdered =  [_playersAndDistancesOrdered, {
    _player = _x select 0;
    [_player, _building] call depots_isUnitInsideBuilding && [_player] call objectiveController_getUnitsObjective != 'guard';
  }] call AEX_filter;

  {
    private ["_player", "_distance"];
    _player = _x select 0;
    _distance = _x select 1;

    if (_distance < 15) then {

      if (_foreachindex == 0) then {
        call objective_delivery_incrementCurrentDeliverySiteHoldCounter;
      };

      if (call objective_delivery_isCurrentSiteHeld) then {
        [_player] call objective_delivery_clearDeliverySiteInfo;
      } else {
        [_player, _distance, _activeSite] call objective_delivery_hintDeliverySiteInfo;
      };

      if (_foreachindex == 0) then {
        [_player] call objective_delivery_markCurrentDeliverySiteHeldByPlayer;

        if (call objective_delivery_isCurrentSiteHeld) then {
          call objective_delivery_rewardLoot;
          call objective_delivery_announceDeliverySiteHeld;
          call objective_delivery_deactivateCurrentSite;
          call objective_delivery_activateNextSiteAfterDelay;
        };
      };
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

// Announcements

objective_delivery_announceDeliverySiteActivated = {
  private ["_activeSite"];
  _activeSite = call objective_delivery_getActiveSite;

  [format ["Delivery site #%1 is now active!", _activeSite select 1]] call objective_delivery_announce;
};

objective_delivery_announceDeliverySiteDeactivated = {
  private ["_activeSite"];
  _activeSite = call objective_delivery_getActiveSite;

  [format ["Delivery site #%1 is no longer active!", _activeSite select 1]] call objective_delivery_announce;
};

objective_delivery_announceDeliverySiteHeld = {
  private ["_activeSite"];
  _activeSite = call objective_delivery_getActiveSite;

  [format ["Delivery site #%1 held!", _activeSite select 1]] call objective_delivery_announce;
};

objective_delivery_announce = {
  private ["_announcement", "_players"];
  _announcement = _this select 0;
  _players = [['raid']] call objectiveController_getPlayersWithoutObjectives;

  {
    [[_announcement, 'deliveryAnnouncement'], "client_textMessage", _x, false, false] call BIS_fnc_MP;
  } forEach _players;
};

// Hints

objective_delivery_hintDeliverySiteInfo = {
  private ["_player", "_distance", "_objective", "_percentageSign"];
  _player = _this select 0;
  _distance = _this select 1;
  _objective = _this select 2;
  _percentageSign = "%";

  [[format ["Distance to delivery site %1% meters<br/>Site %2%%3% held", [_distance] call CBA_fnc_formatNumber, _objective select 4, _percentageSign], 'deliverySiteInfo'], "client_textMessage", _player, false, false] call BIS_fnc_MP;
};

objective_delivery_clearDeliverySiteInfo = {
  private ["_player"];
  _player = _this select 0;

  [[format [""], 'deliverySiteInfo'], "client_textMessage", _player, true, false] call BIS_fnc_MP;
};

objective_delivery_markCurrentDeliverySiteHeldByPlayer = {
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

objective_delivery_deliverBackpack = {
  private ["_unit", "_activeSite", "_depot", "_building"];
  _unit = _this select 0;
  _activeSite = call objective_delivery_getActiveSite;

  if (count _activeSite == 0) exitWith {};

  _depot = _activeSite select 2;
  _building = _depot select 0;

  if ((_activeSite select 5) > 2) exitWith {
    [[format ["This delivery is already fulfilled!"], 'deliveryBackpackMessage'], "client_textMessage", _unit, true, false] call BIS_fnc_MP;
  };

  if (!([_unit, "IKRS_merchandise_backpack"] call equipment_unitHasItem)) exitWith {
    [[format ["You need to have a merchandise with you!"], 'deliveryBackpackMessage'], "client_textMessage", _unit, true, false] call BIS_fnc_MP;
  };

  if (! ([_unit, _building] call depots_isUnitInsideBuilding)) exitWith {
    [[format ["You need to be inside the delivery site building to deliver the merchandise!"], 'deliveryBackpackMessage'], "client_textMessage", _unit, true, false] call BIS_fnc_MP;
  };

  [_unit, "IKRS_merchandise_backpack"] call equipment_removeItemFromUnit;
  _activeSite set [5, (_activeSite select 5) + 1];

  [[format ["Merchandise delivered"], 'deliveryBackpackMessage'], "client_textMessage", _unit, true, false] call BIS_fnc_MP;
};

_this spawn {
  while { true } do {

    sleep 1;
    call objective_delivery_resolveDepotHold;
  }
};
