client_depotDronesActivated = false;

client_addDroneUplinkAction = {
  private ["_console", "_uav"];
  _console = _this select 0;
  _uav = _this select 1;

  _console addAction [
    "Activate drone uplink",
    {
      [_this select 0, _this select 3] call client_activateDroneUplink;
    },
    _uav
  ];
};

client_enableDepotDrones = {
  client_depotDronesActivated = true;
};

client_activateDroneUplink = {
  private ["_console", "_uav"];
  _console = _this select 0;
  _uav = _this select 1;

  if (_console distance player > 2) exitWith {
    ["You must be closer to the drone console.", "depotDrones"] call client_textMessage;
  };

  if (! client_depotDronesActivated) exitWith {
    ["Drone is not available until 40 minutes has elapsed.", "depotDrones"] call client_textMessage;
  };

  player action ["SwitchToUAVGunner", _uav];
};

client_signalTransmitterAction = nil;
client_signalTransmitter = nil;

client_createActivateTransmitterAction = {

  if (! isNil {client_signalTransmitterAction}) exitWith {};

  client_signalTransmitter = _this select 0;

  client_signalTransmitterAction = client_signalTransmitter addAction [
    'Activate signal transmitter',
    {
      
      if (client_signalTransmitter distance player > 2.5) exitWith {
        ["You need to be closer to the transmitter.", "signalTransmitter"] call client_textMessage;
      };

      if (backpack player != "IKRS_signal_device") exitWith {
        ["You need a signal device to activate the transmitter.", "signalTransmitter"] call client_textMessage;
      };

      activateSignalTransmitter = [player];
      publicVariableServer "activateSignalTransmitter";

      //for single player testing
      if (isServer) then {
        [player] call objective_manhunt_activateTransmitter;
      };
    }
  ];
};

client_guardParaDropAction = nil;

client_setUpGuardParadropAction = {
  
  if ! (isNil {client_guardParaDropAction}) exitWith {};

  _actionFunction = {

    if (backpack player != "") exitWith {
      ["You may not paradrop while carrying a backpack", "cancelTimer"] call client_textMessage;
    };
    
    if (vehicle player != player) exitWith {
      ["You can't paradrop while in vehicle", "cancelTimer"] call client_textMessage;
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
  if (isNil{client_guardParaDropAction}) exitWith {};
    
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
    ["You are carrying too much weight to teleport", "cancelTimer"] call client_textMessage;
  };

  if (vehicle player != player) exitWith {
    ["You can't teleport while in vehicle", "cancelTimer"] call client_textMessage;
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
  publicVariableServer "dismantleOutpost";
  if (isServer) then {
    [player] call outpost_dismantle;
  };
};

client_triangulationAction = nil;

client_setUpSignalDeviceAction = {

  if ! (isNil{client_triangulationAction}) exitWith {};

  _action = {

    if (vehicle player != player) exitWith {
      ["You can not triangulate from a vehicle.", 'triangulation'] call client_textMessage; 
    };
  
    [
      [],
      {
        triangulation = [player];
        publicVariableServer "triangulation";
        if (isServer) then {
          [player] call objective_manhunt_triangulate;
        };
      },
      "Triangulating in 5 seconds. Moving will cancel this",
      "Triangulation cancelled"
    ] spawn client_doWithCancelTimer;
  };

  client_triangulationAction = player addAction [
    "Triangulate",
    _action
  ];
};

client_removeSignalDeviceAction = {
  if (isNil{client_triangulationAction}) exitWith {};
  player removeAction client_triangulationAction;
  client_triangulationAction = nil;
};

client_setUpDeployOutpost = {
  private ["_action"];
  
  _action = {
    deployOutpost = [player];
    publicVariableServer "deployOutpost";
    if (isServer) then {
      [player] call outpost_deploy;
    }
  };
  client_setupOutpostAction = player addAction ["Deploy outpost", _action];
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
  /*
  if (vest player == "") then {
    player addVest "V_Chestrig_oli";
  };

  if (uniform player == "") then {
    player forceAddUniform "U_B_HeliPilotCoveralls";
  };

  for "_i" from 1 to 6 do {player addItemToVest "hlc_30Rnd_545x39_B_AK";};
  for "_i" from 1 to 3 do {player addItemToVest "SmokeShell";};
  for "_i" from 1 to 6 do {player addItemToUniform "ACE_quikclot";};
  for "_i" from 1 to 2 do {player addItemToUniform "ACE_tourniquet";};  
  for "_i" from 1 to 2 do {player addItemToUniform "ACE_morphine";};

  player addWeaponGlobal "hlc_rifle_ak74";
  player addWeaponGlobal "Binocular";
  */
};

client_addParachute = {
  player addBackpackGlobal "B_Parachute";
};

client_addRating = {
  private ["_number"];
  _number = _this select 0;
  player addRating _number;
};

client_doingSomething = false;
client_doingSomethingCancelled = false;

client_doWithCancelTimer = {
  private ["_position", "_readyTime", "_arguments", "_callback", "_startText", "_cancelText"];
  _position = getPos player;
  _readyTime = time + 5;
  _arguments = _this select 0;
  _callback = _this select 1;
  _startText = _this select 2;
  _cancelText = _this select 3;

  if (client_doingSomething) exitWith {
    client_doingSomethingCancelled = true;
  };
  client_doingSomethingCancelled = false;
  client_doingSomething = true;

  [_startText, "cancelTimer"] call client_textMessage;

  waitUntil {
    getPos player distance _position > 0 || time > _readyTime || client_doingSomethingCancelled;
  };

  client_doingSomething = false;

  if (getPos player distance _position > 0 || client_doingSomethingCancelled) exitWith {
    [_cancelText, "cancelTimer"] call client_textMessage;
  };

  ["", "cancelTimer"] call client_textMessage;
  _arguments call _callback;
};

client_taskMessage = {
  private ["_message"];
  _message = _this select 0;
  _type = [_this, 1, "TaskCreated"] call BIS_fnc_param;
  [_type,["",_message]] call BIS_fnc_showNotification;
};

client_textMessage = {
  private ["_message", "_type", "_found"];
  _message = _this select 0;
  _type = [_this, 1, ""] call BIS_fnc_param;
  _found = false;


  if (_type == "") exitWith {
    client_messages pushBack [time, _type, _message];
    call client_showMessage;
  };

  {
    if (_x select 1 == _type) exitWith {
      if (_message == "") then {
        client_messages = client_messages - [_x];
      } else {
        _x set [0, time];
        _x set [2, _message];
      };

      _found = true;
    }
  } forEach client_messages;

  if (! _found) then {
    client_messages pushBack [time, _type, _message];
  };

  call client_showMessage;
};


client_messages = [];

client_showMessage = {
  private ["_text", "_first"];

  call client_deleteOldMessages;

  if (count client_messages == 0) exitWith {};
  _first = true;
  _text = "";
  {
    if (! _first) then {
      _text = _text + "<br/><br/>";
    };
    _first = false;
    _text = _text + (_x select 2);
    
  } forEach client_messages;

  hintSilent parseText _text;
};

client_deleteOldMessages = {
  {
    if ((_x select 0) + 10 < time) exitWith {
      client_messages = client_messages - [_x];
      call client_deleteOldMessages;
    };
  } forEach client_messages;
};
