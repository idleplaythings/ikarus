 class CfgPatches
 {
 	class IKRS_loot
 	{
 		units[] = {};
 		weapons[] = {};
 		requiredVersion = 0.1;
 		requiredAddons[] = {};
 	};
 };
 class CfgVehicles
 {
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

  class IKRS_loot_civilian_weapons : IKRS_loot_Backpack
  {
    displayName = "Loot (Civilian weapons)";
  };

  class IKRS_loot_old_RU_weapons : IKRS_loot_Backpack
  {
    displayName = "Loot (Old Opfor weapons)";
  };

  class IKRS_loot_old_nato_weapons : IKRS_loot_Backpack
  {
    displayName = "Loot (Old Nato weapons)";
  };

  class IKRS_loot_common_RU_weapons : IKRS_loot_Backpack
  {
    displayName = "Loot (Common Opfor weapons)";
  };

  class IKRS_loot_common_nato_weapons : IKRS_loot_Backpack
  {
    displayName = "Loot (Common Nato weapons)";
  };

  class IKRS_loot_heavy_RU_weapons : IKRS_loot_Backpack
  {
    displayName = "Loot (Heavy Opfor weapons)";
  };

  class IKRS_loot_heavy_nato_weapons : IKRS_loot_Backpack
  {
    displayName = "Loot (Heavy Nato weapons)";
  };

  class IKRS_loot_special_nato_weapons : IKRS_loot_Backpack
  {
    displayName = "Loot (Special Nato weapons)";
  };

  class IKRS_loot_special_RU_weapons : IKRS_loot_Backpack
  {
    displayName = "Loot (Special Opfor weapons)";
  };

  class IKRS_loot_smg_weapons : IKRS_loot_Backpack
  {
    displayName = "Loot (SMG weapons)";
  };

  class IKRS_loot_modern_nato_weapons : IKRS_loot_Backpack
  {
    displayName = "Loot (Modern Nato weapons)";
  };

  class IKRS_loot_modern_opfor_weapons : IKRS_loot_Backpack
  {
    displayName = "Loot (Modern Opfor weapons)";
  };
};
