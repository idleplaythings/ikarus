lootbox_boxes = [];

//[getPosASL player, 0] call lootbox_create;
lootbox_create = {
  private ["_position", "_azimuth", "_boxId"];
  _position = _this select 0;
  _azimuth = _this select 1;
  
  _object = createVehicle ["Land_CargoBox_V1_F", [0,0,3000], [], 0, "FLYING"];
  _object setDir _azimuth;
  _object setPosASL _position;
  _object setVariable ["lootLock", 95, false];
  
  lootbox_boxes set [count lootbox_boxes, _object];
  _boxId = count lootbox_boxes - 1;
  [_boxId, _object] call lootbox_createTrigger;
};
lootbox_activateTrigger = {
  private ["_unitsPresent", "_box", "_lootLock"];
  _unitsPresent = _this select 0;
  _box = lootbox_boxes select (_this select 1);
  
  if (!([_unitsPresent] call lootbox_listHasPlayers)) exitWith {};
  
  _lootLock = _box getVariable "lootLock";
  
  if (_lootLock >= 100) exitWith {};
  
  _lootLock = _lootLock + 1;
  
  _box setVariable ["lootLock", _lootLock, false];
  
  [_unitsPresent, _lootLock] call lootbox_hint;
  
  if (_lootLock >= 100) then {
    [_box] call lootbox_open;
  };
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
    [format ["Loot box is %1 open", str _value], "hint", _x, true] call BIS_fnc_MP;
  } forEach _units;
};

lootbox_open = {
  private ["_box", "_openBox", "_position"];
  _box = _this select 0;
  _position = getPos _box;
  
  deleteVehicle _box;
  
  _openBox = createVehicle ["Box_IND_Wps_F", _position, [], 0, "CAN_COLLIDE"];
  
  clearWeaponCargoGlobal _openBox;
  clearMagazineCargoGlobal _openBox;
  clearItemCargoGlobal _openBox;
  clearBackpackCargoGlobal _openBox;
};

lootbox_createTrigger = {
  private ["_boxId", "_object", "_trigger"];
  _boxId = _this select 0;
  _object = _this select 1;
  
  _trigger = createTrigger["EmptyDetector", getPos _object];
  _trigger setTriggerArea[2, 2, 0, false];
  _trigger setTriggerActivation["ANY", "PRESENT", true];
  _trigger setTriggerStatements[
    "round (time % 1)==0",
    format ["[thislist, %1] call lootbox_activateTrigger;", str _boxId], 
    ""
   ]; 
};