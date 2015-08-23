baseModule_createBaseModules = {
  private ["_modules", "_position", "_direction", "_data", "_index"];
  _modules = _this select 0;  
  _position = _this select 1;
  _direction = _this select 2;
  _index = 0;

  _data = [];

  {
    private ["_slots"];
    _slots = [_x] call baseModule_getNumberSlots;
    _index = [_modules, _x] call baseModule_getModuleIndex;
    _direction = [_modules, _x] call baseModule_getModuleRotation;
    _data pushBack ([_position, _direction, _index, _x] call baseModule_create);
  } forEach _modules;

  _data;
};

baseModule_getModuleIndex = {
  private ["_modules", "_index", "_slots", "_index"];
  _modules = _this select 0;
  _moduleName = _this select 1;
  _index = 0;

  {
    if (_x == _moduleName) exitWith {};
    _slots = [_x] call baseModule_getNumberSlots;
    _index = _index + _slots;
  } forEach _modules;

  _index;
};

baseModule_getModuleRotation = {
  private ["_modules", "_moduleName", "_slots", "_direction"];
  _modules = _this select 0;
  _moduleName = _this select 1;
  _direction = 0;

  {
    if (_x == _moduleName) exitWith {};
    _slots = [_x] call baseModule_getNumberSlots;
    _direction = [_direction, 90 * _slots] call addToDirection;
  } forEach _modules;

  _direction;
};

baseModule_create = {
  private ["_position", "_direction", "_name", "_index", "_data", "_objects"];
  _position = _this select 0;
  _direction = _this select 1;
  _index = _this select 2;
  _name = _this select 3;
  _data = [_name, 'data', []] call baseModule_callModule;

  _objects = [_position, _direction, _data] call houseFurnisher_furnish_location;
  [_name, 'onCreated', [_objects]] call baseModule_callModule;
  [_name, _data, _objects];
};

baseModule_getCacheLocation = {
  private ["_placeholders", "_result"];
  _this pushBack "Land_CargoBox_V1_F";
  _placeholders = _this call baseModule_getPlaceholders;
  _result = nil;

  {
    if (isNil{_result}) then {
      _result = _x;
    } else {
      private ["_z1", "_z2"];
      _z1 = _result select 0 select 2;
      _z2 = _x select 0 select 2;
      if (_z1 < _z2) then {
        _result = _x;
      };
    };
  } forEach _placeholders;

  _result;
};

baseModule_getVehicleLocations = {
  _this pushBack "C_Offroad_01_F";
  _this call baseModule_getPlaceholders;
};

baseModule_getHeloLocations = {
  _this pushBack "O_Heli_Light_02_v2_F";
  _this call baseModule_getPlaceholders;
};

baseModule_getPlaceholders = {
  private ["_moduleData", "_result", "_position", "_direction", "_className"];
  _position = _this select 0;
  _direction = _this select 1;
  _moduleData = _this select 2;
  _className = _this select 3;
  _result = [];

  {
    {
      if (typeOf _x == _className) then {
        _result pushBack [getPosAsl _x, direction _x];
      };
    } forEach (_x select 2);
  } forEach _moduleData;
  _result; 
};

baseModule_getPrimaryModule = {
  private ["_moduleData", "_primary"];
  _moduleData = _this select 0;
  _primary = [];

  {
    if ([_x select 0, 'isPrimary', []] call baseModule_callModule) exitWith {
      _primary = _x;
    };
  } forEach _moduleData;

  _primary
};

baseModule_getPrimaryModuleIndex = {
  private ["_moduleData", "_index", "_moduleNames"];
  _moduleData = _this select 0;
  _index = 0;
  _moduleNames = [
    _moduleData,
    { 
      _this select 0;
    }
  ] call AEX_map;

  {
    if ([_x, 'isPrimary', []] call baseModule_callModule) exitWith {
      _index = [_moduleNames, _x] call baseModule_getModuleIndex;
    };
  } forEach _moduleNames;

  _index;
};

baseModule_callModule = {
  private ["_moduleName", "_functionName", "_arguments"];
  _moduleName = _this select 0;
  _functionName = _this select 1;
  _arguments = _this select 2;
  
  call compile format ["_arguments call baseModule_%1_%2;", _moduleName, _functionName];
};

baseModule_getNumberSlots = {
  private ["_moduleName", "_slots"];
  _moduleName = _this select 0;

  _slots = [_moduleName, 'numberOfSlots', []] call baseModule_callModule;

  if (isNil{_slots}) exitWith {
    1;
  };

  _slots;
};