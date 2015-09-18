objective_manhunt_transmitterPosition = nil;
objective_manhunt_transmitterMarkerPosition = nil;
objective_manhunt_transmitterMarkerRadius = 0;
objective_manhunt_transmitter = nil;
objective_manhunt_transmitterActive = false;
objective_manhunt_transmitterObjects = nil;
objective_manhunt_transmitterDestroyed = false;

objective_manhunt_construct = {};

objective_manhunt_displayName = {
  "Signal"
};

objective_manhunt_joinInProgress = {
  private ["_unit"];
  _unit = _this select 0;

  _this call objective_manhunt_setPlayerRating;

  if (isNil{objective_manhunt_transmitterPosition}) exitWith {};

  [[], "markers_createManhuntBriefing", _unit, false, true] call BIS_fnc_MP;

  if (objective_manhunt_transmitterDestroyed) exitWith {};

  [[objective_manhunt_transmitter], "client_createActivateTransmitterAction", _unit, false, true] call BIS_fnc_MP;

  if (isNil{objective_manhunt_transmitterMarkerPosition}) exitWith {};

  [
    [
      objective_manhunt_transmitterMarkerPosition,
      objective_manhunt_transmitterMarkerRadius,
      objective_manhunt_transmitterActive
    ], 
    "markers_updateManhuntTransmitterMarker",
    _unit,
    true,
    false
  ] call BIS_fnc_MP;
};

objective_manhunt_setPlayerRating = {
  _this call objective_supply_setPlayerRating;
};

objective_manhunt_onObjectivesCreated = {
  if (count ([['manhunt']] call objectiveController_getSquadsWithObjectives) > 0) then {
    call objective_manhunt_createTransmitter;
    call objective_manhunt_addBriefing;

    [] spawn {

      sleep 600;

      if (! objective_manhunt_transmitterActive) then {
        [5000] call objective_manhunt_updateGeneralMarker;
      };

      sleep 300;

      if (! objective_manhunt_transmitterActive) then {
        [1000] call objective_manhunt_updateGeneralMarker;
      };

      sleep 300;

      if (! objective_manhunt_transmitterActive) then {
        [500] call objective_manhunt_updateGeneralMarker;
      };

      sleep 600;

      if (! objective_manhunt_transmitterActive) then {
        call objective_manhunt_createExtraSignalDevice;
      };

      sleep 1200;

      if (! objective_manhunt_transmitterActive) then {
        playSound3D ["A3\Sounds_F\sfx\alarm_independent.wss", nil, false, objective_manhunt_transmitterPosition]; //alarm
        sleep 10;
        playSound3D ["A3\Sounds_F\sfx\alarm_independent.wss", nil, false, objective_manhunt_transmitterPosition]; //alarm
        sleep 10;
        playSound3D ["A3\Sounds_F\sfx\alarm_independent.wss", nil, false, objective_manhunt_transmitterPosition]; //alarm

        sleep 10;

        {
          deleteVehicle _x;
        } forEach objective_manhunt_transmitterObjects;

        [objective_manhunt_transmitterPosition, 0] call airStrike_createBomb;
        objective_manhunt_transmitterDestroyed = true;
      };
    };
  };
};

objective_manhunt_updateGeneralMarker = {
  private ["_radius", "_offset"];
  _radius = _this select 0;
  _offset = _radius / 2;

  objective_manhunt_transmitterMarkerPosition = [objective_manhunt_transmitterPosition, _offset] call SHK_pos;
  objective_manhunt_transmitterMarkerRadius = _radius;
  {
    [[objective_manhunt_transmitterPosition, _radius, objective_manhunt_transmitterActive], "markers_updateManhuntTransmitterMarker", _x, true, false] call BIS_fnc_MP;
    ["New intel on transmitter location received", _x, 'manhuntTransmitterLocation'] call broadcastMessageTo; 
  } forEach (call getAllPlayers);
  
};

objective_manhunt_createExtraSignalDevice = {
  private ["_position", "_holder"];
  _position = [objective_manhunt_transmitterPosition, 1000, 3000] call popoRandom_findLand;

  _building = nearestBuilding _position;

  if (_building distance _position < 100) then {
    _position = ([_building] call BIS_fnc_buildingPositions) call BIS_fnc_selectRandom;
  };

  _holder = createVehicle ["groundWeaponHolder", _position, [], 0, "NONE"];
  ['IKRS_signal_device', _holder] call equipment_addEquipment;
};


