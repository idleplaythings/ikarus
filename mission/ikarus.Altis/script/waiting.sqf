
returnPlayersToWaitingArea = {
  private ["_trigger", "_unit"];
  
  if (missionControl_gameStarted) exitWith {};
  
  _trigger = _this select 0;
 
  {
    _unit = _x;
    
    if ! ( _unit in list _trigger) then {
      _unit setPos getPos _trigger;
    }
    
  } forEach call getAllPlayersBeforeSquads;
};