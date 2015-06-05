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
  removeBackpack player;
  removeHeadgear player;

  player forceAddUniform "U_Marshal";
  player addHeadgear "H_Cap_police";
  player addVest "V_TacVest_blk_POLICE";
  for "_i" from 1 to 6 do {player addItemToVest "30Rnd_556x45_Stanag";};
  for "_i" from 1 to 3 do {player addItemToUniform "16Rnd_9x21_Mag";};
  player addItemToVest "FirstAidKit";

  player addWeaponGlobal "arifle_TRG20_F";
  player addPrimaryWeaponItem "acc_flashlight";
  player addWeaponGlobal "Binocular";
  player addWeaponGlobal "hgun_P07_F";

  player linkItem "ItemMap";
  player linkItem "ItemCompass";
  player linkItem "ItemWatch";
};

client_addParachute = {
  player addBackpackGlobal "B_Parachute";
};

client_addRating = {
  private ["_number"];
  _number = _this select 0;
  _unit addRating _number;
};