objective_manhunt_createTransmitter = {
  private ["_objects", "_depot", "_position", "_startPosition", "_building", "_finalPosition", "_direction"];
  
  _depot = call depots_getRandom;
  _startPosition = nil;
  _finalPosition = nil;
  _direction = random 360;

  if (isNil{_depot}) then {
    _startPosition = call AO_getRandomLandPosition;
  } else {
    _startPosition = getPos (_depot select 0);
  };

  _position = [_startPosition, 2000, 4000] call popoRandom_findLand;

  _building = nearestBuilding _position;

  if (_building distance _position < 500) then {
    _finalPosition = ([_building] call BIS_fnc_buildingPositions) call BIS_fnc_selectRandom;
    _direction = getDir _building;
  } else {
    _finalPosition = _position findEmptyPosition [0,100,"C_Hatchback_01_F"];
  };

  if (isNil{_finalPosition}) then {
    _finalPosition = _position findEmptyPosition [0,1000,"C_Hatchback_01_F"];
  };

  objective_manhunt_transmitterPosition = _finalPosition;

  _objects = [
    ATLToASL _finalPosition,
    _direction,
    call objective_manhunt_transmitterData
  ] call houseFurnisher_furnish_location;

  objective_manhunt_transmitterObjects = _objects;

  {
    if (typeOf _x == "Land_SatellitePhone_F") then {
      objective_manhunt_transmitter = _x;
    };
  } forEach _objects;

  {
    [[objective_manhunt_transmitter], "client_createActivateTransmitterAction", _x, false, true] call BIS_fnc_MP;
  } forEach (call getAllPlayers);
};

objective_manhunt_transmitterData = {
  [
    ["Land_CampingTable_small_F",0,0,0.834,0,false,true],
    ["Land_CampingChair_V1_F",0,0.3,0.018,0,false,true],
    ["Land_SatellitePhone_F",0,0,190,0.81064,false,true]
  ];
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

  if  (backpack _unit != "IKRS_signal_device") exitWith {};

  if (vehicle _unit != _unit) exitWith {
    ["You can not triangulate from a vehicle", _unit, 'triangulation'] call broadcastMessageTo; 
  };

  if (isNil{objective_manhunt_transmitterPosition}) exitWith {
    ["No active signals found.", _unit, 'triangulation'] call broadcastMessageTo; 
  };
    
  _time = [_unit] call objective_manhunt_getTriangulationTime;

  if (_time + 60 > time) exitWith {
    private ["_timeToWait"];
    _timeToWait = _time + 60 - time;
    ["You have to wait " + (str round _timeToWait) + " seconds to triangulate again", _unit, 'triangulation'] call broadcastMessageTo; 
  };

  _distance = _unit distance objective_manhunt_transmitterPosition;
  _variance = random (_distance * 0.10) - _distance * 0.05;
  _result = _distance + _variance;

  ["Signal distance is ~" + (str round _result) + "m.", _unit, 'triangulation'] call broadcastMessageTo;
  [_unit] call objective_manhunt_setTriangulation;

  {
    [[_result, getPos _unit], "markers_updateTriangulationMarkers", _x, true, false] call BIS_fnc_MP;
  } forEach ([[_unit] call getSquadForUnit] call getPlayersInSquad);
};

objective_manhunt_activateTransmitter = {
  private ["_unit"];
  _unit = _this select 0;

  if (objective_manhunt_transmitterActive) exitWith {
    ["Transmitter is already active!", _unit, 'signalTransmitter'] call broadcastMessageTo; 
  };

  if (objective_manhunt_transmitterDestroyed) exitWith {};

  if  (backpack _unit != "IKRS_signal_device") exitWith {};

  if (vehicle _unit != _unit) exitWith {};

  if (_unit distance objective_manhunt_transmitter > 2.5) exitWith {};
  
  objective_manhunt_transmitterActive = true;
  [_unit, "IKRS_signal_device"] call equipment_removeItemFromUnit;

  [[], "client_removeSignalDeviceAction", _unit, true, false] call BIS_fnc_MP;

  objective_manhunt_transmitterMarkerPosition = objective_manhunt_transmitterPosition;
  objective_manhunt_transmitterMarkerRadius = 500;

  [([_unit] call getSquadForUnit), ["IKRS_signal_transmitter_activation_reward"]] call addDisconnectedLoot;

  {
    [
      [
        objective_manhunt_transmitterMarkerPosition,
        objective_manhunt_transmitterMarkerRadius,
        objective_manhunt_transmitterActive
      ], 
      "markers_updateManhuntTransmitterMarker",
      _x,
      true,
      false
    ] call BIS_fnc_MP;
    
  } forEach (call getAllPlayers);

  [] spawn objective_manhunt_createAirDrop;
};

objective_manhunt_createAirDrop = {
  private ["_position"];
  _position = [objective_manhunt_transmitterPosition, 0, 500] call popoRandom_findLand;

  waitUntil {
    sleep 10;
    call missionControl_getElapsedTime > (60 * 30)
  };

  [_position, lootbox_createManhuntCache] call airdrop_create;
};

"triangulation" addPublicVariableEventHandler {
  private ["_unit"];
  _unit = _this select 1 select 0;

  [_unit] call objective_manhunt_triangulate;
};

"activateSignalTransmitter" addPublicVariableEventHandler {
  private ["_unit"];
  _unit = _this select 1 select 0;

  [_unit] call objective_manhunt_activateTransmitter;
};

_this spawn {
  
  waitUntil {
    sleep 1;
    call missionControl_getElapsedTime > (60 * 2);
  };

  if (count ([['manhunt']] call objectiveController_getSquadsWithObjectives) == 0) exitWith {};

  while { true } do {
    sleep 30;
    call objective_manhunt_markSignalDevices;
  }
};