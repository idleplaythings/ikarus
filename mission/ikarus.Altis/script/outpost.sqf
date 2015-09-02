outpost_outposts = [];
outpost_outpostsCreated = false;
outpost_spawnedOutposts = [];

"deployOutpost" addPublicVariableEventHandler {
  private ["_unit"];
  _unit = _this select 1 select 0;
  [_unit] call outpost_deploy;
};

"dismantleOutpost" addPublicVariableEventHandler {
  private ["_unit"];
  _unit = _this select 1 select 0;
  [_unit] call outpost_dismantle;
};

outpost_createOutposts = {
  { 
    [_x] call outpost_createOutpostsForSquad;
  } forEach squads;

  outpost_outpostsCreated = true;
};

outpost_createOutpostsForSquad = {
  private ["_squad", "_outposts"];
  _squad = _this select 0;
  _outposts = [];

  {
    private ["_position"];
    _position = _x;
    _position = [_position select 0, _position select 1, 0];

    if ([_position] call outpost_isTooCloseToActivate) then {

    } else {
      [
        _position,
        _squad
      ] call outpost_createActiveOutpost;

      _outposts pushBack _position;
    };
  } forEach ([_squad] call getOutpostLocations);

  outpost_spawnedOutposts pushBack [_squad, _outposts];

  {
    [_x] call outpost_createBriefingForUnit;
  } forEach ([_squad] call getPlayersInSquad);
};

outpost_createBriefingForUnit = {
  private ["_unit", "_squad", "_active", "_inactive"];
  _unit = _this select 0;
  _squad = [_unit] call getSquadForUnit;
  _active = [_squad] call outpost_getSpawnedOutpostsForSquad;
  _inactive = [_squad] call outpost_getUnSpawnedOutpostsForSquad;
  [[_active, _inactive], "markers_createOutpostBriefing", _unit, false, false] call BIS_fnc_MP;
};

outpost_dismantle = {
  private ["_unit", "_outpost", "_objects"];
  _unit = _this select 0;

  if ([_unit] call outpost_getDistanceToClosestOutpost > 10) exitWith {};

  _outpost  = [_unit] call outpost_getClosestOutpost;

  if (isNil {_outpost}) exitWith {};

  deleteVehicle (_outpost select 3);

  {
    private ["_type", "_position"];
    _type = typeOf _x;
    _position = getPos _x;

    if (_type != "I_Quadbike_01_F" ) then {
      deleteVehicle _x;
    };

    if (_type == "Box_FIA_Ammo_F") then {
      private ["_holder"];
      _holder = createVehicle ["groundWeaponHolder", _position, [], 0, "CAN_COLLIDE"];
      _holder addBackpackCargoGlobal ["IKRS_outpost_backpack", 1];
    };
  } forEach (_outpost select 2);

  outpost_outposts = outpost_outposts - [_outpost];
};

outpost_isTooClose = {
  private ["_position"];
  _position = _this select 0;

  if ([_position] call hideout_distanceFromClosestHideout < 50 
    || [_position] call depots_getDistanceToClosestDepot < 50) exitWith {
    true;
  };

  if ([_position] call outpost_getDistanceToClosestOutpost < 10) exitWith {
    true;
  };

  false;
};

outpost_isTooCloseToActivate = {
  private ["_position"];
  _position = _this select 0;

  if ([_position] call hideout_distanceFromClosestHideout < 500 
    || [_position] call depots_getDistanceToClosestDepot < 500) exitWith {
    true;
  };

  if ([_position] call outpost_getDistanceToClosestOutpost < 10) exitWith {
    true;
  };

  false;
};


outpost_deploy = {
  private ["_unit", "_position", "_objects"];
  _unit = _this select 0;

  if (backpack _unit != "IKRS_outpost_backpack") exitWith {};

  _position = getPos _unit findEmptyPosition [0,5,"C_Hatchback_01_F"];

  if (! missionControl_objectivesGenerated) exitWith {
    ["You have to wait until mission objectives are generated before deployin an outpost", _unit] call broadCastMessageTo; 
  };

  if (count ([([_unit] call getSquadForUnit)] call outpost_getOutpostsForSquad) >= 6) exitWith {
    ["You are not allowed to have more than six outposts", _unit, "outpost"] call broadCastMessageTo; 
  };

  if (vehicle _unit != _unit) exitWith {
    ["You can't deploy outpost from a vehicle", _unit, "outpost"] call broadCastMessageTo; 
  };

  if (count _position == 0) exitWith {
    ["There is no room to deploy an outpost in here", _unit, "outpost"] call broadCastMessageTo; 
  };

  if ([_position] call outpost_isTooClose) exitWith {
    ["This position is too close to a depot, base or outpost", _unit, "outpost"] call broadCastMessageTo;
  };

  if (! isNil{call depots_getRandom} && [_position] call depots_getDistanceToClosestDepot > 3000) exitWith {
    ["You need to deploy outpost 3km or closer to a depot", _unit, "outpost"] call broadCastMessageTo;
  };
  
  [_position, ([_unit] call getSquadForUnit)] call outpost_createInactiveOutpost;
  removeBackpackGlobal _unit;
  [[], "client_removeDeployOutpost", _unit, false, false] call BIS_fnc_MP;
};

