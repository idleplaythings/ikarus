airdrop_heloCount = 0;

airdrop_drop = {
  private ["_box", "_class","_para"];
  _box = _this;
  detach _box;
  _class = "O_Parachute_02_F";
  _para = createVehicle [_class, [0,0,0], [], 0, "FLY"];
  _para setDir getDir _box;
  _para setPos getPos _box;
  _box attachTo [_para, [0,0,0]];
 
  [_box, _para] spawn airdrop_land;
};

airdrop_land = {
  private ["_box", "_para","_velocity","_time"];
  _box = _this select 0;
  _para = _this select 0;
  waitUntil {getPos _box select 2 < 4};
  _velocity = velocity _box;
  detach _box;
  _box setVelocity _velocity;

  detach _para;
  _para disableCollisionWith _box;
};

airdrop_create = {
  private ["_target", "_plane", "_targeting", "_lootFunction", "_box"];
  _target = _this select 0;
  _lootFunction = _this select 1;
  _plane = [_target] call airDrop_createHelo;

  private ["_distance"];
  _distance = 30000000;
  
  waitUntil {
    private ["_newDistance", "_oldDistance"];
    _oldDistance = _distance;
    _newDistance = _plane distance _target;
    _distance = _newDistance;

    _newDistance < 1000 && _newDistance > _oldDistance;
  }; 

  _box = [getPosASL _plane] call _lootFunction;
  _box enableSimulation true;

  _box call airdrop_drop;
};

airdrop_getStartPosition = {
  private ["_targetPosition", "_maxX", "_maxY"];
  _targetPosition = _this select 0;
  _yDistance = [_targetPosition] call airdrop_getDistanceToYMapEdge;
  _xDistance = [_targetPosition] call airdrop_getDistanceToXMapEdge;

  if (_yDistance select 0 < _xDistance select 0) then {
    if (_yDistance select 1 == "up") then {
      [_targetPosition select 0, 30000, 200];
    } else {
      [_targetPosition select 0, 0, 200];
    }
  } else {
    if (_xDistance select 1 == "right") then {
      [30000, _targetPosition select 1, 200];
    } else {
      [0, _targetPosition select 1, 200];
    }
  }
};

airdrop_getDistanceToYMapEdge = {
  private ["_targetPosition", "_y"];
  _targetPosition = _this select 0;
  _y = _targetPosition select 1;

  if (30000 - _y < _y ) exitWith {[30000 - _y, "up"]};

  [_y, "down"];
};

airdrop_getDistanceToXMapEdge = {
  private ["_targetPosition", "_x1"];
  _targetPosition = _this select 0;
  _x1 = _targetPosition select 0;

  if (30000 - _x1 < _x1 ) exitWith {[30000 - _x1, 'right']};

  [_x1, 'left'];
};

airDrop_createHelo = {
  private ["_pilot", "_helo", "_targetPosition", "_start", "_offset"];
  _targetPosition = _this select 0;
  
  _start = [_targetPosition] call airdrop_getStartPosition;
  systemChat str _start;
  _offset = (_start select 0) + airdrop_heloCount * 100;
  _start set [0, _offset];
  
  _helo = createVehicle ["O_Heli_Transport_04_F", _start, [], 0, "FLY"];
  createVehicleCrew _helo;

  _helo flyInHeight 200;
  
  _waypoint = group _helo addWaypoint [_targetPosition, 0];
  _waypoint setWaypointType "MOVE";
  _waypoint setWaypointBehaviour "CARELESS";
  _waypoint setWaypointCombatMode "BLUE";
  _waypoint setWaypointStatements ["true",""];
  _waypoint setWaypointSpeed "NO CHANGE"; 
 
  group _helo addWaypoint [[30700,0,200], 1];
  
  airdrop_heloCount = airdrop_heloCount + 1;
  _helo;
};