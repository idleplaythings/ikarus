baseModule_uavModule1_isPrimary = {true;};

baseModule_uavModule1_onCreated = {
  private ["_objects", "_box"];
  _objects = _this select 0;
  
  {
    if (typeOf _x == "Box_IND_Ammo_F") then {
      _box = _x;
      clearWeaponCargoGlobal _box;
      clearMagazineCargoGlobal _box;
      clearItemCargoGlobal _box;
      clearBackpackCargoGlobal _box;

      //_box addItemCargoGlobal ['B_UavTerminal', 1];

    };
  } forEach _objects;
};

baseModule_uavModule1_joinInProgress = {};

baseModule_uavModule1_onHideoutCreated = {
  
};

baseModule_uavModule1_numberOfSlots = {1;};

baseModule_uavModule1_data = {
	[
		["Land_Portable_generator_F",67.9245,4.90668,93.8077,0,true,true],
    ["Land_ToolTrolley_01_F",36.244,5.91536,93.8077,0,true,true],
    ["Land_WeldingTrolley_01_F",26.328,5.51888,93.8077,0,true,true],
    ["Land_Workbench_01_F",51.1339,5.82536,93.8077,0,true,true],
    ["RoadBarrier_F",23.8577,3.69055,93.8077,0,true,true],
    ["Land_MultiMeter_F",60.0315,5.14679,65.7774,0.808081,true,true],
    ["Land_Pliers_F",54.8009,5.7439,133.959,0.822392,true,true],
    ["Land_Laptop_unfolded_F",49.36,5.85324,263.883,0.817339,true,true],
    ["Land_CampingChair_V1_F",45.6161,5.24428,263.883,0,true,true],
    ["Box_IND_Ammo_F",34.6307,4.29976,52.2722,3.24249e-005,true,false]
  ];
};