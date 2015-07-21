baseModule_outpostmap1_isPrimary = {false;};

"teleportToOutpost" addPublicVariableEventHandler {
  private ["_unit", "_position"];
  _unit = _this select 1 select 0;
  _position = _this select 1 select 1;

  [_unit, _position] call baseModule_outpostmap1_teleport;
};

baseModule_outpostmap1_onCreated = {
  _this spawn baseModule_outpostmap1_spawnActionController;
};

baseModule_outpostmap1_teleport = {
  private ["_unit", "_position", "_outpost", "_squad"];
  _unit = _this select 0;
  _position = _this select 1;
  _outpost = [_position] call outpost_getClosestOutpost;
  _squad = [_unit] call getSquadForUnit;

  if (isNil{_outpost} || !(_outpost select 4)) exitWith {};

  if ([_position] call outpost_getDistanceToClosestOutpost > 10) exitWith {};

  if (isNil {_squad} || ([_squad] call getSquadId) != ([_outpost select 0] call getSquadId)) exitWith {};

  if (missionControl_timeObjectivesGenerated + 5*60 < time) exitWith {};

  if (loadAbs _unit > 300) exitWith {};

  _unit setPos (_outpost select 1);
};

baseModule_outpostmap1_spawnActionController = {
  private ["_objects", "_map", "_squad"];
  _objects = _this select 0;
  _map = nil;

  {
    if (typeOf _x == "MapBoard_altis_F") then {
      _map = _x;
    }
  } forEach _objects;

  waitUntil {outpost_outpostsCreated};

  _squad = [_map] call hideout_getClosestHideout select 0;

  {
    private ["_actions"];
    _actions = [];
    {
      private ["_outpost"];
      _outpost = _x;
      if (_outpost select 4) then {
        _actions pushBack [
          "Teleport to outpost #" + (str (count _actions + 1)) + " at " + (str (_outpost select 1)),
          _outpost select 1
        ];
      };

    } forEach ([_squad] call outpost_getOutpostsForSquad);

    [[_map, _actions], "client_setUpOutpostMapTeleportActions", _x, false, false] call BIS_fnc_MP;
  } forEach ([_squad] call getPlayersInSquad);

  waitUntil {missionControl_timeObjectivesGenerated + 5*60 < time};

  {
    [[_map], "client_rempoveOutpostMapTeleportActions", _x, false, false] call BIS_fnc_MP;
  } forEach call getAllPlayers;
};

baseModule_outpostmap1_data = {
  [
    ["MapBoard_altis_F",42.2786,4.13387,1.61185,-0.00210571,true],
    ["CargoNet_01_box_F",21.3904,2.24786,161.498,-3.8147e-006,true],
    ["Land_WoodenTable_large_F",60.9036,5.34393,288.159,1.90735e-006,false,true],
    ["Land_CampingChair_V1_F",70.583,4.66639,203.911,0.00309753,true],
    ["Land_BarrelSand_grey_F",27.5804,3.7451,47.6939,5.72205e-005,true],
    ["Land_Map_altis_F",63.4291,5.61243,28.653,0.88,false,true],
    ["Land_Camping_Light_F",56.7045,4.90414,95.8894,0.85,false,true],
    ["Land_FMradio_F",59,5.20501,157.229,0.85,false,true],
    ["Land_File1_F",60.9036,5.34393,12.9755,0.89,false,true],
    ["Land_PortableLongRangeRadio_F",67.6311,5.6362,17.2094,0.85,false,true],
    ["Land_TacticalBacon_F",59.4348,5.00959,49.0529,0.85,false,true],
    ["Land_Bucket_clean_F",68.1317,6.08048,47.5352,0,true]
  ];
};