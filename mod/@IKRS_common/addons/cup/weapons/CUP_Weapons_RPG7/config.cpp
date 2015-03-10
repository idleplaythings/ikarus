class CfgPatches
{
	class CUP_Weapons_RPG7
	{
		units[]={};
		weapons[]=
		{
			"CUP_launch_RPG7V"
		};
		requiredVersion=0.1;
		requiredAddons[]=
		{
			"CUP_Weapons_WeaponsCore",
			"CUP_Weapons_Ammunition"
		};
		magazines[]=
		{
			"CUP_PG7V_M",
			"CUP_OG7_M"
		};
	};
};
class CfgMagazines
{
	class CA_Magazine;
	class CA_LauncherMagazine;
	class CUP_PG7V_M: CA_LauncherMagazine
	{
		author="CUP";
		scope=2;
		model="\CUP\Weapons\CUP_Weapons_Ammunition\PG7V\CUP_PG7V";
		modelSpecial="\CUP\Weapons\CUP_Weapons_RPG7\CUP_RPG7_Launcher_loaded.p3d";
		displayName="PG-7V";
		ammo="CUP_R_PG7V_AT";
		picture="\CUP\Weapons\CUP_Weapons_Ammunition\data\ui\m_pg7_ca.paa";
		initSpeed=70;
		descriptionShort="PG-7V";
		mass=48;
	};
	class CUP_PG7VL_M: CA_LauncherMagazine
	{
		author="CUP";
		model="\CUP\Weapons\CUP_Weapons_Ammunition\PG7VL\CUP_PG7VL";
		modelSpecial="\CUP\Weapons\CUP_Weapons_RPG7\CUP_RPG7L_Launcher_loaded.p3d";
		displayName="PG-7VL";
		ammo="CUP_R_PG7VL_AT";
		picture="\CUP\Weapons\CUP_Weapons_Ammunition\data\ui\m_PG7VL_ca.paa";
		descriptionShort="PG-7VL";
		mass=57;
		initSpeed=70;
	};
	class CUP_PG7VR_M: CA_LauncherMagazine
	{
		author="CUP";
		model="\CUP\Weapons\CUP_Weapons_Ammunition\PG7VR\CUP_PG7VR";
		modelSpecial="\CUP\Weapons\CUP_Weapons_RPG7\CUP_RPG7VR_Launcher_loaded.p3d";
		displayName="PG-7VR";
		ammo="CUP_R_PG7VR_AT";
		picture="\CUP\Weapons\CUP_Weapons_Ammunition\data\ui\M_PG7VR_ca.paa";
		initSpeed=70;
		descriptionShort="PG-7VR";
		type="3 * 256";
		mass=98;
	};
	class CUP_OG7_M: CA_LauncherMagazine
	{
		author="CUP";
		scope=2;
		model="\CUP\Weapons\CUP_Weapons_Ammunition\OG7V\CUP_OG7V";
		modelSpecial="\CUP\Weapons\CUP_Weapons_RPG7\CUP_RPG7O_Launcher_loaded.p3d";
		displayName="OG7";
		ammo="CUP_R_OG7_AT";
		picture="\CUP\Weapons\CUP_Weapons_Ammunition\data\ui\M_OG7V_ca.paa";
		initSpeed=70;
		descriptionShort="OG-7";
		mass=43;
	};
};
class CfgWeapons
{
	class Launcher;
	class Launcher_Base_F: Launcher
	{
		class WeaponSlotsInfo;
	};
	class CUP_launch_RPG7V: Launcher_Base_F
	{
		author="CUP";
		class GunParticles
		{
			class effect1
			{
				positionName="konec hlavne";
				directionName="usti hlavne";
				effectName="RocketBackEffectsRPGNT";
			};
		};
		class WeaponSlotsInfo: WeaponSlotsInfo
		{
			mass=153;
		};
		scope=2;
		displayName="RPG-7V";
		model="\CUP\Weapons\CUP_Weapons_RPG7\CUP_RPG7_Launcher.p3d";
		handAnim[]=
		{
			"OFP2_ManSkeleton",
			"\CUP\Weapons\CUP_Weapons_RPG7\data\anim\RPG7.rtm"
		};
		modelOptics="-";
		magazines[]=
		{
			"CUP_PG7V_M",
			"CUP_PG7VL_M",
			"CUP_PG7VR_M",
			"CUP_OG7_M"
		};
		sounds[]=
		{
			"StandardSound"
		};
		jsrs_soundeffect="JSRS2_Distance_Effects_rpg";
		AGM_Backblast_Angle=45;
		AGM_Backblast_Range=20;
		AGM_Backblast_Damage=1;
		class BaseSoundModeType
		{
			weaponSoundEffect="DefaultRifle";
		};
		class StandardSound: BaseSoundModeType
		{
			begin1[]=
			{
				"CUP\Weapons\CUP_Weapons_RPG7\data\sfx\RPG7V_s1",
				1.9952624,
				1,
				900
			};
			begin2[]=
			{
				"CUP\Weapons\CUP_Weapons_RPG7\data\sfx\RPG7V_s2",
				1.9952624,
				1,
				900
			};
			begin3[]=
			{
				"CUP\Weapons\CUP_Weapons_RPG7\data\sfx\RPG7V_s3",
				1.9952624,
				1,
				900
			};
			begin4[]=
			{
				"CUP\Weapons\CUP_Weapons_RPG7\data\sfx\RPG7V_s4",
				1.9952624,
				1,
				900
			};
			soundBegin[]=
			{
				"begin1",
				0.25,
				"begin2",
				0.25,
				"begin3",
				0.25,
				"begin4",
				0.25
			};
		};
		reloadMagazineSound[]=
		{
			"CUP\Weapons\CUP_Weapons_RPG7\data\sfx\Reload",
			1,
			1,
			35
		};
		drySound[]=
		{
			"CUP\Weapons\CUP_Weapons_RPG7\data\sfx\Dry",
			1,
			1,
			35
		};
		soundFly[]=
		{
			"CUP\Weapons\CUP_Weapons_RPG7\data\sfx\Fly",
			0.31622776,
			1.5,
			900
		};
		weaponSoundEffect="DefaultRifle";
		reloadAction="ReloadRPG";
		picture="\CUP\Weapons\CUP_Weapons_RPG7\data\ui\gear_rpg7_X_ca.paa";
		recoil="recoil_single_law";
		aiRateOfFire=10;
		aiRateOfFireDistance=250;
		minRange=10;
		midRange=200;
		maxRange=300;
		class Library
		{
			libTextDesc="RPG-7V. 'nuff said";
		};
		descriptionShort="Rocket Launcher";
	};
};
