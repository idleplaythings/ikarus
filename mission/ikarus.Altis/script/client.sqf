client_setupOutpostAction = nil;

client_setUpDismantleOutpost = {
  private ["_object"];
  _object = _this select 0;

  dismantleOutpost = [player];
  _object addAction ["Dismantle outpost", 'publicVariableServer "dismantleOutpost"'];
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