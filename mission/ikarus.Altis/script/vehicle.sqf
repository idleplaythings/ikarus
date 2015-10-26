vehicle_uav = nil;

vehicle_setOwner = {
  private ["_vehicle", "_squad"];
  _vehicle = _this select 0;
  _squad = _this select 1;
  _vehicle setVariable ["squadId", ([_squad] call getSquadId), true];
};

vehicle_spawnVehicle = {
  private ["_vehicleClass", "_position", "_direction", "_vehicle"];
  _vehicleClass = _this select 0;
  _position = _this select 1;
  _direction = _this select 2;

  if (_position select 2 < 0) then {
    _position set [2, 0];
  };
  
  _vehicle = createVehicle [_vehicleClass, [0,0,3000], [], 0, "CAN_COLLIDE"];
  _vehicle allowDamage false;
  _vehicle setPos _position;
  _vehicle setDir _direction;

  clearWeaponCargoGlobal _vehicle;
  clearMagazineCargoGlobal _vehicle;
  clearItemCargoGlobal _vehicle;
  clearBackpackCargoGlobal _vehicle;

  _vehicle setVehicleAmmo 0;
  _vehicle disableTIEquipment true;

  if (_vehicleClass == "B_UGV_01_F") then {
    createVehicleCrew _vehicle;
    vehicle_uav = _vehicle;
  };

  [_vehicle] spawn {
    sleep 10;
    _this select 0 allowDamage true;
  };

  _vehicle;
};

vehicle_getAmountOfAliveCrew = {
  private ["_vehicle", "_aliveCrew"];
  _vehicle = _this select 0;

  _aliveCrew = [crew _vehicle, {
    private ["_unit"];
    _unit = _this;
    alive _unit;
  }] call AEX_filter;

  count _aliveCrew;
};

vehicle_preventUseBeforeObjectives = {
  private ["_vehicle"];
  _vehicle = _this select 0;

  _vehicle addEventHandler ["GetIn",  
    { 
      private ["_veh", "_unit"]; 
      _veh = _this select 0; 
      _unit = _this select 2;
     
      if (! missionControl_objectivesGenerated) then 
      { 
        _unit action ["Eject", vehicle _unit]; 
      }; 
  }]; 
};

vehicle_preventGuardUse = {
  /* disabled for now
  private ["_vehicle"];
  _vehicle = _this select 0;
  _vehicle setVariable ['noGuards', true];

  _vehicle addEventHandler ["GetIn",  
    { 
      private ["_veh", "_unit", "_noGuardAllowed", "_objective"]; 
      _veh = _this select 0; 
      _unit = _this select 2;
      _noGuardAllowed = _veh getVariable ['noGuards', false];
      _objective = [_unit] call objectiveController_getUnitsObjective;  

      if (_objective == "guard" && _noGuardAllowed) then 
      {
        ["Guards are not allowed to operate this vehicle", _unit] call broadcastMessageTo;
        _unit action ["Eject", vehicle _unit]; 
      }; 
  }];
  */
};

vehicle_needsKey = {
  private ["_vehicle"];
  _vehicle = _this select 0;
  _vehicle setVariable ['needsKey', true];

  _vehicle addEventHandler ["GetIn",  
    { 
      private ["_veh", "_unit", "_needsKey", "_hasKey", "_objective"]; 
      _veh = _this select 0; 
      _unit = _this select 2;
      _needsKey = _veh getVariable ['needsKey', false];
      _hasKey = [_unit, 'IKRS_vehicle_key'] call equipment_unitHasItem;

      if (_needsKey && ! _hasKey) exitWith {
        ["This vehicle needs a key to operate", _unit] call broadcastMessageTo;
        _unit action ["Eject", vehicle _unit];
        _unit action ["GetOut", vehicle _unit]; 
      };

      if (_needsKey && _hasKey) exitWith {
        ["Vehicle has been unlocked", _unit] call broadcastMessageTo;
        [_unit, 'IKRS_vehicle_key'] call equipment_removeItemFromUnit;
        _veh setVariable ['needsKey', false, true];
      };
  }]; 
};

