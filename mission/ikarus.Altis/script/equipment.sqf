equipment_toDisconnectedLoot = [
  "IKRS_intelligence_weapon",
  "IKRS_intelligence_vehicle",
  "IKRS_intelligence_helo"
];

equipment_setPlayersGear = {
  {
    [_x] call equipment_setPlayerGear;
  } forEach (call getAllPlayers);
};

equipment_getVehicles = {
  private ["_squad", "_equipment", "_result"];
  _squad = _this select 0;
  _equipment = [_squad] call getSquadEquipment;
  _result = [];

  {
    private ["_class", "_amount"];
    _class = _x select 0;
    
    if ( _class isKindOf "car" or _class isKindOf "Helicopter" ) then {
      _result pushBack _class;
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
  _unit linkItem "NVGoggles_OPFOR";

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
  _unit addItemToUniform "ACE_MapTools";
};

equipment_equipHideoutCache = {
  private ["_equipment", "_backupContainer", "_squad"];
  _equipment = _this select 0;
  _backupContainer = _this select 1;
  _squad = _this select 2;
  
  {
    private ["_class", "_amount"];
    _class = _x select 0;
    _amount = _x select 1;
    
    if (_class in equipment_toDisconnectedLoot) then {
      while {_amount > 0} do {
        [_squad, [_class]] call addDisconnectedLoot;
        _amount = _amount - 1;
      };
    } else {
      while {_amount > 0} do {
        [_class, _backupContainer] call equipment_addEquipment;
        _amount = _amount - 1;
      };
    }
  
  } forEach _equipment;
};

equipment_equipUnit = {
  private ["_equipment", "_backupContainer"];
  _equipment = _this select 0;
  _backupContainer = _this select 1;
  
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

  if (backpack _unit == _class) exitWith {true;};

  _class in items _unit;
};

equipment_removeItemFromUnit = {
  private ["_unit", "_item"];
  _unit = _this select 0;
  _item = _this select 1;

  if (backpack _unit == _item) exitWith {
    removeBackpackGlobal _unit;
  };

  _unit removeItem _item;
};

equipment_replaceObjectWithItem = {
  private ["_object", "_class", "_holder"];
  _object = _this select 0;
  _class = _this select 1;

  _holder = createVehicle ["groundWeaponHolder", getPos _object, [], 0, "CAN_COLLIDE"];
  [_class, _holder] call equipment_addEquipment;
  _holder setDir getDir _object;
  _holder setPosASL getPosASL _object;
  
  deleteVehicle _object;
};