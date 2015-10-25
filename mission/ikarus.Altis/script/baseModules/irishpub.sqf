baseModule_irishpub_isPrimary = {false;};

baseModule_irishpub_joinInProgress = {};

baseModule_irishpub_onCreated = {
  private ["_objects", "_box"];
  _objects = _this select 0;

  {
    if (typeOf _x == "Sign_Arrow_Cyan_F") then {
      _box = createVehicle ["Box_NATO_Ammo_F", getPos _x, [], 0, "CAN_COLLIDE"];
      _box allowDamage false;
      _box setDir getDir _x;
      _box setPosASL getPosASL _x;

      clearWeaponCargoGlobal _box;
      clearMagazineCargoGlobal _box;
      clearItemCargoGlobal _box;
      clearBackpackCargoGlobal _box;

      _box addMagazineCargoGlobal ['CUP_30Rnd_545x39_AK_M', 30];

      deleteVehicle _x;
    };

    if (typeOf _x == "Sign_Arrow_Pink_F") then {
      [_x, "CUP_arifle_AK74"] call equipment_replaceObjectWithItem;
    };

  } forEach _objects;
};

baseModule_irishpub_onHideoutCreated = {};

baseModule_irishpub_numberOfSlots = {1;};

baseModule_irishpub_data = {
  [
    ["Land_Sunshade_F",21.3559,5.70111,2.6593,0,true,true],
    ["Land_StallWater_F",73.3134,7.63765,91.334,0,true,true],
    ["Land_TablePlastic_01_F",21.9626,5.69086,2.6593,0,true,true],
    ["Land_Sacks_heap_F",54.0336,7.15389,91.334,0,true,true],
    ["Land_ChairPlastic_F",8.70203,6.43586,46.8512,0,true,true],
    ["Land_ChairPlastic_F",24.7656,4.71331,266.851,0,true,true],
    ["Land_ChairPlastic_F",22.3867,6.8358,126.851,0,true,true],
    ["Land_FoodContainer_01_F",11.0632,5.51875,91.334,0,true,true],
    ["Land_BottlePlastic_V1_F",23.2589,5.73545,91.334,0.87949,true,true],
    ["Land_Ketchup_01_F",20.2716,5.70053,91.334,0.866394,true,true],
    ["Land_Mustard_01_F",21.187,5.65049,91.334,0.866394,true,true],
    ["Land_Can_Dented_F",18.7351,5.11807,57.0537,0.874182,true,true],
    ["Land_Can_V2_F",18.5396,5.75824,57.0537,0.879629,true,true],
    ["Land_Can_V1_F",27.1962,6.18655,57.0537,0.879629,true,true],
    ["Land_Can_Rusty_F",17.1617,5.81422,57.0537,0,true,true],
    ["Land_Slum_House02_F",27.7598,11.7146,272.407,0,true,true],
    ["Land_FuelStation_Build_F",53.2782,10.3397,91.334,0,true,true],
    ["Land_WoodenTable_large_F",25.3347,14.4806,91.334,0.0749149,true,true],
    ["Land_BarrelWater_F",24.4514,10.1585,97.054,0,true,true],
    ["Sign_Arrow_Pink_F",26.3875,14.5188,91.334,0.904175,true,true],
    ["Sign_Arrow_Pink_F",28.2093,14.7096,91.334,0.904175,true,true],
    ["Sign_Arrow_Pink_F",22.8545,14.1387,91.334,0.904175,true,true],
    ["Sign_Arrow_Cyan_F",13.6193,12.8977,91.334,0,true,true],
    ["Sign_Arrow_Pink_F",24.5723,14.2999,91.334,0.904175,true,true],
    ["Land_Bucket_F",19.9216,9.95485,57.0537,0,true,true]
  ];
};
