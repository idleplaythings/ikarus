baseModule_weaponCache1_isPrimary = {false;};

baseModule_weaponCache1_numberOfSlots = {1;};

baseModule_weaponCache1_onCreated = {
  private ["_objects", "_box", "_weapons", "_weaponIndex"];
  _objects = _this select 0;
  _weaponIndex = 0;


  _weapons = [
    "hlc_rifle_rpk74n",
    "hlc_rifle_aks74",
    "hlc_rifle_ak74",
    "hlc_rifle_ak74",
    "hlc_rifle_ak74",
    "hlc_rifle_aks74"
  ];

  {
    if (typeOf _x == "Box_IND_Ammo_F") then {
      _box = _x;
      clearWeaponCargoGlobal _box;
      clearMagazineCargoGlobal _box;
      clearItemCargoGlobal _box;
      clearBackpackCargoGlobal _box;

      _box addMagazineCargoGlobal ['hlc_30Rnd_545x39_B_AK', 30];
      _box addMagazineCargoGlobal ['hlc_45Rnd_545x39_t_rpk', 5];

    };

    if (typeOf _x == "Sign_Arrow_Yellow_F") then {
      if (_weaponIndex < count _weapons) then {
        [_x, _weapons select _weaponIndex] call equipment_replaceObjectWithItem;
        _weaponIndex = _weaponIndex + 1;
      };
    };

  } forEach _objects;

};

baseModule_weaponCache1_onHideoutCreated = {};

baseModule_weaponCache1_data = {
  [
    ["Sign_Arrow_Yellow_F",69.9857,3.6,0.659546,0.866112,true],
    ["Sign_Arrow_Yellow_F",76.2493,3.41672,101.86,0.864698,true],
    ["Sign_Arrow_Yellow_F",78.0366,4.03845,94.386,0.86515,true],
    ["Sign_Arrow_Yellow_F",74.1891,2.99823,91.5637,0.863968,true],
    ["Sign_Arrow_Yellow_F",79.4464,4.44941,94.386,0.865292,true],
    ["Sign_Arrow_Yellow_F",77.6747,3.67877,94.386,0.864882,true],
    ["Land_PaperBox_open_empty_F",17.27,5.03966,174.498,4.00543e-005,true],
    ["Land_WoodenTable_large_F",78.2293,3.62136,90.713,0.000799179,true],
    ["Land_PaperBox_closed_F",33.0606,5.71261,47.9973,-5.72205e-006,true],
    ["Box_IND_Ammo_F",75.9967,2.18434,260.385,1.33514e-005,true],
    ["Land_ClutterCutter_large_F",41.7168,3.76578,359.999,0.00144958,true]
  ];
};