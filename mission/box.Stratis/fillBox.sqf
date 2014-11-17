private ["_box", "_weapons"];
_box = _this select 0;

clearWeaponCargoGlobal _box;
clearMagazineCargoGlobal _box;
clearItemCargoGlobal _box;
clearBackpackCargoGlobal _box;

_weapons = [] call compile preprocessFile "weapons.sqf";
//_weapons = ["arifle_Katiba_F", "arifle_Katiba_F", "arifle_Katiba_F", "arifle_Katiba_F"];
{
	_box addWeaponCargoGlobal [_x, 1];
} forEach _weapons;
