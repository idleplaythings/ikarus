satelliteUplink_consolesAndUavs = [];


satelliteUplink_create = {
  private ["_position", "_direction", "_console", "_uav", "_uavId"];
  _position = _this select 0;
  _direction = [_this, 1, 0] call BIS_fnc_param;
  _console =  [_this, 2, [_position, _direction] call satelliteUplink_createUplink] call BIS_fnc_param;

  _uav = [_position] call satelliteUplink_createUAV;

  uav = _uav;

  satelliteUplink_consolesAndUavs pushBack [_console, _uav];
  _uavId = count satelliteUplink_consolesAndUavs - 1;

  [[_console, _uav], "client_addDroneUplinkAction", true, true, true] call BIS_fnc_MP;

  [_console, _uav];
};

satelliteUplink_destroy = {
  private ["_console", "_uav"];
  _console = _this select 0;

  {
    if (_x select 0 == _console) exitWith {
      _uav = _x select 1;

      satelliteUplink_consolesAndUavs = satelliteUplink_consolesAndUavs - [_console, _uav];
      deleteVehicle _uav;
      [[_console], "client_removeDroneUplinkAction", true, true, true] call BIS_fnc_MP;
    }
  } forEach satelliteUplink_consolesAndUavs;
};

satelliteUplink_createUAV = {
  private ["_position", "_uavPosition", "_uav", "_waypoint"];
  _position = _this select 0;
  _uavPosition = [_position select 0, _position select 1, 500];

  _uav = createVehicle ['B_UAV_01_F', [0,0,3000], [], 0, "FLY"];
  createVehicleCrew _uav;
  _uav allowDamage false;
  _uav setPos _uavPosition;
  _uav lockDriver true;
  _uav setCaptive true;
  _uav disableAI "MOVE";
  _uav hideObjectGlobal true;
  _uav addeventhandler ["fuel", {(_this select 0) setfuel 1}];
  _uav disableTIEquipment true;
  
  _uav;
};

satelliteUplink_createUplink = {
  private ["_position", "_direction"];
  _position = _this select 0;
  _direction = _this select 1;

  _objects = [
    _position,
    _direction,
    call satelliteUplink_objectData
  ] call houseFurnisher_furnish_location;

  {
    if (typeOf _x == "Land_SatellitePhone_F") exitWith {
      _x;
    };
  } forEach _objects;
};

satelliteUplink_objectData = {
  [
    ["Land_CampingTable_small_F",0,0,0.834,0,false,true],
    ["Land_CampingChair_V1_F",0,0.3,0.018,0,false,true],
    ["Land_SatellitePhone_F",0,0,190,0.81064,false,true]
  ];
};