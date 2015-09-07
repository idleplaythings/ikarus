unmannedVehicle_checkAllControllability = {
	{
    [_x] call unmannedVehicle_checkControllability;
  } forEach allUnitsUAV;
};

unmannedVehicle_checkControllability = {
  private ["_vehicle"];
  _vehicle = _this select 0;
  _vehicle disableTIEquipment true;
  /*
  {
    if ([_vehicle, _x] call unmannedVehicle_canConnectTo) then {
      [_vehicle, _x] call unmannedVehicle_enableConnection;
    } else {
      [_vehicle, _x] call unmannedVehicle_disableConnection;
    };
  } forEach (call getAllPlayers);
  */
};

unmannedVehicle_canConnectTo = {
  private ["_vehicle", "_unit"];
  _vehicle = _this select 0;
  _unit = _this select 1;

  if (_unit in UAVControl _vehicle) exitWith {
    systemChat "controlling";
    true;
  };

  if (_unit distance _vehicle < 5 && ! isUAVConnected _vehicle) exitWith {
    systemChat "close and free";
    true;
  };

  false;
};

unmannedVehicle_disableConnection = {
  private ["_vehicle", "_unit"];
  _vehicle = _this select 0;
  _unit = _this select 1;

  _unit disableUAVConnectability [_vehicle, true];
};

unmannedVehicle_enableConnection = {
  private ["_vehicle", "_unit"];
  _vehicle = _this select 0;
  _unit = _this select 1;

  _unit enableUAVConnectability [_vehicle, true];
};

_this spawn {
  while { true } do {

    sleep 1;
    call unmannedVehicle_checkAllControllability;
  }
};

/*
findCurrentDisplay = {
  
  for "_i" from 0 to 1000 do {
    private ["_display"];
    _display = findDisplay _i;

    if ! (isNull _display) then {
      systemChat ("display " + (str _i) + " is " + (str _display));
    };
  };

};
*/