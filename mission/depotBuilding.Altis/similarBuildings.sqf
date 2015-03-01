similarBuildings_list = [

  //brown one story stone house with two rooms and two outer doors at the same side
  ["Land_i_Stone_HouseSmall_V1_F", "Land_i_Stone_HouseSmall_V1_dam_F", "Land_i_Stone_HouseSmall_V2_F", "Land_i_Stone_HouseSmall_V2_dam_F", "Land_i_Stone_HouseSmall_V3_F", "Land_i_Stone_HouseSmall_V3_dam_F"],
  
  //large two story building with porch and lot of windows
  ["Land_u_House_Big_01_V1_F", "Land_u_House_Big_01_V1_dam_F", "Land_i_House_Big_01_V3_F", "Land_i_House_Big_01_V3_dam_F", "Land_i_House_Big_01_V2_dam_F", "Land_i_House_Big_01_V2_F", "Land_i_House_Big_01_V1_dam_F", "Land_i_House_Big_01_V1_F"],
  
  
  //Medium two story house with balconies on both sides
  [
    "Land_u_House_Big_02_V1_F",
    "Land_u_House_Big_02_V1_dam_F",
    "Land_i_House_Big_02_V3_dam_F",
    "Land_i_House_Big_02_V3_F",
    "Land_i_House_Big_02_V2_dam_F",
    "Land_i_House_Big_02_V2_F",
    "Land_i_House_Big_02_V1_dam_F",
    "Land_i_House_Big_02_V1_F"
  ],

  //Big chapel
  [
    "Land_Chapel_V1_F",
    "Land_Chapel_V2_F"
  ],

  //Land shop
  [
    "Land_u_Shop_01_V1_F",
    "Land_u_Shop_01_V1_dam_F",
    "Land_i_Shop_01_V1_F",
    "Land_i_Shop_01_V1_dam_F",
    "Land_i_Shop_01_V2_F",
    "Land_i_Shop_01_V2_dam_F",
    "Land_i_Shop_01_V3_F",
    "Land_i_Shop_01_V3_dam_F"
  ]
];

similarBuildings_getSimilar = {
  private ["_type", "_list"];
  _type = _this select 0;
  _result = [_type];
  
  {
    if (_type in _x) exitWith {_result = _x};
  } forEach similarBuildings_list;
  
  _result;
}