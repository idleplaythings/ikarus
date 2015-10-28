clientUnmannedVehicles_controllableUvs = [];

clientUnmannedVehicles_checkUVs = {
  private ["_playerSquadId"];

  _playerSquadId = player getVariable ["playerSquadId", ""];
  if (_playerSquadId == "") exitWith {};

  {
    _x disableTIEquipment true;
    if (_playerSquadId == _x getVariable "squadId") then {
      if ! (_x in clientUnmannedVehicles_controllableUvs) then {
        [_x] call clientUnmannedVehicles_addControllableUv;
      };
    }
  } forEach allUnitsUAV;
};

clientUnmannedVehicles_addControllableUv = {
  private ["_uv", "_index"];
  _uv = _this select 0;
  _index = clientUnmannedVehicles_controllableUvs find _uv;

  if (_index != -1) exitWith {};

  clientUnmannedVehicles_controllableUvs pushBack _uv;
  player addAction [
    'Control ' +  getText (configFile >> "CfgVehicles" >> typeOf _uv >> "displayName"),
    {
      [_this select 3] call clientUnmannedVehicles_controlUv;
    },
    _uv
  ];
};

clientUnmannedVehicles_controlUv = {
  private ["_uv"];
  _uv = _this select 0;
  player action ["SwitchToUAVGunner", _uv];
};

_this spawn {
  while { true } do {

    sleep 10;
    call clientUnmannedVehicles_checkUVs;
  }
};