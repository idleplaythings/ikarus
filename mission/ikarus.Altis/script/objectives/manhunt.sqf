objective_manhunt_construct = {};

objective_manhunt_displayName = {
  "Manhunt"
};

objective_manhunt_joinInProgress = {
  _this call objective_manhunt_setPlayerRating;
};

objective_manhunt_setPlayerRating = {
  _this call objective_supply_setPlayerRating;
};

objective_manhunt_onObjectivesCreated = {
  if (count ([['manhunt']] call objectiveController_getSquadsWithObjectives) > 0) then {
    call objective_manhunt_createCache;
    call objective_manhunt_addBriefing;
  }
};

objective_manhunt_cachePosition = nil;

objective_manhunt_createCache = {
  private ["_depot", "_position", "_startPosition", "_building", "_finalPosition"];
  
  _depot = call depots_getRandom;
  _startPosition = nil;
  _finalPosition = nil;

  if (isNil{_depot}) then {
    _startPosition = call AO_getRandomLandPosition;
  } else {
    _startPosition = getPos (_depot select 0);
  };

  _position = [_startPosition, 2000, 4000] call popoRandom_findLand;

  _building = nearestBuilding _position;

  if (_building distance _position < 100) then {
    _finalPosition = ([_building] call BIS_fnc_buildingPositions) call BIS_fnc_selectRandom;
  } else {
    _finalPosition = _position findEmptyPosition [0,100,"C_Hatchback_01_F"];
  };

  if (isNil{_finalPosition}) then {
    _finalPosition = _position findEmptyPosition [0,1000,"C_Hatchback_01_F"];
  };

  [ATLToASL _finalPosition] call lootbox_createManhuntCache;
  objective_manhunt_cachePosition = _finalPosition;
};

objective_manhunt_addBriefing = {
  {
    [[], "markers_createManhuntBriefing", _x, false, true] call BIS_fnc_MP;
  } forEach (call getAllPlayers);
};

objective_manhunt_validate = {
  private ["_squad"];
  _squad = _this select 0;

  if (count squads < 2) exitWith {false;};

  "IKRS_signal_device" in ([_squad] call loot_findSquadLoot);
};

objective_manhunt_overridesAppearance = {
  false;
};

objective_manhunt_insideDepot = {};

objective_manhunt_onKilled = {};

objective_manhunt_onDisconnected = {};

objective_manhunt_canOpenLootBoxes = {true;};

objective_manhunt_defaultIfNeccessary = {};

objective_manhunt_overrideHideoutCache = {false;};

objective_manhunt_markSignalDevices = {
  private ["_containers", "_positions"];
  _positions = [];

  {
    if ("IKRS_signal_device" in ([_x] call objective_manhunt_checkObject)) then {
      _positions pushBack getPos _x;
    };
  } forEach allMissionObjects "";

  {
    [[_positions], "markers_updateManhuntMarkers", _x, false, true] call BIS_fnc_MP;
  } forEach ([['raid']] call objectiveController_getPlayersWithoutObjectives);

};

objective_manhunt_checkObject = {
  private ["_object", "_lootList"];
  _object = _this select 0;
  _lootList = [];

  if (isAgent teamMember _object) exitWith {
    [];
  };

  if ( _object isKindOf "car" or _object isKindOf "Helicopter" ) then {
    {
      _lootList = _lootList + ([_x] call loot_checkUnit);
    } forEach crew _object;
  };
  
  if (_object isKindOf "man") then {
    _lootList = _lootList + ([_object] call loot_checkUnit);
  } else {
    _lootList = _lootList + ([_object] call loot_checkContainer);
  };

  _lootList;
};

objective_manhunt_triangulations = [];

objective_manhunt_getTriangulationTime = {
  private ["_unit", "_squad", "_time"];
  _unit = _this select 0;
  _squad = [_unit] call getSquadForUnit;

  _time = {
    if (_x select 0 == ([_squad] call getSquadId)) exitWith {
      _x select 1;
    };
  } forEach objective_manhunt_triangulations;

  if (isNil{_time}) exitWith {
    -999;
  };

  _time;
};

objective_manhunt_setTriangulation = {
  private ["_unit", "_squad", "_set"];
  _unit = _this select 0;
  _squad = [_unit] call getSquadForUnit;
  _set = false;

  {
    if (_x select 0 == ([_squad] call getSquadId)) then {
      _set = true;
      _x set [1, time];
    };
  } forEach objective_manhunt_triangulations;

  if (! _set) then {
    objective_manhunt_triangulations pushBack [([_squad] call getSquadId), time];
  };
};

objective_manhunt_triangulate = {
  private ["_unit", "_time", "_distance", "_variance", "_result"];
  _unit = _this select 0;

  if (isNil{objective_manhunt_cachePosition}) exitWith {
    ["No active signals found.", _unit, 'triangulation'] call broadcastMessageTo; 

  };
    
  _time = [_unit] call objective_manhunt_getTriangulationTime;

  if (_time + 60 > time) exitWith {
    private ["_timeToWait"];
    _timeToWait = _time + 60 - time;
    ["You have to wait " + (str round _timeToWait) + " seconds to triangulate again", _unit, 'triangulation'] call broadcastMessageTo; 
  };

  _distance = _unit distance objective_manhunt_cachePosition;
  _variance = random (_distance * 0.10) - _distance * 0.05;
  _result = _distance + _variance;

  ["Signal distance is ~" + (str round _result) + "m.", _unit, 'triangulation'] call broadcastMessageTo;
  [_unit] call objective_manhunt_setTriangulation;

  {
    [[_result], "markers_updateTriangulationMarkers", _x, true, false] call BIS_fnc_MP;
  } forEach ([[_unit] call getSquadForUnit] call getPlayersInSquad);
};

"triangulation" addPublicVariableEventHandler {
  private ["_unit"];
  _unit = _this select 1 select 0;

  [_unit] call objective_manhunt_triangulate;
};

_this spawn {
  
  waitUntil {call missionControl_getElapsedTime > (60 * 2)};

  if (count ([['manhunt']] call objectiveController_getSquadsWithObjectives) == 0) exitWith {};

  while { true } do {
    sleep 15;
    call objective_manhunt_markSignalDevices;
  }
};