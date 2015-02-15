private["_unit", "_oldUnit"];
_unit = _this select 0;
_oldUnit = _this select 1;

player addEventHandler ["InventoryOpened", {
  private ["_unit", "_container", "_squadId", "_playerSquadId", "_result"];
  
  _unit = _this select 0;
  _container = _this select 1;
  _squadId = _container getVariable ["squadId", ""];
  _playerSquadId = _unit getVariable ["squadId", ""];
  _result = false;

  if (_squadId != "" && _squadId != _playerSquadId) then {
    _result = true;
  };

  _result;
}];


lastConnectedPlayerUid = [getPlayerUID _unit, _unit];

publicVariableServer "lastConnectedPlayerUid";