outpost_getActiveOutpostsForSquad = {
  private ["_squad", "_outposts"];
  _squad = _this select 0;
  _outposts = [_squad] call outpost_getOutpostsForSquad;

  _outposts = [_outposts, {
    _this select 4;
  }] call AEX_filter;

  _outposts;
};

outpost_getOutpostsForSquad = {
  private ["_squad", "_outposts"];
  _squad = _this select 0;
  _outposts = [];

  {
    if ([_x select 0] call getSquadId == [_squad] call getSquadId) then {
      _outposts pushBack _x;
    };
  } forEach outpost_outposts;

  _outposts;
};

outpost_getUnSpawnedOutpostsForSquad = {
  private ["_squad", "_spawned"];
  _squad = _this select 0;
  _spawned = [_squad] call outpost_getSpawnedOutpostsForSquad;
  
  [([_squad] call getOutpostLocations), {
    private ["_position"];
    _position = _this;
    _position set [2, 0];

    ! (_position in _spawned);
  }] call AEX_filter;
};

outpost_getSpawnedOutpostsForSquad = {
  private ["_squad", "_result"];
  _squad = _this select 0;
  _result = [];

  {
    if (([_squad] call getSquadId) == ([_x select 0] call getSquadId)) exitWith {
      _result = (_x select 1);
    };
  } forEach outpost_spawnedOutposts;

  _result;
};

outpost_getOutpostsChangesForSquad = {
  private ["_squad", "_outposts", "_locations", "_new", "_removed"];
  _squad = _this select 0;
  _outposts = [_squad] call outpost_getOutpostsForSquad;
  _locations = [_squad] call outpost_getSpawnedOutpostsForSquad;
  _new = [];
  _removed = [];

  {
    private ["_location2d"];
    _location2d = _x select 1;
    if (! (_location2d in _locations)) then {
      _new pushBack _location2d;
    }
  } forEach _outposts;

  {
    if ([_x] call outpost_getDistanceToClosestOutpost > 0) then {
      _removed pushBack [_x select 0, _x select 1];
    };
  } forEach _locations;

  [_new, _removed];
};

outpost_createInactiveOutpost = {
  private ["_position", "_squad"];
  _position = _this select 0;
  _squad = _this select 1;

  [_position, _squad, false] call outpost_createOutpost;
};

outpost_createActiveOutpost = {
  private ["_position", "_squad"];
  _position = _this select 0;
  _squad = _this select 1;

  [_position, _squad, true] call outpost_createOutpost;
};

outpost_createOutpost = {
  private ["_position", "_squad", "_active", "_objects", "_objectsToDeploy", "_trigger", "_outpost"];
  _position = _this select 0;
  _squad = _this select 1;
  _active = _this select 2;

  if (_active) then {
    _objectsToDeploy = outpost_objects;
  } else {
    _objectsToDeploy = outpost_objects_deploy;
  };

  _objects = [ATLtoASL _position, random 360, _objectsToDeploy] call houseFurnisher_furnish_location;

  { 
    if (typeOf _x == "Box_FIA_Ammo_F") then {
      private ["_object"];
      _object = _x;

      clearWeaponCargoGlobal _object;
      clearMagazineCargoGlobal _object;
      clearItemCargoGlobal _object;
      clearBackpackCargoGlobal _object;
      _object allowDamage false;

      {
        [[_object], "client_setUpDismantleOutpost", _x, false, false] call BIS_fnc_MP;
      } forEach call getAllPlayers;
    };
  } forEach _objects;

  _trigger = createTrigger["EmptyDetector", _position];
  _trigger setTriggerArea[20, 20, 0, false];
  _trigger setTriggerActivation["ANY", "PRESENT", true];

  _outpost = [
    _squad,
    _position,
    _objects,
    _trigger,
    _active
  ];

  _trigger setTriggerStatements[
    "round (time % 10)==0",
    "[thislist, " +(str _position)+ "] call outpost_outpostTriggerActivate;", 
    ""
  ]; 

  outpost_outposts pushBack _outpost;
  _outpost;
};

