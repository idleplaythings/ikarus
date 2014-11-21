
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

findHouseSuitableForHideout = {
  private ["_position", "_buildings", "_building", "_found"];
  _position = _this select 0;
  _building = nil;
  _found = false;
  
  _buildings = nearestObjects [_position, ["house"], 5000];
  
  for [{_i= 0},{_i < count _buildings and ! false},{_i = _i + 1}] do {
    _building = _buildings select _i;
    
    if ( [_building] call checkIsSuitableHouseForHideout) exitWith {
      _building;
    };
  };
  
  _building;
};

checkIsSuitableHouseForHideout = {
  private ["_building", "_vehiclePos"];
  _building = _this select 0;
  
  if (! (typeOf _building in hideoutClasses)) exitWith {false};
  
  _vehiclePos = getPos _building findEmptyPosition [2,10,"I_Truck_02_covered_F"];
  if (count _vehiclePos == 0) exitWith {false};
  
  true;
};