lootbox_boxes = [];

lootbox_types = ["Land_Laptop_F", "Land_WoodenBox_F", "Land_CargoBox_V1_F", "IKRS_Land_CargoBox_1", "IKRS_Land_CargoBox_2", "IKRS_Land_CargoBox_3"];

lootbox_createHoldBox = {
  private ["_position","_azimuth"];
  _position = _this select 0;
  _azimuth = [_this, 1, random 360] call BIS_fnc_param;

  [
    _position,
    _azimuth,
    "Land_CargoBox_V1_F", //closedObject
    "I_CargoNet_01_ammo_F", //open container object
    "", //key
    "IKRS_hold_box_opening_reward",
    "",
    10, 
    0,
    "lootItems_populateHoldAirdropBox"
  ] call lootbox_create;
};

lootbox_createSupplyBox = {
  private ["_position","_azimuth"];
  _position = _this select 0;
  _azimuth = [_this, 1, random 360] call BIS_fnc_param;

  [
    _position,
    _azimuth,
    "Land_Laptop_F", //closedObject
    "Land_Laptop_unfolded_F", //open container object
    "IKRS_supply_key", //key
    "IKRS_box_opening_reward_lvl1",
    "IKRS_guard_secure_reward",
    1, 
    0,
    "lootItems_populateSupplyBoxLevel_0"
  ] call lootbox_create;
};

lootbox_createAdvancedSupplyBox = {
  private ["_position","_azimuth"];
  _position = _this select 0;
  _azimuth = [_this, 1, random 360] call BIS_fnc_param;

  [
    _position,
    _azimuth,
    "Land_WoodenBox_F", //closedObject
    "Box_NATO_WpsSpecial_F", //open container object
    "IKRS_loot_key1", //key
    "IKRS_box_opening_reward_lvl2",
    "IKRS_guard_secure_reward",
    0.75, 
    0,
    "lootItems_populateSupplyBoxLevel_1"
  ] call lootbox_create;
};

lootbox_createAdvancedHoldBox = {
  private ["_position","_azimuth"];
  _position = _this select 0;
  _azimuth = [_this, 1, random 360] call BIS_fnc_param;

  [
    _position,
    _azimuth,
    "IKRS_Land_CargoBox_1", //closedObject
    "B_CargoNet_01_ammo_F", //open container object
    "IKRS_loot_key2", //key
    "IKRS_box_opening_reward_lvl3",
    "IKRS_guard_secure_reward",
    0.75, 
    1,
    "lootItems_populateSupplyBoxLevel_2"
  ] call lootbox_create;
};

lootbox_createMilitaryWeaponBox = {
  private ["_position","_azimuth"];
  _position = _this select 0;
  _azimuth = [_this, 1, random 360] call BIS_fnc_param;

  [
    _position,
    _azimuth,
    "Land_CargoBox_V1_F", //closedObject
    "B_CargoNet_01_ammo_F", //open container object
    "", //key
    "IKRS_box_opening_reward_lvl4",
    "IKRS_guard_secure_reward",
    0.75, 
    0.75,
    "lootItems_populateSupplyBoxLevel_3"
  ] call lootbox_create;
};

lootbox_createMilitaryVehicleBox = {
  private ["_position","_azimuth"];
  _position = _this select 0;
  _azimuth = [_this, 1, random 360] call BIS_fnc_param;

  [
    _position,
    _azimuth,
    "Land_CargoBox_V1_F", //closedObject
    "B_CargoNet_01_ammo_F", //open container object
    "", //key
    "IKRS_box_opening_reward_lvl4",
    "IKRS_guard_secure_reward",
    0.75, 
    0.75,
    "lootItems_populateSupplyBoxLevel_4"
  ] call lootbox_create;
};

lootbox_createManhuntCache = {
  private ["_position","_azimuth"];
  _position = _this select 0;
  _azimuth = [_this, 1, random 360] call BIS_fnc_param;

  [
    _position,
    _azimuth,
    "IKRS_Land_CargoBox_1", //closedObject
    "B_CargoNet_01_ammo_F", //open container object
    "", //key
    "IKRS_signal_box_opening_reward",
    "",
    10, 
    0,
    "lootItems_populateManhuntCache"
  ] call lootbox_create;
};

