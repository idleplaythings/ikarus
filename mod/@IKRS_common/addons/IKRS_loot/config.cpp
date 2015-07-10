 class CfgPatches
 {
 	class IKRS_loot
 	{
 		units[] = {};
 		weapons[] = {};
 		requiredVersion = 0.1;
 		requiredAddons[] = {"a3_map_altis"};
 	};
 };

 class CfgWeapons 
 {
  class InventoryItem_Base_F;
  class ACE_ItemCore;
  class IKRS_loot_key: ACE_ItemCore {
      scope = 2;
      model = "\A3\Weapons_F\Items\gps";
      picture = "\A3\Drones_F\Weapons_F_Gamma\Items\data\UI\gear_UAV_controller_oli_CA.paa";
      hiddenSelectionsTextures[] = {"\A3\Drones_F\Weapons_F_Gamma\Items\data\UAV_controller_oli_co.paa"};
      displayName = "";
      descriptionShort = "Opens loot boxes";
      descriptionUse = "Opens loot boxes";
      class ItemInfo: InventoryItem_Base_F {
          mass = 20;
      };
  };

  class IKRS_loot_key1: IKRS_loot_key {
   displayName = "Loot key level 1";
  };

  class IKRS_loot_key2: IKRS_loot_key {
   displayName = "Loot key level 2";
  };

  class IKRS_intelligence_weapon: IKRS_loot_key {
    displayName = "Intelligence (Weapon depot)";
    descriptionShort = "Unlocks premium mission";
    descriptionUse = "Unlocks premium mission";
  };

  class IKRS_intelligence_vehicle: IKRS_loot_key {
    displayName = "Intelligence (Vehicle depot)";
    descriptionShort = "Unlocks premium mission";
    descriptionUse = "Unlocks premium mission";
  };

  class IKRS_intelligence_helo: IKRS_loot_key {
    displayName = "Intelligence (Helicopter depot)";
    descriptionShort = "Unlocks premium mission";
    descriptionUse = "Unlocks premium mission";
  };

  class IKRS_vehicle_key: IKRS_loot_key {
    displayName = "Vehicle key";
    descriptionShort = "Unlocks vehicle at military depot";
    descriptionUse = "Unlocks vehicle at military depot";
  };

 };

 class CfgVehicles
 {
  class Land_CargoBox_V1_F;
  class IKRS_Land_CargoBox_1: Land_CargoBox_V1_F {
    model = "A3\Weapons_F\Ammoboxes\AmmoVeh_F";
    hiddenSelectionsTextures[] = {"A3\Weapons_F\Ammoboxes\data\AmmoVeh_HAF_CO.paa"};
  };

  class IKRS_Land_CargoBox_2: Land_CargoBox_V1_F {
    model = "A3\Weapons_F\Ammoboxes\AmmoVeh_F";
    hiddenSelectionsTextures[] = {"A3\Weapons_F\Ammoboxes\data\AmmoVeh_OPFOR_CO.paa"};
  };

  class IKRS_Land_CargoBox_3: Land_CargoBox_V1_F {
    model = "A3\Weapons_F\Ammoboxes\AmmoVeh_F";
    hiddenSelectionsTextures[] = {"A3\Weapons_F\Ammoboxes\data\AmmoVeh_CO.paa"};
  };

 	class B_AssaultPack_khk;
 	class IKRS_loot_Backpack : B_AssaultPack_khk
 	{
    model = "\A3\Drones_F\Weapons_F_Gamma\Ammoboxes\Bags\UAV_backpack_F.p3d";
    picture = "\A3\Drones_F\Weapons_F_Gamma\ammoboxes\bags\data\ui\icon_B_C_UAV_rgr_ca";
    hiddenSelectionsTextures[] = {"\A3\Drones_F\Weapons_F_Gamma\Ammoboxes\Bags\data\UAV_backpack_rgr_co.paa"};
    displayName = "Loot";
    maximumLoad = 0;
    mass = 200;
  };

  class IKRS_loot_warsaw_old : IKRS_loot_Backpack
  {
    displayName = "Loot (Warsaw pact, old)";
  };

  class IKRS_loot_warsaw_standard : IKRS_loot_Backpack
  {
    displayName = "Loot (Warsaw pact, standard)";
  };

  class IKRS_loot_warsaw_ammo : IKRS_loot_Backpack
  {
    displayName = "Loot (Warsaw pact, explosives and ammo)";
  };

  class IKRS_loot_nato_standard : IKRS_loot_Backpack
  {
    displayName = "Loot (NATO, standard)";
  };

  class IKRS_loot_nato_ammo : IKRS_loot_Backpack
  {
    displayName = "Loot (NATO, explosives and ammo)";
  };

  class IKRS_loot_nato_modern : IKRS_loot_Backpack
  {
    displayName = "Loot (NATO, modern)";
  };

  class IKRS_loot_nato_modern_ammo : IKRS_loot_Backpack
  {
    displayName = "Loot (NATO, modern explosives and ammo)";
  };

  class IKRS_loot_csat_modern : IKRS_loot_Backpack
  {
    displayName = "Loot (CSAT, modern)";
  };

  class IKRS_loot_csat_modern_ammo : IKRS_loot_Backpack
  {
    displayName = "Loot (CSAT, modern explosives and ammo)";
  };

  class IKRS_loot_smg_weapons : IKRS_loot_Backpack
  {
    displayName = "Loot (SMG weapons)";
  };

  class IKRS_loot_valuables : IKRS_loot_Backpack
  {
    displayName = "Loot (Valuables, money)";
  };

  class IKRS_loot_armor_light : IKRS_loot_Backpack
  {
    displayName = "Loot (Body armor, light)";
  };

  class IKRS_loot_armor_medium : IKRS_loot_Backpack
  {
    displayName = "Loot (Body armor, medium)";
  };

  class IKRS_loot_armor_heavy : IKRS_loot_Backpack
  {
    displayName = "Loot (Body armor, heavy)";
  };

  class IKRS_loot_rare_weapons : IKRS_loot_Backpack
  {
    displayName = "Loot (Rare weapons)";
  };
};
