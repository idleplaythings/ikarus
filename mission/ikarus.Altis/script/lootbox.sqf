lootbox_boxes = [];

lootbox_types = ["Land_CargoBox_V1_F", "IKRS_Land_CargoBox_1", "IKRS_Land_CargoBox_2", "IKRS_Land_CargoBox_3"];

lootbox_create = {
  private ["_position", "_azimuth", "_boxId", "_level", "_boxClass"];
  _position = _this select 0;
  _azimuth = _this select 1;
  _level = [_this, 2, 0] call BIS_fnc_param;
  _boxClass = [_level] call lootBox_getBoxClass;

  _object = createVehicle [_boxClass, [0,0,3000], [], 0, "FLYING"];
  _object setDir _azimuth;
  _object setPosASL _position;
  _object setVariable ["lootLock", 0, false];
  _object setVariable ["level", _level, false];
  
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

lootBox_getBoxClass = {
  private ["_level"];
  _level = _this select 0;

  if (_level == 0) exitWith {"Land_CargoBox_V1_F"};

  if (_level == 1) exitWith {"IKRS_Land_CargoBox_1"};

  if (_level == 2) exitWith {"IKRS_Land_CargoBox_2"};

  if (_level == 3) exitWith {"Land_CargoBox_V1_F"};

  "Land_CargoBox_V1_F";
};

lootbox_tickOpen = {
  private ["_unit", "_box", "_lootLock"];
  _box = _this select 0;
  _unit = _this select 1;
  
  _lootLock = _box getVariable "lootLock";
  
  if (isNil{_lootLock}) exitWith {};
  
  _lootLock = _lootLock + ([_box] call lootbox_getUnlockIncrement);
  
  _box setVariable ["lootLock", _lootLock, false];
  
  [[_unit], _lootLock] call lootbox_hint;
  
  if (_lootLock >= 100) then {
    [_box, _unit] call lootbox_open;
  };
};

lootbox_getUnlockIncrement = {
  private ["_timeElapsed", "_level", "_box"];
  _box = _this select 0;
  _level = _box getVariable ["level", 0];

  if (_level == 0) then {
    _level = 1;
  };

  _timeElapsed = call missionControl_getElapsedTime;
  
  if (_timeElapsed < 1500) exitWith {
    0;
  }; 
  
  if (_timeElapsed > 1800) exitWith {
    1 / _level;
  };
  
  0.3 / _level;
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

lootbox_hint = {
  private ["_units", "_value"];
  _units = _this select 0;
  _value = _this select 1;
  
  if (_value == 0) exitWith {
    {
      ["You can't open this box yet", "hintSilent", _x, false, true] call BIS_fnc_MP;
    } forEach _units;
  };

  {
    ["Loot box is " + str _value + "% open", "hintSilent", _x, false, true] call BIS_fnc_MP;
  } forEach _units;
};

lootbox_open = {
  private ["_box", "_unit", "_openBox", "_position", "_level", "_extraLoot"];
  _box = _this select 0;
  _unit = _this select 1;
  _position = getPosASL _box;
  _direction = getDir _box;
  _level = _box getVariable ["level", 0];
  _extraLoot = _box getVariable ["extraLoot", []];

  deleteVehicle _box;

  _openBox = createVehicle ["IG_supplyCrate_F", [0,0,3000], [], 0, "FLYING"];
  _openBox setDir _direction;
  _openBox setPosASL _position;
  
  clearWeaponCargoGlobal _openBox;
  clearMagazineCargoGlobal _openBox;
  clearItemCargoGlobal _openBox;
  clearBackpackCargoGlobal _openBox;
  

  [_openBox, _level, _extraLoot] call lootItems_populateSupplyBox;
  
  lootbox_boxes pushBack _openBox;

  if (_level == 0) then {
    [([_unit] call getSquadForUnit), ["supply_objective_opening_reward1"]] call addDisconnectedLoot;
  };
  
  [_unit, _level] call lootBox_removeKey;
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
  private ["_unit", "_level", "_key"];
  _unit = _this select 0;
  _level = _this select 1;

  if (_level == 0 || _level > 2) exitWith {true;};

  _key = "IKRS_loot_key" + str _level;

  [_unit, _key] call equipment_unitHasItem;
};

lootBox_removeKey = {
  private ["_unit", "_level", "_key"];
  _unit = _this select 0;
  _level = _this select 1;
  _key = "IKRS_loot_key" + str _level;
  [_unit, _key] call equipment_removeItemFromUnit;
};

lootbox_checkBoxes = {
  private ["_openers", "_occupiedBoxes"];
  _openers = [];
  _occupiedBoxes = [];
  
  {
    private ["_box", "_closestUnit", "_closestDistance", "_canOpen", "_squad", "_level", "_hasKey"];
    _box = _x;
    
    if (typeOf _box in lootbox_types) then {
      _closestUnit = nil;
      _closestDistance = 1000;
      _level = _box getVariable ["level", 0];
      {
        if (_x distance _box < 2) then {
          _canOpen = false;
          _squad = [_x] call getSquadForUnit;
          if (! isNil{_squad}) then {
            _canOpen = [_squad, "canOpenLootBoxes", [_x]] call objectiveController_callSquadObjective;
          };

          if (_canOpen && ! ([_x, _level] call lootBox_hasKeyToOpen)) then {
            _canOpen = false;
            ["You need a level " + str _level + " key to open this box.", "hintSilent", _x, false, true] call BIS_fnc_MP;
          };
          
          if (_canOpen && !( _x in _openers) && (isNil {_closestUnit} || (_box distance _x) < _closestDistance)) then {
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

_this spawn {
  while { true } do {

    sleep 1;
    call lootbox_checkBoxes;
  }
};