lootbox_boxes = [];

lootbox_create = {
  private ["_position", "_azimuth", "_boxId"];
  _position = _this select 0;
  _azimuth = _this select 1;
  
  _object = createVehicle ["Land_CargoBox_V1_F", [0,0,3000], [], 0, "FLYING"];
  _object setDir _azimuth;
  _object setPosASL _position;
  _object setVariable ["lootLock", 0, false];
  
  lootbox_boxes pushBack _object;
  _object;
};

lootbox_tickOpen = {
  private ["_unit", "_box", "_lootLock"];
  _box = _this select 0;
  _unit = _this select 1;
  
  _lootLock = _box getVariable "lootLock";
  
  if (isNil{_lootLock}) exitWith {};
  
  _lootLock = _lootLock + call lootbox_getUnlockIncrement;
  
  _box setVariable ["lootLock", _lootLock, false];
  
  [[_unit], _lootLock] call lootbox_hint;
  
  if (_lootLock >= 100) then {
    [_box] call lootbox_open;
  };
};

lootbox_getUnlockIncrement = {
  private ["_timeElapsed"];
  
  _timeElapsed = call missionControl_getElapsedTime;
  
  if (_timeElapsed < 1200) exitWith {
    0;
  }; 
  
  if (_timeElapsed > 1800) exitWith {
    1;
  };
  
  0.3;
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
  
  {
    ["Loot box is " + str _value + "% open", "hint", _x, false, true] call BIS_fnc_MP;
  } forEach _units;
};

lootbox_open = {
  private ["_box", "_openBox", "_position"];
  _box = _this select 0;
  _position = getPosASL _box;
  _direction = getDir _box;
  
  deleteVehicle _box;

  _openBox = createVehicle ["IG_supplyCrate_F", [0,0,3000], [], 0, "FLYING"];
  _openBox setDir _direction;
  _openBox setPosASL _position;
  
  clearWeaponCargoGlobal _openBox;
  clearMagazineCargoGlobal _openBox;
  clearItemCargoGlobal _openBox;
  clearBackpackCargoGlobal _openBox;
  
  _openBox addBackpackCargoGlobal ['IKRS_loot_civilian_weapons', ((round random 3) + 3)];
  _openBox addBackpackCargoGlobal ['IKRS_loot_old_RU_weapons', (round random 2)];
  _openBox addBackpackCargoGlobal ['IKRS_loot_old_nato_weapons', (round random 1)];
  _openBox addBackpackCargoGlobal ['IKRS_loot_common_RU_weapons', ((ceil random 10) - 8)];
  _openBox addBackpackCargoGlobal ['IKRS_loot_common_nato_weapons', ((ceil random 10) - 9)];
  _openBox addBackpackCargoGlobal ['IKRS_loot_heavy_RU_weapons', ((ceil random 4) - 3)];
  _openBox addBackpackCargoGlobal ['IKRS_loot_heavy_nato_weapons', ((ceil random 10) - 9)];
  
  lootbox_boxes pushBack _openBox;
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

lootbox_checkBoxes = {
  private ["_openers", "_occupiedBoxes"];
  _openers = [];
  _occupiedBoxes = [];
  
  {
    private ["_box", "_closestUnit", "_closestDistance", "_canOpen", "_squad"];
    _box = _x;
    
    if (typeOf _box == "Land_CargoBox_V1_F") then {
      _closestUnit = nil;
      _closestDistance = 1000;
      {
        _canOpen = false;
        _squad = [_x] call getSquadForUnit;
        if (! isNil{_squad}) then {
          _canOpen = [_squad, "canOpenLootBoxes", [_x]] call objectiveController_callSquadObjective;
        };
        
        if (_canOpen && !( _x in _openers) && (isNil {_closestUnit} || (_box distance _x) < _closestDistance)) then {
          _closestUnit = _x;
          _closestDistance = _box distance _x;
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