objective_hold_objectData = [];
objective_hold_increment = 0.17;

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

objective_hold_joinInProgress = {
  private ["_unit"];
  _unit = _this select 0;
  [_unit] call objective_hold_setPlayerRating;
};

objective_hold_setPlayerRating = {
  _this call objective_supply_setPlayerRating;
};

objective_hold_onObjectivesCreated = {};

objective_hold_displayName = {
  "Hold";
};

objective_hold_validate = {
  private ["_squad"];
  _squad = _this select 0;
  count ([_squad] call getPlayersInSquad) > 0 && count squads > 1;
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
  private ["_objectData", "_objectiveData", "_directionAndPosition", "_direction", "_position", "_object", "_objectDatas"];
  {
    _objectiveData = [_x, [], false];
    objective_hold_objectData pushBack _objectiveData;
    _objectDatas = [_x select 1, 2] call depotPositions_getRandomPlaceholdersFromObjects;

    _objectData = _objectDatas select 0;
    _position = getPosASL _objectData;
    _direction = direction _objectData;
    _object = createVehicle ["Land_SatellitePhone_F", [0,0,3000], [], 0, "FLYING"];
    _object setDir _direction;
    _object setPosASL _position;

    [_x select 0, objective_hold_cleanUp, [_objectiveData]] call buildingDestroyer_init;
    [_x select 0] spawn objective_hold_destroyDepot;

    _objectData = _objectDatas select 1;
    _position = getPosASL _objectData;
    _direction = direction _objectData;
    [_position, _direction, 2] call lootbox_create;

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

objective_hold_getSquadHoldData = {
  private ["_squad", "_objectiveData", "_result"];
  _squad = _this select 0;
  _objectiveData = _this select 1;
  _result = nil;

  {
    if ((_x select 0) == ([_squad] call getSquadId)) exitWith {
      _result = _x;
    };
  } forEach (_objectiveData select 1);

  if (isNil {_result}) then {
    _result = [([_squad] call getSquadId), 0];
    (_objectiveData select 1) pushBack _result;
  };

  _result;
};

objective_hold_insideDepot = {
  private ["_unit", "_squad", "_objectiveData", "_time", "_held", "_increment", "_players"];
  _unit = _this select 0;
  _squad = [_unit] call getSquadForUnit;
  _objectiveData = _this select 1;
  _time = call missionControl_getElapsedTime;
  _increment = objective_hold_increment;

  if (_time < 1800) exitWith {};
  
  _held = [_squad, _objectiveData] call objective_hold_getSquadHoldData;

  if ((_held select 1) >= 100) exitWith {};

  _held set [1, ((_held select 1) + _increment)];


  if ((_held select 1) >= 100) then {
    
    if (! (_objectiveData select 2)) then {
      [_objectiveData] call objective_hold_setUpDrop;
    };

    [_squad, (_objectiveData select 3)] call objective_hold_giveLocation;
  };
};

objective_hold_informPlayers = {
  private ["_objectiveData", "_players", "_squad", "_held", "_can", "_time"];
  _objectiveData = _this select 0;
  _time = call missionControl_getElapsedTime;
  _players = [_objectiveData] call objective_hold_getPlayersInBuilding;

  {
    _squad = [_x] call getSquadForUnit;
    _held = [_squad, _objectiveData] call objective_hold_getSquadHoldData select 1;
    _can = [_x, "canOpenLootBoxes", [_x]] call objectiveController_callUnitObjective;

    if (_time < 1800) then {
      ["You can not hold this depot before 30 minutes has elapsed.", "hint", _x, false, true] call BIS_fnc_MP;
    } else {
      ["Depot is " + str _held + "% held", "hint", _x, false, true] call BIS_fnc_MP;
    };

  } forEach _players;
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

objective_hold_giveLocation = {
  private ["_squad", "_position"];
  _squad = _this select 0;
  _position = _this select 1;
  _squads = [];
  
  {
    [[_position], "markers_createSupplyDropMarker", _x, false, true] call BIS_fnc_MP;
  } forEach ([_squad] call getPlayersInSquad);
};

objective_hold_setUpDrop = {
  private ["_objectiveData", "_building", "_position"];
  _objectiveData = _this select 0;

  _building = _objectiveData select 0 select 0;
  _position = [getPos _building, 2000, 4000] call popoRandom_findLand;

  _objectiveData set [2, true];
  _objectiveData set [3, _position];

  [_position] spawn {
    private ["_position", "_loot"];
    _position = _this select 0;

    sleep (120 + random 60);

    [_position, lootItems_populateHoldAirdropBox] call airdrop_create;
  };
};

objective_hold_getAmountOfDepots = {
  private ["_objectives", "_amount"];

  if (count (["military"] call objectiveController_getSquadsWithObjective) > 0) exitWith {
    0;
  };

  _objectives = [["hold"]] call objectiveController_getSquadsWithObjectives;
  _amount = floor ((count _objectives) / 4);

  if (count _objectives == 2) exitWith {
    1;
  };
  
  if (count _objectives > 0 && count _objectives < 4 && count squads >= 4) exitWith {
    1;
  };

  _amount;
};

objective_hold_isInsideDepot = {
  {
    private ["_objectiveData", "_building", "_player", "_depot", "_can", "_squadIds", "_squadId"];
    _objectiveData = _x;
    _depot = _objectiveData select 0;
    _building = _depot select 0;
    _squadIds = [];

    {
      _player = _x;
      _squadId = [([_player] call getSquadForUnit)] call getSquadId;

      _can = [_player, "canOpenLootBoxes", [_player]] call objectiveController_callUnitObjective;

      if (_can && _building distance _player < 10 && ! (_squadId in _squadIds)) then {
        _squadIds pushBack _squadId;
        [_player, _objectiveData] call objective_hold_insideDepot;
      };
    } forEach call getAllPlayers;

    [_objectiveData] call objective_hold_informPlayers;
  } forEach objective_hold_objectData;
};

_this spawn {
  while { true } do {

    sleep 1;
    call objective_hold_isInsideDepot;
  }
};