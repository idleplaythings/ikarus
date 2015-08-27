baseModule_mortarpit_isPrimary = {false;};

baseModule_mortarpit_onCreated = {
  private ["_objects", "_box"];
  _objects = _this select 0;
  
  {
    if (typeOf _x == "Land_MetalCase_01_medium_F") then {
      _box = _x;
      clearWeaponCargoGlobal _box;
      clearMagazineCargoGlobal _box;
      clearItemCargoGlobal _box;
      clearBackpackCargoGlobal _box;

      _box addItemCargoGlobal ['ACE_DAGR', 1];
      _box addItemCargoGlobal ['ACE_RangeTable_82mm', 1];

    };
  } forEach _objects;
};

baseModule_mortarpit_onHideoutCreated = {};

baseModule_mortarpit_numberOfSlots = {1;};

baseModule_mortarpit_data = {
  [
    ["Land_ClutterCutter_medium_F",23.3324,8.79799,91.957,0,true,true],
    ["Land_BagFence_Round_F",32.6181,7.85663,326.773,0.00260162,true,true],
    ["Land_BagFence_Round_F",28.1821,10.1853,236.764,0.00260162,true,true],
    ["Land_Sack_F",37.8901,8.93463,343.798,0,true,true],
    ["B_Mortar_01_F",22.133,8.85496,186.45,0.0369396,true,false],
    ["Land_MetalCase_01_medium_F",32.0857,6.43207,275.147,0,true,false],
    ["Land_BagFence_Round_F",15.7068,9.64403,139.828,0.00260162,true,true],
    ["Land_WoodenBox_F",9.6502,9.30193,292.584,-5.72205e-006,true,true]
  ]
};

