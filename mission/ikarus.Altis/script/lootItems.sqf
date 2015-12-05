lootItems_populateSupplyBox = {
  private ["_container", "_lootFunction", "_arguments", "_extraLoot"];
  _container = _this select 0;
  _lootFunction = _this select 1;
  _extraLoot = _this select 2;

  _arguments = [_container];

  call compile format ["_arguments call %1;", _lootFunction];

  {
    [_x, _container] call lootItems_addItemToContainer;
  } forEach _extraLoot;
};

lootItems_addLootFromTable = {
  private ["_container", "_table"];
  _container = _this select 0;
  _table = _this select 1;

  {
    [_x select 0, _container, _x select 1, _x select 2] call lootItems_addRandomAmount;
  } forEach _table;
};

lootItems_populateSupplyIntelBox = {
  private ["_container"];
  _container = _this select 0;

  [_container, lootTable_supplyIntelBox] call lootItems_addLootFromTable;
};

lootItems_populateHoldAirdropBox = {
  private ["_container"];
  _container = _this select 0;

  [_container, lootTable_holdAirdrop] call lootItems_addLootFromTable;
};

lootItems_populateSupplyBoxLevel_0 = {
  //disabled for now
};

lootItems_populateSupplyBoxLevel_1 = {
  private ["_container"];
  _container = _this select 0;

  [_container, lootTable_advancedSupplyBox] call lootItems_addLootFromTable;
};

lootItems_populateSupplyBoxLevel_2 = {
  private ["_container"];
  _container = _this select 0;

  [_container, lootTable_advancedHoldBox] call lootItems_addLootFromTable;
};

lootItems_populateSupplyBoxLevel_3 = {
  private ["_container"];
  _container = _this select 0;

  [_container, lootTable_highEndWeapons] call lootItems_addLootFromTable;
};

lootItems_populateSupplyBoxLevel_4 = {
  private ["_container"];
  _container = _this select 0;

  [_container, lootTable_vehicleDepotBox] call lootItems_addLootFromTable;
};

lootItems_populateManhuntCache = {
  private ["_container"];
  _container = _this select 0;

  [_container, lootTable_signalCache] call lootItems_addLootFromTable;
};

lootItems_getRandomAmount = {
  private ["_random", "_add"];
  _random = _this select 0;
  _add = _this select 1;
  (ceil random _random) + _add;
};

lootItems_addRandomAmount = {
  private ["_class", "_container", "_random", "_add", "_amount", "_item"];
  _class = _this select 0;
  _container = _this select 1;
  _random = _this select 2;
  _add = _this select 3;

  
  _amount = [_random, _add] call lootItems_getRandomAmount;

  if (_amount <= 0) exitWith {};

  for "_i" from 1 to _amount do {
    _item = _class;
    if (typeName _item == "ARRAY") then {
      _item = _item call BIS_fnc_selectRandom;
    };
    [_item, _container] call lootItems_addItemToContainer;
  };
};

lootItems_addItemToContainer = {
  private ["_class", "_container", "_items"];
  _class = _this select 0;
  _container = _this select 1;

  _items = [_class] call lootItems_getItems;

  {
    [_x, _container] call equipment_addEquipment;
  } forEach _items;
};

lootItems_getItems = {
  private ["_class", "_result"];
  _class = _this select 0;
  _result = nil;

  {
    if ((_x select 0) == _class) exitWith {
      _result = (_x select 1) call BIS_fnc_selectRandom;
      if (typeName _result != "ARRAY") then {
        _result = [_result];
      }
    };
  } forEach lootTable_setDefinitions;

  if (isNil {_result}) exitWith {
    [_class];
  };

  _result;
};