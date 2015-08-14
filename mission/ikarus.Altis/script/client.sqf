client_guardParaDropAction = nil;

client_setUpGuardParadropAction = {
  
  if ! (isNil {client_guardParaDropAction}) exitWith {};

  _actionFunction = {

    if (backpack player != "") exitWith {
      ["You may not paradrop while carrying a backpack"] call BIS_fnc_dynamicText;
    };

    if (loadAbs player > 300) exitWith {
      ["You are carrying too much weight to paradrop"] call BIS_fnc_dynamicText;
    };
    
    if (vehicle player != player) exitWith {
      ["You can't paradrop while in vehicle"] call BIS_fnc_dynamicText;
    };

    if (isServer) then { //for single player testing
      [
        [player],
        objective_guard_doParadrop,
        "Paradropping in 5 seconds. Moving will cancel this",
        "Paradrop cancelled"
      ] spawn client_doWithCancelTimer;
    } else {
    
      [
        [],
        {
          guardParadrop = [player]; 
          publicVariableServer "guardParadrop";
        },
        "Paradropping in 5 seconds. Moving will cancel this",
        "Paradrop cancelled"
      ] spawn client_doWithCancelTimer;
    };
  };

  client_guardParaDropAction = player addAction [
    'Paradrop to objective area',
    _actionFunction
  ];
};

client_removeGuardParadropAction = {
  player removeAction client_guardParaDropAction;
  client_guardParaDropAction = nil;
};

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

  if (loadAbs player > 300) exitWith {
    ["You are carrying too much weight to teleport"] call BIS_fnc_dynamicText;
  };

  
  if (vehicle player != player) exitWith {
    ["You can't teleport while in vehicle"] call BIS_fnc_dynamicText;
  };

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
  for "_i" from 1 to 6 do {player addItemToVest "hlc_30Rnd_545x39_B_AK";};
  for "_i" from 1 to 3 do {player addItemToVest "SmokeShell";};
  for "_i" from 1 to 6 do {player addItemToUniform "ACE_quikclot";};
  for "_i" from 1 to 2 do {player addItemToUniform "ACE_tourniquet";};  
  for "_i" from 1 to 2 do {player addItemToUniform "ACE_morphine";};

  player addWeaponGlobal "hlc_rifle_ak74";
  player addWeaponGlobal "Binocular";
};

client_addParachute = {
  player addBackpackGlobal "B_Parachute";
};

client_addRating = {
  private ["_number"];
  _number = _this select 0;
  player addRating _number;
};