lootbox_create = {
  private [
    "_position",
    "_azimuth",
    "_closedBobject",
    "_openObject",
    "_key",
    "_openingReward",
    "_secureReward",
    "_openIncrement",
    "_secureIncrement",
    "_lootFunction",
    "_key"
  ];
  _position = _this select 0;
  _azimuth = _this select 1;
  _closedObject = [_this, 2, "Land_CargoBox_V1_F"] call BIS_fnc_param;
  _openObject = [_this, 3, "I_CargoNet_01_ammo_F"] call BIS_fnc_param;
  _key = [_this, 4, ""] call BIS_fnc_param;
  _openingReward = [_this, 5, ""] call BIS_fnc_param;
  _secureReward = [_this, 6, ""] call BIS_fnc_param;
  _openIncrement = [_this, 7, 1] call BIS_fnc_param;
  _secureIncrement = [_this, 8, 1] call BIS_fnc_param;
  _lootFunction = [_this, 9, "lootItems_populateSupplyBoxLevel_0"] call BIS_fnc_param;

  _position set [2, (_position select 2) + 0.5];
  _position = [_position] call findFloor;
  _position set [2, (_position select 2) + 0.10];

  _object = createVehicle [_closedObject, [0,0,3000], [], 0, "FLYING"];
  _object setDir _azimuth;
  _object setPosASL _position;
  _object enableSimulationGlobal false;
  _object setVariable ["lootLock", 0, false];
  _object setVariable ["lootSecure", 0, false];
  _object setVariable ["openObject", _openObject, false];
  _object setVariable ["key", _key, false];
  _object setVariable ["openingReward", _openingReward, false];
  _object setVariable ["secureReward", _secureReward, false];
  _object setVariable ["openIncrement", _openIncrement, false];
  _object setVariable ["secureIncrement", _secureIncrement, false];
  _object setVariable ["lootFunction", _lootFunction, false];
  
  
  lootbox_boxes pushBack _object;
  _object;
};

lootBox_addExtraLoot = {
  private ["_box", "_loot", "_currentLoot"];
  _box = _this select 0;
  _loot = _this select 1;

  _currentLoot = _box getVariable ["extraLoot", []];
  _currentLoot = _currentLoot + _loot;

  _box setVariable ["extraLoot", _currentLoot, false];
};

lootbox_secureBox = {
  private ["_unit", "_box", "_lootSecure"];
  _box = _this select 0;
  _unit = _this select 1;

  _lootSecure = _box getVariable ["lootSecure", 0];
  
  _lootSecure = _lootSecure + ([_box] call lootbox_getSecureIncrement);
  
  _box setVariable ["lootSecure", _lootSecure, false];
  
  [[_unit], _lootSecure] call lootbox_hintSecure;
  
  if (_lootSecure >= 100) then {
    [_box, _unit] call lootbox_secure;
  };
};

lootBox_canSecure = {
  private ["_box", "_unit"];
  _box = _this select 0;
  _unit = _this select 1;

  if ([_unit, 'guard'] call objectiveController_unitHasObjective 
    && ((_box getVariable ["secureReward", ""]) != "")) exitWith {
    true;
  };

  false;
};

lootbox_tickOpen = {
  private ["_unit", "_box", "_lootLock"];
  _box = _this select 0;
  _unit = _this select 1;

  if ([_box, _unit] call lootBox_canSecure) exitWith {
    [_box, _unit] call lootbox_secureBox;
  };
  
  _lootLock = _box getVariable "lootLock";
  
  if (isNil{_lootLock}) exitWith {};
  
  _lootLock = _lootLock + ([_box] call lootbox_getUnlockIncrement);
  
  _box setVariable ["lootLock", _lootLock, false];
  
  [[_unit], _lootLock] call lootbox_hint;
  
  if (_lootLock >= 100) then {
    [_box, _unit] call lootbox_open;
  };
};

lootbox_getSecureIncrement = {
  private ["_timeElapsed", "_increment", "_box"];
  _box = _this select 0;
  _increment = _box getVariable ["secureIncrement", 1];

  _timeElapsed = call missionControl_getElapsedTime;
  
  if (_timeElapsed < 1800) exitWith {
    0;
  }; 
  
  if (_timeElapsed > 2100) exitWith {
    _increment;
  };
  
  _increment * 0.3;
};

lootbox_getUnlockIncrement = {
  private ["_timeElapsed", "_increment", "_box"];
  _box = _this select 0;
  _increment = _box getVariable ["openIncrement", 1];


  _timeElapsed = call missionControl_getElapsedTime;
  
  if (_timeElapsed < 1500) exitWith {
    0;
  }; 
  
  if (_timeElapsed > 1800) exitWith {
    _increment;
  };
  
  _increment * 0.3;
};

lootbox_listHasPlayers = {
  private ["_result"];
  _result = false;
  {
    if (isPlayer _x) exitWith {
      _result = true;
    };
  } forEach (_this select 0);
  
  _result;
};

lootbox_hintSecure = {
  private ["_units", "_value"];
  _units = _this select 0;
  _value = _this select 1;
  
  if (_value == 0) exitWith {
    {
      [["You can't secure this box yet", 'lootbox'], "client_textMessage", _x, true, false] call BIS_fnc_MP;
    } forEach _units;
  };

  {
    [["Loot box is " + str floor _value + "% secured", 'lootbox'], "client_textMessage", _x, true, false] call BIS_fnc_MP;
  } forEach _units;
};

lootbox_hint = {
  private ["_units", "_value"];
  _units = _this select 0;
  _value = _this select 1;
  
  if (_value == 0) exitWith {
    {
      [["You can't open this yet", 'lootbox'], "client_textMessage", _x, true, false] call BIS_fnc_MP;
    } forEach _units;
  };

  {
    [["Target is " + str floor _value + "% open", 'lootbox'], "client_textMessage", _x, true, false] call BIS_fnc_MP;
  } forEach _units;
};

