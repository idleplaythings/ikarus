loot_findSquadLoot = {
  private ["_squad", "_lootList"];
  _squad = _this select 0;
  _lootList = [_squad] call loot_findLootInHideout;
  
  _lootList;
};

loot_findLootInHideout = {
  private ["_squad", "_lootList", "_building"];
  _squad = _this select 0;
  _lootList = [];
  
  _building = [_squad] call getSquadHideoutBuilding;
  _lootList = _lootList + [_building, _lootList] call loot_checkSupplies;
  
  _lootList;
};

loot_checkSupplies = {
  private ["_building", "_lootList", "_objects"];
  _building = _this select 0;
  _lootList = [];
  _objects = _building nearSupplies hideout_hideoutRadius;

  {
    if (_x isKindOf "man") then {
      _lootList = _lootList + ([_x] call loot_checkUnit);
    } else {
      _lootList = _lootList + ([_x] call loot_checkContainer);
    }
  } forEach _objects;
  
  copyToClipboard str _lootList;
  _lootList;
};

loot_checkUnit = {
  private ["_unit", "_lootList"];
  _unit = _this select 0;
  _lootList = [];
  
  _lootList = _lootList + ([uniformContainer  _unit] call loot_checkContainer);
  _lootList = _lootList + ([backpackContainer  _unit] call loot_checkContainer);
  _lootList = _lootList + ([vestContainer _unit] call loot_checkContainer);
  _lootList = _lootList + assignedItems _unit;
  _lootList = _lootList + [vest _unit, backpack _unit, uniform _unit];
  
  _lootList = _lootList + [primaryWeapon _unit] + (primaryWeaponItems _unit);
  _lootList = _lootList + [secondaryWeapon _unit, secondaryWeaponMagazine _unit] + (secondaryWeaponItems _unit);
  _lootList = _lootList + [handgunWeapon _unit] + (handgunItems _unit);

  _lootList;
};

loot_checkContainer = {
  private ["_container", "_lootList"];
  _container = _this select 0;
  _lootList = [];
  
  if (isNull _container) exitWith {
    [];
  };
  
  _lootList = _lootList + weaponCargo _container;
  _lootList = _lootList + itemCargo _container;
  _lootList = _lootList + backpackCargo _container;
  _lootList = _lootList + magazineCargo _container;
  
  {
    _lootList = _lootList + ([_x select 1] call loot_checkContainer);
  } forEach (everyContainer _container);
  
  _lootList;
};