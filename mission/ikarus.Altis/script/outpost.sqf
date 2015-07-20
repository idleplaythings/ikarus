outpost_outposts = [];

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

outpost_dismantle = {
  private ["_unit", "_outpost", "_objects"];
  _unit = _this select 0;

  if ([_unit] call outpost_getDistanceToClosestOutpost > 10) exitWith {};

  _outpost  = [_unit] call outpost_getClosestOutpost;

  if (isNil {_outpost}) exitWith {};

  {
    private ["_type", "_position"];
    _type = typeOf _x;
    _position = getPos _x;

    deleteVehicle _x;

    if (_type == "Box_FIA_Ammo_F") then {
      private ["_holder"];
      _holder = createVehicle ["groundWeaponHolder", _position, [], 0, "CAN_COLLIDE"];
      _holder addBackpackCargoGlobal ["IKRS_outpost_backpack", 1];
    };
  } forEach (_outpost select 2);

  outpost_outposts = outpost_outposts - [_outpost];
};

outpost_deploy = {
  private ["_unit", "_position", "_objects"];
  _unit = _this select 0;

  if (backpack _unit != "IKRS_outpost_backpack") exitWith {};

  _position = getPos _unit findEmptyPosition [0,4,"C_Hatchback_01_F"];

  if (count _position == 0) exitWith {
    ["There is no room to deploy an outpost in here", _unit] call broadCastMessageTo; 
  };

  if ([_position] call hideout_distanceFromClosestHideout < 50 
    || [_position] call depots_getDistanceToClosestDepot < 50) exitWith {
    ["This position is too close to a depot, base or outpost", _unit] call broadCastMessageTo;
  };

  if ([_position] call outpost_getDistanceToClosestOutpost < 10) exitWith {
    ["This position is too close to a depot, base or outpost", _unit] call broadCastMessageTo;
  };
  /*
  if ([_position] call depots_getDistanceToClosestDepot > 3000) exitWith {
    ["You need to deploy outpost 3km or closer to a depot", _unit] call broadCastMessageTo;
  };
  */
  _objects = [ATLToASL _position, direction player, outpost_objects_deploy] call houseFurnisher_furnish_location;

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

  outpost_outposts pushBack [
    ([_unit] call getSquadForUnit),
    _position,
    _objects,
    false
  ];

  removeBackpackGlobal _unit;
  [[], "client_removeDeployOutpost", _unit, false, false] call BIS_fnc_MP;
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
  ["Headgear_H_Booniehat_khk",345.59,0.805463,48,0.70,false],
  ["Land_CampingTable_F",353.272,1.37319,102.223,3.8147e-006,false,true],
  ["Item_Binocular",2.03931,1.68859,48,0.8,false],
  ["Land_CanisterPlastic_F",346.242,2.5219,48.3085,0,true],
  ["Land_Ammobox_rounds_F",354.358,2.01297,17.5618,0.8,false,true],
  ["Land_Ammobox_rounds_F",341.786,1.22516,9.34409,0.8,false,true],
  ["Land_Ammobox_rounds_F",348.97,1.54098,338.524,0.8,false,true]
];


outpost_objects = [
  ["Box_FIA_Ammo_F",66.9637,1.4725,345.766,-5.72205e-006,true],
  ["Land_TentDome_F",311.524,3.04777,3.79001,0,true],
  ["Headgear_H_Booniehat_khk",345.59,0.805463,48,0.70,false],
  ["Land_CampingTable_F",353.272,1.37319,102.223,3.8147e-006,false,true],
  ["Item_Binocular",2.03931,1.68859,48,0.8,false],
  ["Land_CanisterPlastic_F",346.242,2.5219,48.3085,0,true],
  ["Land_Ammobox_rounds_F",354.358,2.01297,17.5618,0.8,false,true],
  ["Land_Ammobox_rounds_F",341.786,1.22516,9.34409,0.8,false,true],
  ["Land_Ammobox_rounds_F",348.97,1.54098,338.524,0.8,false,true],
  ["I_Quadbike_01_F",262.116,1.82124,96.6113,0.00426865,true]
];