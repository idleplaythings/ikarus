
findGarage = {
  hint "find garages";
  private ["_garageClasses", "_list", "_garages", "_vehicle", "_dir"];
  _garageClasses = ["Land_i_Garage_V1_F", "Land_i_Garage_V1_dam_F", "Land_i_Garage_V2_F", "Land_i_Garage_V2_dam_F"];
  
  _list = getPos player nearObjects ["House",50];
  _garages = [];
  
  {
    if ( typeOf _x in _garageClasses ) then {
      player globalChat format ["%1 %2 %3", typeOf _x, direction _x,  str getPos _x];
      _vehicle = createVehicle ["C_Hatchback_01_F", getPos _x, [], 0, "CAN_COLLIDE"];
      _dir = direction _x;
      _vehicle setDir _dir;
    };
  } forEach _list;
};