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
  private ["_target", "_plane", "_targeting", "_loot", "_box"];
  _target = _this select 0;
  _loot = _this select 1;
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

  _box = createVehicle ["IG_supplyCrate_F", getPos _plane, [], 0, "FLYING"];

  clearWeaponCargoGlobal _box;
  clearMagazineCargoGlobal _box;
  clearItemCargoGlobal _box;
  clearBackpackCargoGlobal _box;

  {
    _box addBackpackCargoGlobal [_x, 1];
  } forEach _loot;

  _box call airdrop_drop;
  
};

airDrop_createHelo = {
  private ["_pilot", "_helo", "_targetPosition", "_start", "_offset"];
 
  _start = [30700, 11600, 200];
  _offset = (_start select 0) + airdrop_heloCount * 100;
  _start set [0, _offset];
  
  _targetPosition = _this select 0;
  
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