objective_hold_objectData = [];


objective_hold_construct = {
  private ["_centerOfAO", "_depots", "_players"];
  _centerOfAO = _this select 0;

  call objective_hold_constructDepots;
  _depots = depots_town_depots;
  _players = [['guard']] call objectiveController_getPlayersWithoutObjectives;

  if (count _depots > 0) then {
    [_depots, _players] call objective_hold_constructMarkers;
  };
};

objective_hold_onObjectivesCreated = {};

objective_hold_displayName = {
  "Hold";
};

objective_hold_validate = {
  private ["_squad"];
  _squad = _this select 0;
  count ([_squad] call getPlayersInSquad) > 2;
};

objective_hold_overridesAppearance = {
  false;
};

objective_hold_defaultIfNeccessary = {
  private ["_squads", "_supplyDepots"];
  _squads = ["hold"] call objectiveController_getSquadsWithObjective;
  _depots = call depots_getAmountOfTownDepotsToSpawn;
  
  if (_depots == 0) then {
    {
      [_x, 'supply'] call setChosenObjective;
    } forEach _squads;
  };
};

objective_hold_overrideMoveToHideout = {
  false;
};

objective_hold_overrideHideoutCache = {
  false;
};

objective_hold_onKilled = {};

objective_hold_onDisconnected = {};

objective_hold_canOpenLootBoxes = {
  true;
};

objective_hold_constructMarkers  = {
  private ["_depots", "_players", "_radius", "_offset"];
  _depots = _this select 0;
  _players = _this select 1;
  _radius = 100;
  _offset = _radius / 2;
  
  {
    private ["_building"];
    _building = _x select 0;
    _position = [_building, _offset] call SHK_pos;
    {
      [[_position, _radius], "markers_createHoldMarker", _x, false, true] call BIS_fnc_MP;
    } forEach _players;  
  } forEach _depots;
  
  
  {
    [[], "markers_createHoldBriefing", _x, false, true] call BIS_fnc_MP;
  } forEach _players;
  
};

objective_hold_constructDepots = {
  private ["_objectData", "_objectiveData", "_directionAndPosition", "_direction", "_position", "_object"];
  {
    _objectiveData = [_x, 0, false];
    objective_hold_objectData pushBack _objectiveData;
    _objectData = [_x select 1, 1] call depotPositions_getRandomPlaceholdersFromObjects select 0;

    _directionAndPosition = [_x select 0, _objectData] call houseFurnisher_getPosASLAndDirectionFromBuilding;
    _position = _directionAndPosition select 0;
    _direction = _directionAndPosition select 1;
    _object = createVehicle ["Land_SatellitePhone_F", [0,0,3000], [], 0, "FLYING"];
    _object setDir _direction;
    _object setPosASL _position;

    [_x select 0, objective_hold_cleanUp, [_objectiveData]] call buildingDestroyer_init;
    [_x select 0] spawn objective_hold_destroyDepot;
    
  } forEach depots_town_depots;
};

objective_hold_cleanUp = {
  private ["_objectiveData"];
  _objectiveData = _this select 0;

  objective_hold_objectData = objective_hold_objectData - [_objectiveData];
};

objective_hold_destroyDepot = {
  private ["_building"];
  _building = _this select 0;

  sleep (2700 + random 300);
  playSound3D ["A3\Sounds_F\sfx\alarm_independent.wss", _building]; //alarm
  sleep 10;
  playSound3D ["A3\Sounds_F\sfx\alarm_independent.wss", _building]; //alarm
  sleep 10;
  playSound3D ["A3\Sounds_F\sfx\alarm_independent.wss", _building]; //alarm
  sleep 10;
  [_building, random 10] call airStrike_createBomb;
  sleep 0.5;
  [_building, 0] call airStrike_createBomb;
  sleep 1;
  [_building, 0] call airStrike_createBomb;
};

objective_hold_insideDepot = {
  private ["_unit", "_objectiveData", "_time", "_held", "_increment", "_players"];
  _unit = _this select 0;
  _objectiveData = _this select 1;
  _time = call missionControl_getElapsedTime;
  _increment = 0.17;

  _players = [_objectiveData] call objective_hold_getPlayersInBuilding;

  if (_time < 1800) exitWith {
    {
      ["You can not hold this depot before 30 minutes has elapsed.", "hint", _x, false, true] call BIS_fnc_MP;
    } forEach _players;
  };

  _objectiveData set [1, ((_objectiveData select 1) + _increment)];

  _held = _objectiveData select 1;

  {
    ["Depot is " + str _held + "% held", "hint", _x, false, true] call BIS_fnc_MP;
  } forEach _players;

  if (_held >= 100 && ! (_objectiveData select 2)) then {
    _objectiveData set [2, true];
    [(_objectiveData select 0)] spawn objective_hold_setUpDrop;
  };
};

objective_hold_getPlayersInBuilding = {
  private ["_objectiveData", "_players", "_building"];
  _objectiveData = _this select 0;
  _building = _objectiveData select 0 select 0;
  _players = [];

  {
    if (_x distance _building < 10) then {
      _players pushBack _x;
    };
  } forEach call getAllPlayers;

  _players;
};

objective_hold_setUpDrop = {
  private ["_building", "_position", "_squads", "_squad", "_loot"];
  _building = _this select 0 select 0;
  _position = [getPos _building, 2000, 4000] call popoRandom_findLand;

  _squads = [];

  {
    if (_x distance _building < 10) then {
      _squad = [_x] call getSquadForUnit;
      if ! (_squad in _squads) then {
        _squads pushBack _squad;
      };
    };
  } forEach call getAllPlayers;

  player globalChat str count _squads;

  {
    {
      player globalChat "add marker";
      [[_position], "markers_createSupplyDropMarker", _x, false, true] call BIS_fnc_MP;
    } forEach ([_x] call getPlayersInSquad);
  } forEach _squads;

  sleep (300 + random 150);

  _loot = [
    'IKRS_loot_old_nato_weapons',
    'IKRS_loot_old_nato_weapons',
    'IKRS_loot_old_nato_weapons',
    'IKRS_loot_common_nato_weapons',
    'IKRS_loot_common_nato_weapons',
    'IKRS_loot_heavy_nato_weapons'
  ];

  [_position, _loot] call airdrop_create;
};

objective_hold_getAmountOfDepots = {
  private ["_objectives", "_amount"];
  _objectives = [["hold"]] call objectiveController_getSquadsWithObjectives;
  
  _amount = floor ((count _objectives) / 4);

  if (count _objectives == 2) exitWith {
    1;
  };
  
  if (count _objectives == 1 && count squads >= 4) exitWith {
    1;
  };

  _amount;
};

objective_hold_isInsideDepot = {
  {
    private ["_objectiveData", "_building", "_player", "_depot", "_can", "_done"];
    _objectiveData = _x;
    _depot = _objectiveData select 0;
    _building = _depot select 0;
    _done = _objectiveData select 2;

    {
      _player = _x;
      _can = [_player, "canOpenLootBoxes", [_player]] call objectiveController_callUnitObjective;

      if (_can && ! _done && _building distance _player < 10) exitWith {
        [_player, _objectiveData] call objective_hold_insideDepot;
      };
    } forEach call getAllPlayers;
  } forEach objective_hold_objectData;
};

_this spawn {
  while { true } do {

    sleep 1;
    call objective_hold_isInsideDepot;
  }
};