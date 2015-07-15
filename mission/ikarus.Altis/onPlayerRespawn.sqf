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

player addEventHandler[ "HandleRating", {}];

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


[] spawn {
  private ["_isGuard", "_noUniform"];
  _noUniform = false;
  while { true } do {

    sleep 1;
    _isGuard = player getVariable ["isGuard", false];
    if (! _isGuard && uniform player == "U_Marshal") then {
      removeUniform player;
      ["Only guards are allowed to wear guard uniform"] call BIS_fnc_dynamicText;
    };

    if (! _isGuard && vest player == "V_TacVest_blk_POLICE") then {
      removeVest player;
      ["Only guards are allowed to wear guard uniform"] call BIS_fnc_dynamicText;
    };

    if (! _noUniform && _isGuard && (uniform player != "U_Marshal" || vest player != "V_TacVest_blk_POLICE")) then {
      _noUniform = true;
      ["Guards will consider you enemy without your uniform and you cannot get any guard rewards"] call BIS_fnc_dynamicText;
      [-20000] call client_addRating;
    };

    if (_noUniform && _isGuard && (uniform player == "U_Marshal" && vest player == "V_TacVest_blk_POLICE")) then {
      _noUniform = false;
      [20000] call client_addRating;
    };
  };
};

lastConnectedPlayerUid = [getPlayerUID _unit, _unit];

publicVariableServer "lastConnectedPlayerUid";


