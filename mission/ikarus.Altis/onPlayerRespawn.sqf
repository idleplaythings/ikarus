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
player forceAddUniform "U_B_HeliPilotCoveralls";

enableEngineArtillery false;

player addEventHandler[ "HandleRating", {
  0;
}];

player addEventHandler [ "take", {
  private ["_unit", "_container", "_item"];
  _unit = _this select 0;
  _container = _this select 1;
  _item = _this select 2;

  if (_item == "IKRS_outpost_backpack") then {
    call client_setUpDeployOutpost;
    call client_removeSignalDeviceAction;
  };

  if (_item == "IKRS_signal_device") then {
    call client_setUpSignalDeviceAction;
    call client_removeDeployOutpost;
  };
}];

player addeventhandler ["Put",{
  private ["_unit", "_container", "_item"];
  _unit = _this select 0; 
  _container = _this select 1;
  _item = _this select 2;

  if (_item == "IKRS_outpost_backpack") then {
    call client_removeDeployOutpost;
  };

  if (_item == "IKRS_signal_device") then {
    call client_removeSignalDeviceAction;
  };
}];

player addEventHandler [ "hit", {
  private ["_unit", "_offender", "_damage"];
  _unit = _this select 0;
  _offender = _this select 1;
  _damage = _this select 2;

  if ((getPlayerUID _unit) == (getPlayerUID _offender)) exitWith {};

  lastDamager = getPlayerUID _offender;
}];

player addEventHandler ["InventoryOpened", {
  private ["_unit", "_container", "_squadId", "_playerSquadId", "_result", "_signalDevice"];
  
  _unit = _this select 0;
  _container = _this select 1;
  _squadId = _container getVariable ["squadId", ""];
  _playerSquadId = _unit getVariable ["playerSquadId", ""];
  _result = false;
  _signalDevice = false;

  if ("IKRS_signal_device" in backpackCargo _container) then {
    _signalDevice = true;
  };

  if (! _signalDevice && _squadId != "" && _squadId != _playerSquadId) then {
    _result = true;
  };

  _result;
}];

/*
waitAndCloseUAVTerminal = {
  waitUntil {
    //sleep 0.1;
    ! isNull findDisplay 160;
  };

  ["UAV Terminal is disabled. Use action menu to connect to UAV while close to one.", "uavterminal"] call client_textMessage;
   
  findDisplay 160 closeDisplay 1;
  call waitAndCloseUAVTerminal;
};


[] spawn waitAndCloseUAVTerminal;
*/

lastConnectedPlayerUid = [getPlayerUID _unit, _unit];

publicVariableServer "lastConnectedPlayerUid";