outpost_outpostTriggerActivate = {
  private ["_present", "_position", "_outpost", "_active"];
  _present = _this select 0;
  _position = _this select 1;
  _outpost = [_position] call outpost_getClosestOutpost;

  if (isNil {_outpost}) exitWith {};

  _active = if (_outpost select 4) then {
    "Feel free to disconnect or leave loot here";
  } else {
    "THIS OUTPOST IS INACTIVE, DO NOT LEAVE LOOT HERE!";
  };

  {
    if (_x in _present) then {
      private ["_text"];
      _text = "";
      if (_x in ([_outpost select 0] call getPlayersInSquad)) then {
        _text = "This is your companys outpost. " + _active;
      } else {
        _text = "This is an ENEMY outpost. Feel free to dismantle it!";
      };

      [[_text, 'outpost'], "client_textMessage", _x, true, false] call BIS_fnc_MP;
    };
  } forEach call getAllPlayers;
};

outpost_getClosestOutpost = {
  private ["_unit", "_closest"];
  _unit = _this select 0;

  if (count outpost_outposts == 0) exitWith {
    nil;
  };

  _closest = nil;

  {
    if (isNil{_closest}) then {
      _closest = _x;
    };
    if ((_x select 1) distance _unit < (_closest select 1) distance _unit) then {
      _closest = _x;
    };
  } forEach outpost_outposts;

  _closest;
};

outpost_getClosestActiveOutpost = {
  private ["_unit", "_closest"];
  _unit = _this select 0;

  if (count outpost_outposts == 0) exitWith {
    nil;
  };

  _closest = nil;

  {
    if (_x select 4) then {
      if (isNil{_closest}) then {
        _closest = _x;
      };
      if ((_x select 1) distance _unit < (_closest select 1) distance _unit) then {
        _closest = _x;
      };
    };
  } forEach outpost_outposts;

  _closest;
};

outpost_getDistanceToClosestActiveOutpost = {
  private ["_unit", "_closest"];
  _unit = _this select 0;
  _closest = [_unit] call outpost_getClosestActiveOutpost;

  if (isNil{_closest}) exitWith {
    999999999;
  };

  (_closest select 1) distance _unit;
};

outpost_getDistanceToClosestOutpost = {
  private ["_unit", "_closest"];
  _unit = _this select 0;
  _closest = [_unit] call outpost_getClosestOutpost;

  if (isNil{_closest}) exitWith {
    999999999;
  };

  (_closest select 1) distance _unit;
};

outpost_objects_deploy = [
  ["Box_FIA_Ammo_F",66.9637,1.4725,345.766,-5.72205e-006,true],
  ["Land_TentDome_F",311.524,3.04777,3.79001,0,true,true],
  ["Land_CampingTable_F",353.272,1.37319,102.223,3.8147e-006,false,true],
  ["Land_CanisterPlastic_F",346.242,2.5219,48.3085,0,true],
  ["Land_Ammobox_rounds_F",354.358,2.01297,17.5618,0.8,false,true],
  ["Land_Ammobox_rounds_F",341.786,1.22516,9.34409,0.8,false,true],
  ["Land_Ammobox_rounds_F",348.97,1.54098,338.524,0.8,false,true]
];


outpost_objects = [
  ["Box_FIA_Ammo_F",66.9637,1.4725,345.766,-5.72205e-006,true],
  ["Land_TentDome_F",311.524,3.04777,3.79001,0,true,true],
  ["Headgear_H_Booniehat_khk",345.59,0.805463,48,0.70,false],
  ["Land_CampingTable_F",353.272,1.37319,102.223,3.8147e-006,false,true],
  ["Land_CanisterPlastic_F",346.242,2.5219,48.3085,0,true],
  ["Land_Ammobox_rounds_F",354.358,2.01297,17.5618,0.8,false,true],
  ["Land_Ammobox_rounds_F",341.786,1.22516,9.34409,0.8,false,true],
  ["Land_Ammobox_rounds_F",348.97,1.54098,338.524,0.8,false,true],
  ["I_Quadbike_01_F",262.116,1.82124,96.6113,0.00426865,true]
];