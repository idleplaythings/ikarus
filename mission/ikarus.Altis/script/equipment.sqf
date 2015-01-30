equipment_setPlayersGear = {
  {
    [_x] call equipment_setPlayerGear;
  } forEach (call getAllPlayers);
};

equipment_setPlayerGear = {
  private ["_unit", "_gear", "_squad", "_uid", "_item"];
  _unit = _this select 0;
  _squad = [_unit] call getSquadForUnit;
  _uid = getPlayerUID _unit;

  _gear = [_squad, _uid] call getPlayerGear;

  if (isNil {_gear}) exitWith {};

  if ( ! isNil {(_gear select 1)}) then {
    _unit addHeadgear ((_gear select 1) call BIS_fnc_selectRandom);
  };

  if ( ! isNil {(_gear select 2)}) then {
    _unit addVest ((_gear select 2) call BIS_fnc_selectRandom);
  };

  if ( ! isNil {(_gear select 3)}) then {
    _unit forceAddUniform ((_gear select 3) call BIS_fnc_selectRandom);
  };
};

equipment_equipUnit = {
  private ["_equipment", "_backupContainer"];
  _equipment = _this select 0;
  _backupContainer = _this select 1;

  diag_log str _equipment;
  
  {
    private ["_class", "_amount"];
    _class = _x select 0;
    _amount = _x select 1;
    
    while {_amount > 0} do {
      [_class, _backupContainer] call equipment_addEquipment;
      _amount = _amount - 1;
    };
  
  } forEach _equipment;
};

equipment_addEquipment = {
  private ["_class", "_backupContainer"];
  _class = _this select 0;
  _backupContainer = _this select 1;
  
  if ( isClass (configFile >> "CFGMagazines" >> _class)) exitWith {
    [_class, _backupContainer] call equipment_addMagazine;
  };
  
  if (_class isKindOf "Bag_Base") exitWith {
    [_class, _backupContainer] call equipment_addBackpack;
  };

  [_class, _backupContainer] call equipment_addItem;
};

equipment_addWeapon = {
  private ["_class", "_backupContainer"];
  _class = _this select 0;
  _backupContainer = _this select 1;
  
  _backupContainer addWeaponCargoGlobal [_class, 1];
  
};

equipment_addMagazine = {
  private ["_class", "_backupContainer"];
  _class = _this select 0;
  _backupContainer = _this select 1;
  
  _backupContainer addMagazineCargoGlobal [_class, 1];
  
};

equipment_addBackpack = {
  private ["_class", "_backupContainer"];
  _class = _this select 0;
  _backupContainer = _this select 1;
  
  _backupContainer addBackpackCargoGlobal [_class, 1];
  
};

equipment_addItem = {
  private ["_class", "_backupContainer"];
  _class = _this select 0;
  _backupContainer = _this select 1;
  
  _backupContainer addItemCargoGlobal [_class, 1];
};