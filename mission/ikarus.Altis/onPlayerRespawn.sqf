private["_unit", "_oldUnit"];
_unit = _this select 0;
_oldUnit = _this select 1;

lastDamager = "";

removeAllWeapons player;
removeAllItems player;
removeAllAssignedItems player;
removeUniform player;
removeVest player;
removeBackpack player;
removeHeadgear player;

player addEventHandler [ "hit", {
  private ["_unit", "_offender", "_damage"];
  _unit = _this select 0;
  _offender = _this select 1;
  _damage = _this select 2;

  if ((getPlayerUID _unit) == (getPlayerUID _offender)) exitWith {};

  lastDamager = getPlayerUID _offender;
}];

player addEventHandler ["InventoryOpened", {
  private ["_unit", "_container", "_squadId", "_playerSquadId", "_result"];
  
  _unit = _this select 0;
  _container = _this select 1;
  _squadId = _container getVariable ["squadId", ""];
  _playerSquadId = _unit getVariable ["playerSquadId", ""];
  _result = false;

  if (_squadId != "" && _squadId != _playerSquadId) then {
    _result = true;
  };

  _result;
}];


lastConnectedPlayerUid = [getPlayerUID _unit, _unit];

publicVariableServer "lastConnectedPlayerUid";


