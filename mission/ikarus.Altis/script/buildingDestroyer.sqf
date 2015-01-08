buildingDestroyer_init = {
  private ["_building", "_callback", "_arguments"];
  _building = _this select 0;
  _callback = _this select 1;
  _arguments = _this select 2;
  
  buildingDestroyer_buildings pushBack [_building, _callback, _arguments];
};

buildingDestroyer_buildings = [];

buildingDestroyer_checkBuildings = {
  {
    private ["_building", "_callback", "_arguments"];
    _building = _x select 0;
    _callback = _x select 1;
    _arguments = _x select 2;
    
    if (! alive _building) then {
      _arguments call _callback;
      buildingDestroyer_buildings = buildingDestroyer_buildings - [_x];
    }
  } forEach buildingDestroyer_buildings;
};

_this spawn {
  while { true } do {

    sleep 1;
    call buildingDestroyer_checkBuildings;
  }
};