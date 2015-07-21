client_setupOutpostAction = nil;

client_setUpOutpostMapTeleportActions = {
  private ["_object", "_actions"];
  _object = _this select 0;
  _actions = _this select 1;

  { 
    private ["_text", "_position"];
    _text = _x select 0;
    _position = _x select 1;

    _object addAction [
      _text, 
      '['+(str _position)+'] call client_teleportToOutpost;'
    ];
    
  } forEach _actions;

};

client_teleportToOutpost = {
  private ["_position"];
  _position = _this select 0;

  
  if (isServer) then { //for single player testing
    [
      [player, _position],
      baseModule_outpostmap1_teleport,
      "Teleporting in 5 seconds. Moving will cancel this",
      "Teleport cancelled"
    ] spawn client_doWithCancelTimer;
  } else {
  
    [
      [_position],
      client_doTeleportToOutpost,
      "Teleporting in 5 seconds. Moving will cancel this",
      "Teleport cancelled"
    ] spawn client_doWithCancelTimer;
  }
};

client_doTeleportToOutpost = {
  private ["_position"];
  _position = _this select 0;

  teleportToOutpost = [player, _position]; 
  publicVariableServer "teleportToOutpost";
};

client_rempoveOutpostMapTeleportActions = {
  private ["_object"];
  _object = _this select 0;

  removeAllActions _object;
};

client_setUpDismantleOutpost = {
  private ["_object"];
  _object = _this select 0;

  
  _object addAction [
    "Dismantle outpost", 
    {
      [
        [],
        client_doDismantleOutpost,
        "Dismantling outpost in 5 seconds. Moving will cancel this",
        "Dismantle cancelled"
      ] spawn client_doWithCancelTimer;
    }
  ];
};

client_doDismantleOutpost = {
  dismantleOutpost = [player];
  publicVariableServer "dismantleOutpost"
};

client_doingSomething = false;

client_doWithCancelTimer = {
  private ["_position", "_readyTime", "_arguments", "_callback", "_startText", "_cancelText"];
  _position = getPos player;
  _readyTime = time + 5;
  _arguments = _this select 0;
  _callback = _this select 1;
  _startText = _this select 2;
  _cancelText = _this select 3;

  if (client_doingSomething) exitWith {};
  client_doingSomething = true;

  [_startText] spawn BIS_fnc_dynamicText;

  waitUntil {
    getPos player distance _position > 0 || time > _readyTime;
  };

  client_doingSomething = false;

  if (getPos player distance _position > 0) exitWith {
    [_cancelText] call BIS_fnc_dynamicText;
  };

  _arguments call _callback;
};

client_setUpDeployOutpost = {
  deployOutpost = [player];
  client_setupOutpostAction = player addAction ["Deploy outpost", 'publicVariableServer "deployOutpost"'];
};

client_removeDeployOutpost = {
  if (isNil{client_setupOutpostAction}) exitWith {};

  player removeAction client_setupOutpostAction;
};


client_setUpBecomeMedic = {
  private ["_box"];
  _box = _this select 0;

  becomeMedic = [_box, player];
  _box addAction ["Become medic", 'publicVariableServer "becomeMedic"'];
};

client_removeBecomeMedic = {
  private ["_box"];
  _box = _this select 0;
  _box removeAction 0;
};

client_equipGuard = {
  removeAllWeapons player;
  removeAllItems player;
  removeAllAssignedItems player;
  removeUniform player;
  removeVest player;

  if (backpack player != "B_Parachute") then {
    removeBackpack player;
  };
  
  removeHeadgear player;

  player forceAddUniform "U_Marshal";
  player addHeadgear "H_Cap_police";
  player addVest "V_TacVest_blk_POLICE";
  for "_i" from 1 to 6 do {player addItemToVest "30Rnd_556x45_Stanag";};
  for "_i" from 1 to 3 do {player addItemToUniform "16Rnd_9x21_Mag";};
  for "_i" from 1 to 3 do {player addItemToUniform "SmokeShell";};
  player addItemToVest "FirstAidKit";

  player addWeaponGlobal "arifle_TRG20_F";
  player addPrimaryWeaponItem "acc_flashlight";
  player addWeaponGlobal "Binocular";
  player addWeaponGlobal "hgun_P07_F";

  player linkItem "ItemMap";
  player linkItem "ItemCompass";
  player linkItem "ItemWatch";

  ["You are a guard. Your task is to protect depots marked on the map. Do not kill other guards!"] call BIS_fnc_dynamicText;
};

client_addParachute = {
  player addBackpackGlobal "B_Parachute";
};

client_addRating = {
  private ["_number"];
  _number = _this select 0;
  player addRating _number;
};