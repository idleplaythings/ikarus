outpost_outposts = [];
outpost_outpostsCreated = false;

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
    private ["_active", "_inactive", "_squad"];
    _squad = _x;
    _active = [];
    _inactive = [];

    {
      private ["_position"];
      _position = _x;

      if ([_position] call outpost_isTooCloseToActivate) then {
        _inactive pushBack _position;
      } else {
        _active pushBack _position;

        [
          [_position select 0, _position select 1, 0],
          _squad
        ] call outpost_createActiveOutpost;
      };
    } forEach ([_x] call getOutpostLocations);

    {
      [[_active, _inactive], "markers_createOutpostBriefing", _x, false, false] call BIS_fnc_MP;
    } forEach ([_squad] call getPlayersInSquad);
  } forEach squads;

  outpost_outpostsCreated = true;
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

  _position = getPos _unit findEmptyPosition [0,4,"C_Hatchback_01_F"];

  if (! missionControl_objectivesGenerated) exitWith {
    ["You have to wait until mission objectives are generated before deployin an outpost", _unit] call broadCastMessageTo; 
  };

  if (count ([([_unit] call getSquadForUnit)] call outpost_getOutpostsForSquad) >= 6) exitWith {
    ["You are not allowed to have more than six outposts", _unit] call broadCastMessageTo; 
  };

  if (count _position == 0) exitWith {
    ["There is no room to deploy an outpost in here", _unit] call broadCastMessageTo; 
  };

  if ([_position] call outpost_isTooClose) exitWith {
    ["This position is too close to a depot, base or outpost", _unit] call broadCastMessageTo;
  };

  if ([_position] call depots_getDistanceToClosestDepot > 3000) exitWith {
    ["You need to deploy outpost 3km or closer to a depot", _unit] call broadCastMessageTo;
  };
  
  [_position, ([_unit] call getSquadForUnit)] call outpost_createInactiveOutpost;
  removeBackpackGlobal _unit;
  [[], "client_removeDeployOutpost", _unit, false, false] call BIS_fnc_MP;
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

outpost_getOutpostsChangesForSquad = {
  private ["_squad", "_outposts", "_locations", "_new", "_removed"];
  _squad = _this select 0;
  _outposts = [_squad] call outpost_getOutpostsForSquad;
  _locations = [_squad] call getOutpostLocations;
  _new = [];
  _removed = [];

  {
    private ["_location2d"];
    _location2d = [_x select 1 select 0, _x select 1 select 1];
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

      [_text, "hintSilent", _x, false, false] call BIS_fnc_MP;
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
  ["Item_Binocular",2.03931,1.68859,48,0.8,false],
  ["Land_CanisterPlastic_F",346.242,2.5219,48.3085,0,true],
  ["Land_Ammobox_rounds_F",354.358,2.01297,17.5618,0.8,false,true],
  ["Land_Ammobox_rounds_F",341.786,1.22516,9.34409,0.8,false,true],
  ["Land_Ammobox_rounds_F",348.97,1.54098,338.524,0.8,false,true],
  ["I_Quadbike_01_F",262.116,1.82124,96.6113,0.00426865,true]
];