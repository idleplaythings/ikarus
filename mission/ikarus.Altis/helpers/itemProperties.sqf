itemProperties_crawl = {
  _weapons = "('Rifle' in ([_x, true ] call BIS_fnc_returnParents))" configClasses (configFile >> "CfgWeapons"); 
  _data = "weaponProperties = {";

  {
    _data = _data + ([_x] call itemProperties_inspectWeapon);
  } forEach _weapons;

  _data = _data + "};\n\n\n";

  _magazines = "('CA_Magazine' in ([_x, true ] call BIS_fnc_returnParents))" configClasses (configFile >> "CfgMagazines"); 
  _data = _data + "magazineProperties = {";

  {
    _data = _data + ([_x] call itemProperties_inspectMagazine);
  } forEach _magazines;

  _data = _data + "};\n\n\n";

  _ammo = "('BulletBase' in ([_x, true ] call BIS_fnc_returnParents))" configClasses (configFile >> "CfgAmmo"); 
  _data = _data + "ammoProperties = {";

  {
    _data = _data + ([_x] call itemProperties_inspectAmmo);
  } forEach _ammo;

  _data = _data + "};\n\n\n";


  copyToClipboard str _data;
};

itemProperties_inspectWeapon = {
  private ["_weapon", "_dispersion", "_recoil", "_initSpeed", "_dexterity", "_inertia", "_magazines", "_mass"];
  _weapon = _this select 0;
  _dispersion = 0;
  _recoil = '';
  _initSpeed = getNumber (_weapon >> 'initSpeed');
  _dexterity = getNumber (_weapon >> 'dexterity');
  _inertia = getNumber (_weapon >> 'inertia');
  _magazines = getArray (_weapon >> 'magazines');
  _mass = 0;

  {
    if (configName _x == "Single" || configName _x == "FullAuto" || configName _x == "Burst" || configName _x == "manual" ) then {
      if (_dispersion == 0) then {
        _dispersion = getNumber (_x >> "dispersion");
      };

      if (_recoil == '') then {
        _recoil = getText (_x >> "recoil");
      };
    };

    if (configName _x == "WeaponSlotsInfo" ) then {
      _mass = getNumber (_x >> 'mass');
    };

  } forEach ([_weapon, 1, true, true ] call BIS_fnc_returnChildren);

  "'" + configName _weapon + "': {"
    + " dispersion: " + str _dispersion + ","
    + " recoil: '" + _recoil + "',"
    + " initSpeed: " + str _initSpeed + ","
    + " dexterity: " + str _dexterity + ","
    + " inertia: " + str _inertia + ","
    + " magazines: " + str _magazines + ","
    + " mass: " + str _mass
  + "},\n";  
};


itemProperties_inspectMagazine = {
  private ["_magazine", "_ammo", "_count", "_initSpeed", "_mass"];
  _magazine = _this select 0;
  _ammo = getText (_magazine >> 'ammo');
  _count = getNumber (_magazine >> 'count');
  _initSpeed = getNumber (_magazine >> 'initSpeed');
  _mass = getNumber (_magazine >> 'mass');;

  "'" + configName _magazine + "': {"
    + " ammo: " + str _ammo + ","
    + " count: '" + str _count + "'," 
    + " initSpeed: " + str _initSpeed + ","
    + " mass: " + str _mass
  + "},\n";  
};

itemProperties_inspectAmmo = {
  private ["_ammo", "_hit"];
  _ammo = _this select 0;
  _hit = getNumber (_ammo >> 'hit');

  "'" + configName _ammo + "': {"
    + " hit: " + str _hit
  + "},\n";  
};

