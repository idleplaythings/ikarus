satelliteUplink_consolesAndUavs = [];


satelliteUplink_create = {
	private ["_position", "_direction", "_console", "_uav", "_uavId"];
	_position = _this select 0;
	_direction = [_this, 1, 0] call BIS_fnc_param;

	_uav = [_position] call satelliteUplink_createUAV;
	_console = [_position, _direction] call satelliteUplink_createUplink;

	uav = _uav;

	satelliteUplink_consolesAndUavs pushBack [_console, _uav];
	_uavId = count satelliteUplink_consolesAndUavs - 1;

  [[_console, _uav], "client_addDroneUplinkAction", true, true, true] call BIS_fnc_MP;

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
    ATLToASL _position,
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

[] spawn {
	waitUntil {
	  sleep 10;
	  call missionControl_getElapsedTime > (60 * 40);
	};

	[[], "client_enableDepotDrones", true, true, true] call BIS_fnc_MP;

};