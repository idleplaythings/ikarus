baseModule_createBaseModules = {
  private ["_modules", "_position", "_direction", "_data", "_index"];
  _modules = _this select 0;  
  _position = _this select 1;
  _direction = _this select 2;
  _index = 0;

  _data = [];

  {
    _data pushBack ([_position, _direction, _index, _x] call baseModule_create);
    _index = _index + 1;
    _direction = [_direction, 90] call addToDirection;
  } forEach _modules;

  _data;
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
  [_name, _data];
};

baseModule_getCacheLocation = {
  private ["_moduleData", "_primaryModuleData", "_position", "_direction", "_primaryModuleIndex"];
  _position = _this select 0;
  _direction = _this select 1;
  _moduleData = _this select 2;
  _primaryModuleData = [_moduleData] call baseModule_getPrimaryModule;
  _primaryModuleIndex = [_moduleData] call baseModule_getPrimaryModuleIndex;

  _objectData = [(_primaryModuleData select 1), 1] call depotPositions_getRandomPlaceholdersFromObjectData;
  [_position, ([_direction, (_primaryModuleIndex * 90)] call addToDirection), _objectData select 0] call houseFurnisher_getPosASLAndDirection; 
};

baseModule_getVehicleLocations = {
  private ["_moduleData", "_result", "_position", "_direction", "_index"];
  _position = _this select 0;
  _direction = _this select 1;
  _moduleData = _this select 2;
  _result = [];
  _index = 0;

  {
    _objectData = [(_x select 1), 100, "C_Offroad_01_F"] call depotPositions_getRandomPlaceholdersFromObjectData;
    {
      _result pushBack ([_position, ([_direction, _index * 90] call addToDirection), _x] call houseFurnisher_getPosASLAndDirection); 
    } forEach _objectData;
    _index = _index + 1;
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
  private ["_moduleData", "_index"];
  _moduleData = _this select 0;
  _index = 0;

  {
    if ([_x select 0, 'isPrimary', []] call baseModule_callModule) exitWith {};
    _index = _index +1;
  } forEach _moduleData;

  _index;
};

baseModule_callModule = {
  private ["_moduleName", "_functionName", "_arguments"];
  _moduleName = _this select 0;
  _functionName = _this select 1;
  _arguments = _this select 2;
  
  call compile format ["_arguments call baseModule_%1_%2;", _moduleName, _functionName];
};