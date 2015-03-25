baseModule_medicalStation1_isPrimary = {false;};

baseModule_medicalStation1_onCreated = {
  private ["_objects", "_box", "_weapons", "_weaponIndex"];
  _objects = _this select 0;

  {
    if (typeOf _x == "AGM_Box_Medical") then {
      _box = _x;
      clearWeaponCargoGlobal _box;
      clearMagazineCargoGlobal _box;
      clearItemCargoGlobal _box;
      clearBackpackCargoGlobal _box;

      _box addItemCargoGlobal ['AGM_Epipen', 5];
      _box addItemCargoGlobal ['AGM_Bloodbag', 2];
      _box addAction ["Become medic", "[_this select 0, _this select 1] call baseModule_medicalStation1_becomeMedic;"];
    };
  } forEach _objects;

};

baseModule_medicalStation1_becomeMedic = {
  private ["_box", "_medic"];
  _box = _this select 0;
  _medic = _this select 1;

  _box removeAction 0;
  _medic setVariable ["AGM_IsMedic", true];
  ["You are now a medic!", _medic] call broadcastMessageTo;
};

baseModule_medicalStation1_data = {
  [
    ["Land_cargo_addon02_V2_F",50.9327,5.2872,182.882,0.000301361,true],
    ["Item_FirstAidKit",53.5914,6.16409,48,0.812958,true],
    ["Item_FirstAidKit",50.4628,6.3633,171.098,0.813015,true],
    ["Land_Sun_chair_green_F",33.3401,3.98218,357.847,0.0199432,true],
    ["Land_Sun_chair_green_F",51.1928,5.26012,182.341,0.0199585,true],
    ["Land_CampingTable_small_F",53.2484,6.48029,192.831,-3.8147e-006,true],
    ["Land_Bucket_clean_F",54.9,6.60054,46.7204,2.28882e-005,true],
    ["Land_Defibrillator_F",53.9429,6.68731,44.2365,0.8,true, true],
    ["Land_DisinfectantSpray_F",55.892,6.51483,186.738,0.8,true, true],
    ["Land_BottlePlastic_V2_F",32.6144,4.92858,49.5396,-5.14984e-005,true],
    ["AGM_Box_Medical",66.7862,6.49854,182.903,0,true],
    ["Land_ClutterCutter_large_F",52.5401,4.94716,0,0.00144005,true]
  ];
};