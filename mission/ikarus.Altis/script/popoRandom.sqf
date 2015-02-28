popoRandom_findLand = {
	private ["_position", "_x", "_y", "_minRange", "_maxRange", "_i", "_alpha", "_result"];
	_position = _this select 0;
	
	_minRange = _this select 1;
	_maxRange = _this select 2;

	_result = nil;

	_i = 1;

	while {_i < 20} do {

		_i = _i+1;
		_x = _position select 0;
		_y = _position select 1;
		_alpha = random 1 * 360;
		_x = _x + (cos _alpha * (random 1 * (_maxRange - _minRange) + _minRange));
		_y = _y + (sin _alpha * (random 1 * (_maxRange - _minRange) + _minRange));

		if (getTerrainHeightASL [_x, _y] > 0) exitWith {
			_result = [_x, _y];
		};
	};

	if (isNil {_result}) exitWith {
		[_position, [_minRange, _maxRange]] call SHK_pos;
	};

	_result;

};