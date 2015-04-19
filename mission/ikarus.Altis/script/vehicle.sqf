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
  private ["_vehicle"];
  _vehicle = _this select 0;

  _vehicle addEventHandler ["GetIn",  
    { 
      private ["_veh", "_unit", "_noGuardAllowed", "_objective"]; 
      _veh = _this select 0; 
      _unit = _this select 2;
      _noGuardAllowed = _veh getVariable ['noGuards', false];
      _objective = [_unit] call objectiveController_getUnitsObjective;  

      if (_objective == "guard" && _noGuardAllowed) then 
      { 
        _unit action ["Eject", vehicle _unit]; 
      }; 
  }]; 
};

