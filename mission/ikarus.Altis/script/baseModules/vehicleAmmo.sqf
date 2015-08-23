baseModule_vehicleAmmo_isPrimary = {false;};

baseModule_vehicleAmmo_onCreated = {};

baseModule_vehicleAmmo_onHideoutCreated = {
  private ["_hideoutData", "_position"];
  _hideoutData = _this select 0;
  _position = _hideoutData select 1;

  {
    if ( _x isKindOf "car" or _x isKindOf "Helicopter" ) then {
      if (simulationEnabled _x) then {
        _x setVehicleAmmoDef 1;
      };
    };
  } forEach (ASLToATL _position nearSupplies 20);

};

baseModule_vehicleAmmo_numberOfSlots = {1;};

baseModule_vehicleAmmo_data = {
  [
    ["Land_Cargo20_military_green_F",38.4992,5.73293,182.28,0,true, true],
    ["Land_PierLadder_F",57.8696,5.01365,3.11304,-0.111952,true, true],
    ["Land_Cargo10_grey_F",42.0089,2.93792,182.28,0,true, true],
    ["Land_WaterTank_F",28.7763,2.46767,92.7599,2.6538,true, true],
    ["IKRS_Land_CargoBox_1",68.2979,6.24108,182.28,0,true, true],
    ["IKRS_Land_CargoBox_1",17.8351,4.84112,172.558,2.63789,true, true],
    ["CargoNet_01_barrels_F",50.376,7.46736,92.7599,2.59302,true, true],
    ["Land_GasTank_02_F",77.4177,5.49347,92.7599,0,true, true],
    ["Land_MetalBarrel_F",68.9744,7.45071,343.113,0,true, true],
    ["Land_MetalBarrel_F",60.7469,7.95785,343.113,0,true, true],
    ["Land_MetalBarrel_F",57.069,8.41971,223.113,0,true, true]
  ]
};