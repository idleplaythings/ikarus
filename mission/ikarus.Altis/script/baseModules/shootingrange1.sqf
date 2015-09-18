baseModule_shootingrange1_isPrimary = {false;};

baseModule_shootingrange1_joinInProgress = {};

baseModule_shootingrange1_onCreated = {
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

      _box addMagazineCargoGlobal ['CUP_10x_303_M', 20];
      _box addWeaponCargoGlobal ['CUP_srifle_LeeEnfield_rail', 3];

      deleteVehicle _x;
    };

    if (typeOf _x == "Sign_Arrow_Green_F") then {
      [_x, "CUP_srifle_LeeEnfield_rail"] call equipment_replaceObjectWithItem;
    };

  } forEach _objects;
};

baseModule_shootingrange1_onHideoutCreated = {};

baseModule_shootingrange1_numberOfSlots = {1;};

baseModule_shootingrange1_data = {
  [
    ["ShootingPos_F",28.6656,4.99664,4.5159,0.0319862,true,true],
    ["ShootingPos_F",58.9522,7.79232,4.5159,0.0319862,true,true],
    ["Land_CampingTable_F",61.2997,3.57438,93.834,0,true,true],
    ["Land_CampingTable_small_F",61.8584,4.50114,93.834,0,true,true],
    ["Land_Ground_sheet_khaki_F",61.0869,3.5452,183.834,0.800266,true,true],
    ["Land_CampingChair_V1_F",74.5528,4.08519,171.018,0,true,true],
    ["Sign_Arrow_Cyan_F",68.3178,5.14117,4.2002,0,true,true],
    ["Sign_Arrow_Green_F",64.5433,3.47082,276,0.806398,true,true],
    //["Sign_Arrow_Blue_F",64.277,4.26469,5.77859,0.797569,true,true],
    ["Land_Ammobox_rounds_F",57.8495,4.41864,278.594,0.814619,true,true],
    ["Land_Ammobox_rounds_F",59.8899,4.65455,256.498,0.814619,true,true],
    ["Land_SurvivalRadio_F",61.0701,4.88836,261.801,0.782829,true,true],
    ["Land_Magazine_rifle_F",67.4183,4.57053,318.872,0.81064,true,true],
    ["Land_Magazine_rifle_F",65.9666,4.57156,256.498,0.81064,true,true]
  ];
};
