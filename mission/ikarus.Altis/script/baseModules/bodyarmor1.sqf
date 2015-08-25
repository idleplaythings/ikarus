baseModule_bodyarmor1_isPrimary = {false;};

baseModule_bodyarmor1_onCreated = {
  private ["_objects", "_box"];
  _objects = _this select 0;

  {
    if (typeOf _x == "Sign_Arrow_Pink_F") then {
      _box = createVehicle ["Box_NATO_Ammo_F", getPos _x, [], 0, "CAN_COLLIDE"];
      _box allowDamage false;
      _box setDir getDir _x;
      _box setPosASL getPosASL _x;

      clearWeaponCargoGlobal _box;
      clearMagazineCargoGlobal _box;
      clearItemCargoGlobal _box;
      clearBackpackCargoGlobal _box;

      _box addItemCargoGlobal ['V_PlateCarrierIA2_dgtl', 2];
      _box addItemCargoGlobal ['V_PlateCarrier2_rgr', 2];
      _box addItemCargoGlobal ['H_HelmetIA', 4];

      deleteVehicle _x;
    };

    if (typeOf _x == "Sign_Arrow_Green_F") then {
      [_x, "H_HelmetIA"] call equipment_replaceObjectWithItem;
    };

  } forEach _objects;
};

baseModule_bodyarmor1_onHideoutCreated = {};

baseModule_bodyarmor1_numberOfSlots = {1;};

baseModule_bodyarmor1_data = {
  [
    ["Land_cargo_addon02_V1_F",43.5005,6.1743,3,0,true,true],
    ["Land_Cargo20_grey_F",30.9175,8.94952,3,0,true,true],
    ["Land_PaperBox_open_full_F",38.8748,4.55669,1.99,0,true,true],
    ["Land_WoodenTable_large_F",27.7687,6.00943,1.99,0,true,true],
    ["Land_Bench_F",44.7573,7.45823,356.056,0,true,true],
    ["Land_Bench_F",53.3641,8.62861,3,0,true,true],
    ["Land_Metal_rack_Tall_F",31.7262,7.39492,1.99,0,true,true],
    ["Sign_Arrow_Green_F",33.1359,7.49191,1.99,1.20557,true,true],
    ["Sign_Arrow_Green_F",30.2664,7.3164,1.99,0.828831,true,true],
    ["Sign_Arrow_Green_F",33.0261,7.46844,1.99,0.828831,true,true],
    ["Sign_Arrow_Pink_F",28.8747,6.07455,1.99,0.828827,true,true],
    ["Sign_Arrow_Green_F",30.3907,7.30828,1.99,1.20557,true,true],
    ["Land_Suitcase_F",33.9139,5.44095,357.066,0.842129,true,true],
    ["Land_CanisterFuel_F",53.202,6.72104,345.702,0,true,true]
  ];
};
