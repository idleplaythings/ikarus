equipment_setPlayersGear = {
  {
    [_x] call equipment_setPlayerGear;
  } forEach (call getAllPlayers);
};

equipment_getVehicle = {
  private ["_squad", "_equipment", "_result"];
  _squad = _this select 0;
  _equipment = [_squad] call getSquadEquipment;
  _result = "";

  {
    private ["_class", "_amount"];
    _class = _x select 0;
    
    if ( _class isKindOf "car" or _class isKindOf "Helicopter" ) exitWith {
      _result = _class;
      _result;
    };

  } forEach _equipment;

  _result;
};

equipment_setPlayerGear = {
  private ["_unit", "_squad", "_uid"];
  _unit = _this select 0;
  _squad = [_unit] call getSquadForUnit;
  _uid = getPlayerUID _unit;

  [_unit, _squad] call equipment_setPlayerGearFromSquad;
};

equipment_setPlayerGearFromSquad = {
  private ["_unit", "_gear", "_squad", "_uid", "_item"];
  _unit = _this select 0;
  _squad = _this select 1;
  _uid = getPlayerUID _unit;

  _gear = [_squad, _uid] call getPlayerGear;
  _unit linkItem "ItemMap";
  _unit linkItem "ItemCompass";
  _unit linkItem "ItemWatch";

  if (isNil {_gear}) then {
    _unit forceAddUniform "U_B_HeliPilotCoveralls";
  };

  if ( ! isNil {(_gear select 1)}) then {
    _unit addHeadgear ((_gear select 1) call BIS_fnc_selectRandom);
  };

  if ( ! isNil {(_gear select 2)}) then {
    _unit addVest ((_gear select 2) call BIS_fnc_selectRandom);
  };

  if ( ! isNil {(_gear select 3)}) then {
    _unit forceAddUniform ((_gear select 3) call BIS_fnc_selectRandom);
  };

  for "_i" from 1 to 3 do {_unit addItemToUniform "9Rnd_45ACP_Mag";};
  _unit addWeaponGlobal "hgun_ACPC2_F";
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

equipment_unitHasItem = {
  private ["_unit", "_class"];
  _unit = _this select 0;
  _class = _this select 1;

  _class in items _unit;
};

equipment_removeItemFromUnit = {
  private ["_unit", "_item"];
  _unit = _this select 0;
  _item = _this select 1;

  _unit removeItem _item;
};