
returnPlayersToWaitingArea = {
  private ["_trigger", "_unit", "_list"];
  
  _trigger = _this select 0;
  _list = playableUnits;
  
	{
    _unit = _x;
    
    if ! ( _unit in list _trigger) then {
      _unit setPos getPos _trigger;
    }
    
	} forEach _list;
};