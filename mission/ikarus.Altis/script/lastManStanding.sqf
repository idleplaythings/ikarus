lastManStanding_amountOfPlayers = 0;

lastManStanding_check = {
	private ["_amount"];
	_amount = count (call getAllPlayers);

	if (_amount == lastManStanding_amountOfPlayers) exitWith {};

	lastManStanding_amountOfPlayers = _amount;
	
	if (_amount == 1) then {
		{
	    [[], "markers_addLastManStanding", _x, false, true] call BIS_fnc_MP;
	  } forEach (call getAllPlayers);
	} else {
		{
	    [[], "markers_removeLastManStanding", _x, false, true] call BIS_fnc_MP;
	  } forEach (call getAllPlayers);
	};
	
};

_this spawn {
  while { true } do {

    sleep 10;
    call lastManStanding_check;
  }
};