lootbox_secure = {
  private ["_box", "_unit", "_secureReward"];
  _box = _this select 0;
  _unit = _this select 1;
  _secureReward = _box getVariable ["secureReward", ""];
  
  deleteVehicle _box;
  
  if (_secureReward != "") then {
    [([_unit] call getSquadForUnit), [_secureReward]] call addDisconnectedLoot;
  };
};

lootbox_open = {
  private ["_box", "_unit", "_openObject", "_openBox", "_position", "_key", "_extraLoot", "_openingReward"];
  _box = _this select 0;
  _unit = _this select 1;
  _position = getPosASL _box;
  _direction = getDir _box;
  _key = _box getVariable ["key", ""];
  _lootFunction = _box getVariable ["lootFunction", ""];
  _extraLoot = _box getVariable ["extraLoot", []];
  _openingReward = _box getVariable ["openingReward", ""];
  _openObject = _box getVariable ["openObject", "IG_supplyCrate_F"];

  deleteVehicle _box;


  _openBox = createVehicle [_openObject, [0,0,3000], [], 0, "FLYING"];
  _openBox setDir _direction;
  _openBox setPosASL _position;
  _openBox setVariable ['noGuards', true, true];
  
  clearWeaponCargoGlobal _openBox;
  clearMagazineCargoGlobal _openBox;
  clearItemCargoGlobal _openBox;
  clearBackpackCargoGlobal _openBox;
  

  [_openBox, _lootFunction, _extraLoot] call lootItems_populateSupplyBox;
  
  lootbox_boxes pushBack _openBox;

  if (_openingReward != "") then {
    [([_unit] call getSquadForUnit), [_openingReward]] call addDisconnectedLoot;
  };

  [_unit, _key] call lootBox_removeKey;
};

lootBox_deleteBoxesAround = {
  private ["_position", "_radius"];
  _position = _this select 0;
  _radius = _this select 1;
  
  {
    deleteVehicle _x;
  } forEach ([_position, _radius] call lootBox_getBoxesOnRadius);
};

lootBox_getBoxesOnRadius = {
  private ["_position", "_radius", "_boxes"];
  _position = _this select 0;
  _radius = _this select 1;
  _boxes = [];
  
  {
    if ((_x distance _position) <= _radius) then {
       _boxes pushBack _x;
    };
  } forEach lootbox_boxes;
  
  
  _boxes;
};

lootBox_hasKeyToOpen = {
  private ["_unit", "_key"];
  _unit = _this select 0;
  _key = _this select 1;

  if (_key == "") exitWith {true;};

  [_unit, _key] call equipment_unitHasItem;
};

lootBox_removeKey = {
  private ["_unit", "_key"];
  _unit = _this select 0;
  _key = _this select 1;
  [_unit, _key] call equipment_removeItemFromUnit;
};

lootbox_checkBoxes = {
  private ["_openers", "_occupiedBoxes"];
  _openers = [];
  _occupiedBoxes = [];
  
  {
    private [
      "_box",
      "_closestUnit",
      "_closestDistance",
      "_canOpen",
      "_squad",
      "_key",
      "_hasKey",
      "_isUnconscious",
      "_vectorUp"
    ];

    _box = _x;
    
    if (typeOf _box in lootbox_types) then {
      _closestUnit = nil;
      _closestDistance = 1000;
      _key = _box getVariable ["key", ""];
      {
        if (_x distance _box < 2 && [_x, _box] call lootBox_getVerticalDistance < 1) then {
          _canOpen = true;
          _squad = [_x] call getSquadForUnit;
        
          if (! ([_box, _x] call lootBox_canSecure) && ! ([_x, _key] call lootBox_hasKeyToOpen)) then {
            _canOpen = false;
            [["You need a key to open this.", 'lootbox'], "client_textMessage", _x, true, false] call BIS_fnc_MP;
          };

          _isUnconscious = _x getvariable ["ACE_isUnconscious", false];
          
          if (! _isUnconscious && _canOpen && !( _x in _openers) && (isNil {_closestUnit} || (_box distance _x) < _closestDistance)) then {
            _closestUnit = _x;
            _closestDistance = _box distance _x;
          };
        };
      } forEach call getAllAlivePlayers;
      
      if (!( _box in _occupiedBoxes) && ! isNil {_closestUnit} && _closestDistance < 2) then {
        _openers pushBack _closestUnit;
        _occupiedBoxes pushBack _box;
        
        [_x, _closestUnit] call lootbox_tickOpen;
      };
    }
  } forEach lootbox_boxes;
};

lootBox_getVerticalDistance = {
  private ["_a", "_b"];
  _a = _this select 0;
  _b = _this select 1;

  abs ((getPosASL _a select 2) - (getPosASL _b select 2));
};

_this spawn {
  while { true } do {

    sleep 1;
    call lootbox_checkBoxes;
  }
};