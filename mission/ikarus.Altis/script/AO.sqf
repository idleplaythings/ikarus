
AO_getRandomLandPosition = {
  private ["_position", "_i"];
  _position = nil;
  _i = 0;
  while {isNil {_position}} do {
    _position = call AO_getAreaCandidate;
    _i = _i + 1;
  };
  
  player globalChat "AO in " + str _i + " position: " + str _position;
  _position;
};

AO_getAreaCandidate = {
  private ["_position", "_bounds"];
  _bounds = [[5000, 7000], [27000, 23000]];
  _position = [
    random (((_bounds select 1 select 0) - (_bounds select 0 select 0)) + (_bounds select 0 select 0)),
    random (((_bounds select 1 select 1) - (_bounds select 0 select 1)) + (_bounds select 0 select 1))
  ];
  
  if ([_position] call AO_isValid) exitWith {_position};
  
  nil;
};

AO_isValid = {
  private ["_position"];
  _position = _this select 0;
  
  getTerrainHeightASL _position > 0;
};