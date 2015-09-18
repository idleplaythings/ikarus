airStrike_planeCount = 0;

airStrike_createBombingRun = {
  private ["_target", "_plane", "_targeting"];
  _target = _this select 0;
  _plane = [_target] call airStrike_createPlane;

  private ["_distance"];
  _distance = 30000000;
  
  _targeting = false;
  waitUntil {
    private ["_newDistance", "_oldDistance"];
    _oldDistance = _distance;
    _newDistance = _plane distance _target;
    _distance = _newDistance;
    
    if (! _targeting && _distance < 3000 ) then {
      _targeting = true;
      _plane doTarget _target;
    };
    
    _newDistance < 1000 && _newDistance > _oldDistance;
  }; 
 
  sleep 1;
  [_target, random 50 + 10] call airStrike_createBomb;
  sleep 0.5;
  [_target, 0] call airStrike_createBomb;
  sleep 1;
  [_target, 0] call airStrike_createBomb;
};

airStrike_createBomb = {
  private ["_target", "_offset", "_direction", "_position"];
  _target = _this select 0;
  _offset = _this select 1;
  _direction = random 360;
  _position = if (typeName _target == "ARRAY") then {_target;} else {getPos _target;};
  _position set [2, ((_position select 2) + 10)];
  "Bomb_03_F" createVehicle ([_direction, _offset, _position] call getPositionInDirection);
};

airStrike_createFlyOver = {
  private ["_target", "_plane"];
  _target = _this select 0;
  _plane = [_target] call airStrike_createPlane;
};

airStrike_createFlyOverAndBombingRun = {
  private ["_target"];
  _target = _this select 0;
  [_target] call airStrike_createFlyOver;
  sleep 40 + random 20;
  [_target] call airStrike_createBombingRun;
}; 

airStrike_createPlane = {
  private ["_pilot", "_target", "_plane", "_targetPosition", "_start", "_offset"];
 
  _start = [30700, 11600, 200];
  _offset = (_start select 0) + airStrike_planeCount * 100;
  _start set [0, _offset];
  
  _target = _this select 0;
  _targetPosition = getPos _target;
  
  _plane = createVehicle ["O_Plane_CAS_02_F", _start, [], 0, "FLY"];
  createVehicleCrew _plane;

  _plane flyInHeight 200;
  
  _waypoint = group _plane addWaypoint [_targetPosition, 0];
  _waypoint setWaypointType "MOVE";
  _waypoint setWaypointBehaviour "COMBAT";
  _waypoint setWaypointCombatMode "BLUE";
  _waypoint setWaypointStatements ["true",""];
  _waypoint setWaypointSpeed "NO CHANGE"; 
 
  group _plane addWaypoint [[30700,0,200], 1];
  
  airStrike_planeCount = airStrike_planeCount + 1;
  _plane;
};