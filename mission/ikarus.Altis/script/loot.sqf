loot_findSquadLoot = {
  private ["_squad", "_lootList"];
  _squad = _this select 0;
  _lootList = [_squad] call loot_findLootInHideout;

  {
    _lootList = _lootList + ([_squad, _x] call loot_findLootInOutpost);
  } forEach ([_squad] call outpost_getOutpostsForSquad);

  _lootList;
};

loot_findLootInOutpost = {
  private ["_squad", "_lootList", "_outpost"];
  _squad = _this select 0;
  _outpost = _this select 1;
  _lootList = [];

  if (! (_outpost select 4)) exitWith {_lootList;};

  _lootList = _lootList + ([_outpost select 1] call loot_checkSupplies);
  
  _lootList;
};

loot_findLootInHideout = {
  private ["_squad", "_lootList", "_hideoutPosition"];
  _squad = _this select 0;
  _lootList = [];

  _hideoutPosition = [_squad] call hideout_getHideoutForSquad select 1;
  _lootList = _lootList + ([_hideoutPosition] call loot_checkSupplies);
  
  _lootList;
};

loot_checkSupplies = {
  private ["_hideoutPosition", "_lootList", "_objects"];
  _hideoutPosition = _this select 0;
  _lootList = [];
  _hideoutPosition set [2, 0];
  _objects = _hideoutPosition nearSupplies hideout_hideoutRadius;

  {
    _lootList = _lootList + ([_x] call loot_checkObject);
  } forEach _objects;
  
  _lootList;
};

loot_checkObject = {
  private ["_object", "_lootList"];
  _object = _this select 0;
  _lootList = [];

  if (isAgent teamMember _object) exitWith {
    [];
  };

  if ( _object isKindOf "car" or _object isKindOf "Helicopter" ) then {
    if (simulationEnabled _object) then {
      _lootList = _lootList + [typeOf _object];
    };
  };
  
  if (_object isKindOf "man") then {
    _lootList = _lootList + ([_object] call loot_checkUnit);
  } else {
    _lootList = _lootList + ([_object] call loot_checkContainer);
  };

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
  _lootList = _lootList + [vest _unit, backpack _unit, uniform _unit, headgear _unit];
  
  _lootList = _lootList + [primaryWeapon _unit] + (primaryWeaponItems _unit) + primaryWeaponMagazine _unit;
  _lootList = _lootList + [secondaryWeapon _unit] + (secondaryWeaponItems _unit) +  secondaryWeaponMagazine _unit;
  _lootList = _lootList + [handgunWeapon _unit] + (handgunItems _unit);


  _lootList;
};

loot_checkContainer = {
  private ["_container", "_lootList"];
  _container = _this select 0;
  _lootList = [];
  
  if (isNull _container || isNil {_container}) exitWith {
    [];
  };
  
  if ( ! isNil { weaponCargo _container}) then { _lootList = _lootList + weaponCargo _container; };
  if ( ! isNil { itemCargo _container}) then { _lootList = _lootList + itemCargo _container; };
  if ( ! isNil { backpackCargo _container}) then { _lootList = _lootList + backpackCargo _container; };
  if ( ! isNil { magazineCargo _container}) then { _lootList = _lootList + magazineCargo _container; };
  
  {
    _lootList = _lootList + ([_x select 1] call loot_checkContainer);
  } forEach (everyContainer _container);
  

  _lootList;
};

