class CfgPatches
{
	class CUP_Weapons_M16
	{
		units[]={};
		weapons[]=
		{
			"CUP_muzzle_snds_M16_camo",
			"CUP_muzzle_snds_M16",
			"CUP_arifle_M16A2",
			"CUP_arifle_M16A2_GL",
			"CUP_arifle_M16A4_Base",
			"CUP_arifle_M16A4_GL",
			"CUP_arifle_M16A4_Aim_Laser",
			"CUP_arifle_M16A4_ACOG_Laser",
			"CUP_arifle_M16A4_GL_Laser",
			"CUP_arifle_M16A4_GL_ACOG_Laser",
			"CUP_arifle_M4A1_BUIS_GL",
			"CUP_arifle_M4A1_BUIS_camo_GL",
			"CUP_arifle_M4A1_BUIS_desert_GL",
			"CUP_arifle_M4A1",
			"CUP_arifle_M4A1_camo",
			"CUP_arifle_M4A1_black",
			"CUP_arifle_M4A1_desert",
			"CUP_arifle_M4A3_desert",
			"CUP_arifle_M4A1_camo_Aim",
			"CUP_arifle_M4A3_desert_Aim_Flashlight",
			"CUP_arifle_M4A3_desert_GL_ACOG_Laser",
			"CUP_arifle_M4A1_Aim",
			"CUP_arifle_M4A1_camo_AIM_snds",
			"CUP_arifle_M4A1_GL_Holo_Flashlight",
			"CUP_arifle_M4A1_GL_ACOG_Flashlight",
			"CUP_arifle_M4A1_camo_GL_Holo_Flashlight",
			"CUP_arifle_M4A1_camo_GL_Holo_Flashlight_Snds",
			"CUP_srifle_Mk12SPR",
			"CUP_srifle_Mk12SPR_LeupoldM3LR"
		};
		requiredVersion=0.1;
		requiredAddons[]=
		{
			"CUP_Weapons_WeaponsCore",
			"CUP_Weapons_Ammunition",
			"CUP_Weapons_West_Attachments"
		};
	};
};
class Mode_SemiAuto;
class Mode_Burst;
class Mode_FullAuto;
class SlotInfo;
class CUP_PicatinnyTopMount;
class CUP_PicatinnyTopShortMount;
class CUP_PicatinnySideMount;
class CfgWeapons
{
	class ItemCore;
	class InventoryMuzzleItem_Base_F;
	class Rifle;
	class Rifle_Base_F: Rifle
	{
		class WeaponSlotsInfo;
		class GunParticles;
	};
	class UGL_F;
	class CUP_muzzle_snds_M16_camo: ItemCore
	{
		author="CUP";
		htMin=1;
		htMax=600;
		afMax=0;
		mfMax=0;
		mFact=1;
		tBody=100;
		scope=2;
		displayName="M16 / M4 Silencer (camo)";
		picture="\CUP\Weapons\CUP_Weapons_M16\data\ui\gear_acca_snds_m4_ca.paa";
		model="\CUP\Weapons\CUP_Weapons_M16\CUP_silencer_camo.p3d";
		class ItemInfo: InventoryMuzzleItem_Base_F
		{
			mass=5;
			class MagazineCoef
			{
				initSpeed=1.1;
			};
			class AmmoCoef
			{
				hit=1;
				visibleFire=0.5;
				audibleFire=0.30000001;
				visibleFireTime=0.5;
				audibleFireTime=0.5;
				cost=1;
				typicalSpeed=1.2;
				airFriction=1.2;
			};
			soundTypeIndex=1;
			muzzleEnd="zaslehPoint";
			alternativeFire="Zasleh2";
			class MuzzleCoef
			{
				dispersionCoef="0.8f";
				artilleryDispersionCoef="1.0f";
				fireLightCoef="0.1f";
				recoilCoef="1.0f";
				recoilProneCoef="1.0f";
				minRangeCoef="1.0f";
				minRangeProbabCoef="1.0f";
				midRangeCoef="1.0f";
				midRangeProbabCoef="1.0f";
				maxRangeCoef="1.0f";
				maxRangeProbabCoef="1.0f";
			};
		};
		inertia=0.1;
	};
	class CUP_muzzle_snds_M16: CUP_muzzle_snds_M16_camo
	{
		author="CUP";
		displayName="M16 / M4 Silencer (black)";
		picture="\CUP\Weapons\CUP_Weapons_M16\data\ui\gear_acca_snds_m4black.paa";
		model="\CUP\Weapons\CUP_Weapons_M16\CUP_silencer_black.p3d";
	};
	class CUP_arifle_M16_Base: Rifle_Base_F
	{
		author="CUP";
		htMin=1;
		htMax=480;
		afMax=0;
		mfMax=0;
		mFact=1;
		tBody=100;
		selectionFireAnim="muzzleFlash";
		value=8;
		inertia=0.5;
		dexterity=1.5;
		reloadAction="GestureReloadMX";
		reloadMagazineSound[]=
		{
			"CUP\Weapons\CUP_Weapons_M16\data\sfx\M16_Reload",
			1,
			1,
			35
		};
		drySound[]=
		{
			"CUP\Weapons\CUP_Weapons_M16\data\sfx\M16_Dry",
			1,
			1,
			35
		};
		magazines[]=
		{
			"CUP_30Rnd_556x45_Stanag",
			"CUP_30Rnd_556x45_G36",
			"CUP_30Rnd_TE1_Red_Tracer_556x45_G36",
			"CUP_30Rnd_TE1_Green_Tracer_556x45_G36",
			"CUP_30Rnd_TE1_Yellow_Tracer_556x45_G36",
			"CUP_100Rnd_556x45_BetaCMag",
			"CUP_100Rnd_TE1_Red_Tracer_556x45_BetaCMag",
			"CUP_100Rnd_TE1_Green_Tracer_556x45_BetaCMag",
			"CUP_100Rnd_TE1_Yellow_Tracer_556x45_BetaCMag",
			"30Rnd_556x45_Stanag",
			"30Rnd_556x45_Stanag_Tracer_Red",
			"30Rnd_556x45_Stanag_Tracer_Green",
			"30Rnd_556x45_Stanag_Tracer_Yellow",
			"CUP_20Rnd_556x45_Stanag"
		};
		modes[]=
		{
			"Single",
			"Burst"
		};
		jsrs_soundeffect="JSRS2_Distance_Effects_M16";
		class Single: Mode_SemiAuto
		{
			sounds[]=
			{
				"StandardSound",
				"SilencedSound"
			};
			class BaseSoundModeType
			{
				weaponSoundEffect="DefaultRifle";
				closure1[]=
				{
					"A3\sounds_f\weapons\closure\closure_rifle_2",
					"db-12",
					1,
					10
				};
				closure2[]=
				{
					"A3\sounds_f\weapons\closure\closure_rifle_3",
					"db-12",
					1,
					10
				};
				soundClosure[]=
				{
					"closure1",
					0.5,
					"closure2",
					0.5
				};
			};
			class StandardSound: BaseSoundModeType
			{
				begin1[]=
				{
					"CUP\Weapons\CUP_Weapons_M16\data\sfx\M16_s1",
					1.77828,
					1,
					1000
				};
				begin2[]=
				{
					"CUP\Weapons\CUP_Weapons_M16\data\sfx\M16_s2",
					1.77828,
					1,
					1000
				};
				begin3[]=
				{
					"CUP\Weapons\CUP_Weapons_M16\data\sfx\M16_s3",
					1.77828,
					1,
					1000
				};
				begin4[]=
				{
					"CUP\Weapons\CUP_Weapons_M16\data\sfx\M16_s4",
					1.77828,
					1,
					1000
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
			class SilencedSound: BaseSoundModeType
			{
				begin1[]=
				{
					"A3\sounds_f\weapons\silenced\silent-18",
					1,
					1,
					300
				};
				begin2[]=
				{
					"A3\sounds_f\weapons\silenced\silent-19",
					1,
					1,
					300
				};
				begin3[]=
				{
					"A3\sounds_f\weapons\silenced\silent-11",
					1,
					1,
					300
				};
				soundBegin[]=
				{
					"begin1",
					0.333,
					"begin2",
					0.333,
					"begin3",
					0.333
				};
			};
			reloadTime=0.075000003;
			recoil="recoil_single_mk20";
			recoilProne="recoil_single_prone_mk20";
			dispersion=0.001;
			minRange=2;
			minRangeProbab=0.30000001;
			midRange=250;
			midRangeProbab=0.69999999;
			maxRange=400;
			maxRangeProbab=0.050000001;
		};
		class Burst: Mode_Burst
		{
			sounds[]=
			{
				"StandardSound",
				"SilencedSound"
			};
			class BaseSoundModeType
			{
				weaponSoundEffect="DefaultRifle";
				closure1[]=
				{
					"A3\sounds_f\weapons\closure\closure_rifle_2",
					"db-12",
					1,
					10
				};
				closure2[]=
				{
					"A3\sounds_f\weapons\closure\closure_rifle_3",
					"db-12",
					1,
					10
				};
				soundClosure[]=
				{
					"closure1",
					0.5,
					"closure2",
					0.5
				};
			};
			class StandardSound: BaseSoundModeType
			{
				begin1[]=
				{
					"CUP\Weapons\CUP_Weapons_M16\data\sfx\M16_s1",
					1.77828,
					1,
					1000
				};
				begin2[]=
				{
					"CUP\Weapons\CUP_Weapons_M16\data\sfx\M16_s2",
					1.77828,
					1,
					1000
				};
				begin3[]=
				{
					"CUP\Weapons\CUP_Weapons_M16\data\sfx\M16_s3",
					1.77828,
					1,
					1000
				};
				begin4[]=
				{
					"CUP\Weapons\CUP_Weapons_M16\data\sfx\M16_s4",
					1.77828,
					1,
					1000
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
			class SilencedSound: BaseSoundModeType
			{
				begin1[]=
				{
					"A3\sounds_f\weapons\silenced\silent-18",
					1,
					1,
					300
				};
				begin2[]=
				{
					"A3\sounds_f\weapons\silenced\silent-19",
					1,
					1,
					300
				};
				begin3[]=
				{
					"A3\sounds_f\weapons\silenced\silent-11",
					1,
					1,
					300
				};
				soundBegin[]=
				{
					"begin1",
					0.333,
					"begin2",
					0.333,
					"begin3",
					0.333
				};
			};
			soundBurst=0;
			reloadTime=0.1;
			ffCount=3;
			recoil="recoil_auto_mk20";
			recoilProne="recoil_auto_prone_mk20";
			minRange=1;
			minRangeProbab=0.2;
			midRange=100;
			midRangeProbab=0.69999999;
			maxRange=300;
			maxRangeProbab=0.050000001;
			dispersion=0.001;
		};
		class WeaponSlotsInfo: WeaponSlotsInfo
		{
			class CowsSlot
			{
			};
			class PointerSlot
			{
			};
			class MuzzleSlot
			{
				displayName="Muzzle SLot";
				linkProxy="\A3\data_f\proxies\weapon_slots\MUZZLE";
				compatibleItems[]=
				{
					"CUP_muzzle_snds_M16",
					"CUP_muzzle_snds_M16_camo"
				};
			};
			mass=71;
		};
		class M203: UGL_F
		{
			displayName="M203";
			magazines[]=
			{
				"CUP_1Rnd_HE_M203",
				"CUP_1Rnd_HEDP_M203",
				"CUP_FlareWhite_M203",
				"CUP_FlareGreen_M203",
				"CUP_FlareRed_M203",
				"CUP_FlareYellow_M203",
				"CUP_1Rnd_Smoke_M203",
				"CUP_1Rnd_SmokeRed_M203",
				"CUP_1Rnd_SmokeGreen_M203",
				"CUP_1Rnd_SmokeYellow_M203",
				"1Rnd_HE_Grenade_shell",
				"UGL_FlareWhite_F",
				"UGL_FlareGreen_F",
				"UGL_FlareRed_F",
				"UGL_FlareYellow_F",
				"UGL_FlareCIR_F",
				"1Rnd_Smoke_Grenade_shell",
				"1Rnd_SmokeRed_Grenade_shell",
				"1Rnd_SmokeGreen_Grenade_shell",
				"1Rnd_SmokeYellow_Grenade_shell",
				"1Rnd_SmokePurple_Grenade_shell",
				"1Rnd_SmokeBlue_Grenade_shell",
				"1Rnd_SmokeOrange_Grenade_shell"
			};
			useModelOptics=0;
			useExternalOptic=0;
			cameraDir="OP_look";
			discreteDistance[]={50,75,100,150,200,250,300,350,400};
			discreteDistanceCameraPoint[]=
			{
				"OP_eye_50",
				"OP_eye_75",
				"OP_eye_100",
				"OP_eye_150",
				"OP_eye_200",
				"OP_eye_250",
				"OP_eye_300",
				"OP_eye_350",
				"OP_eye_400"
			};
			discreteDistanceInitIndex=1;
		};
	};
	class CUP_arifle_M16A2: CUP_arifle_M16_Base
	{
		author="CUP";
		scope=2;
		model="\CUP\Weapons\CUP_Weapons_M16\CUP_M16A2.p3d";
		picture="\CUP\Weapons\CUP_Weapons_M16\data\ui\gear_M16A2_X_ca.paa";
		inertia=0.5;
		dexterity=1.5;
		displayName="M16A2";
		class Library
		{
			libTextDesc="M16. THE rifle";
		};
		descriptionShort="M16A2";
		class WeaponSlotsInfo: WeaponSlotsInfo
		{
			mass=71;
		};
	};
	class CUP_arifle_M16A2_GL: CUP_arifle_M16_Base
	{
		author="CUP";
		scope=2;
		model="\CUP\Weapons\CUP_Weapons_M16\CUP_M16A2GL.p3d";
		picture="\CUP\Weapons\CUP_Weapons_M16\data\ui\gear_M16A2GL_X_ca.paa";
		handAnim[]=
		{
			"OFP2_ManSkeleton",
			"CUP\Weapons\CUP_Weapons_M16\data\anim\M16GL.rtm"
		};
		muzzles[]=
		{
			"this",
			"M203"
		};
		inertia=0.60000002;
		dexterity=1.4;
		displayName="M16A2 GL";
		class Library
		{
			libTextDesc="M16. THE rifle";
		};
		descriptionShort="M16A2 GL";
		class WeaponSlotsInfo: WeaponSlotsInfo
		{
			mass=100;
		};
	};
	class CUP_arifle_M16A4_Base: CUP_arifle_M16_Base
	{
		author="CUP";
		scope=2;
		model="\CUP\Weapons\CUP_Weapons_M16\CUP_M16A4.p3d";
		picture="\CUP\Weapons\CUP_Weapons_M16\data\ui\gear_M16A4_X_ca.paa";
		inertia=0.5;
		dexterity=1.5;
		displayName="M16A4";
		class Library
		{
			libTextDesc="M16. THE rifle";
		};
		descriptionShort="M16A4";
		class WeaponSlotsInfo: WeaponSlotsInfo
		{
			class CowsSlot
			{
			};
			class PointerSlot
			{
			};
			class CUP_PicatinnyTopMountM16: CUP_PicatinnyTopMount
			{
			};
			class CUP_PicatinnySideMountM16: CUP_PicatinnySideMount
			{
			};
			class MuzzleSlot
			{
				displayName="Muzzle SLot";
				linkProxy="\A3\data_f\proxies\weapon_slots\MUZZLE";
				compatibleItems[]=
				{
					"CUP_muzzle_snds_M16",
					"CUP_muzzle_snds_M16_camo"
				};
			};
			mass=40;
		};
	};
	class CUP_arifle_M16A4_GL: CUP_arifle_M16_Base
	{
		author="CUP";
		scope=2;
		model="\CUP\Weapons\CUP_Weapons_M16\CUP_M16A4GL.p3d";
		picture="\CUP\Weapons\CUP_Weapons_M16\data\ui\gear_M16A4GL_X_ca.paa";
		handAnim[]=
		{
			"OFP2_ManSkeleton",
			"CUP\Weapons\CUP_Weapons_M16\data\anim\M16GL.rtm"
		};
		muzzles[]=
		{
			"this",
			"M203"
		};
		displayName="M16A4 GL";
		class Library
		{
			libTextDesc="M16. THE rifle";
		};
		descriptionShort="M16A$ GL";
		class WeaponSlotsInfo: WeaponSlotsInfo
		{
			class CowsSlot
			{
			};
			class PointerSlot
			{
			};
			class CUP_PicatinnyTopMountM16: CUP_PicatinnyTopMount
			{
			};
			class CUP_PicatinnySideMountM16: CUP_PicatinnySideMount
			{
			};
			class MuzzleSlot
			{
				displayName="Muzzle SLot";
				linkProxy="\A3\data_f\proxies\weapon_slots\MUZZLE";
				compatibleItems[]=
				{
					"CUP_muzzle_snds_M16",
					"CUP_muzzle_snds_M16_camo"
				};
			};
			mass=100;
		};
		inertia=0.60000002;
		dexterity=1.4;
	};
	class CUP_arifle_M16A4_Aim_Laser: CUP_arifle_M16A4_Base
	{
		author="CUP";
		class LinkedItems
		{
			class LinkedItemsOptic
			{
				slot="CUP_PicatinnyTopMountM16";
				item="CUP_optic_CompM2_Black";
			};
			class LinkedItemsAcc
			{
				slot="CUP_PicatinnySideMountM16";
				item="CUP_acc_ANPEQ_2";
			};
		};
	};
	class CUP_arifle_M16A4_ACOG_Laser: CUP_arifle_M16A4_Base
	{
		author="CUP";
		class LinkedItems
		{
			class LinkedItemsOptic
			{
				slot="CUP_PicatinnyTopMountM16";
				item="CUP_optic_ACOG";
			};
			class LinkedItemsAcc
			{
				slot="CUP_PicatinnySideMountM16";
				item="CUP_acc_ANPEQ_2";
			};
		};
	};
	class CUP_arifle_M16A4_GL_Laser: CUP_arifle_M16A4_GL
	{
		author="CUP";
		class LinkedItems
		{
			class LinkedItemsOptic
			{
				slot="CUP_PicatinnyTopMountM16";
				item="CUP_optic_CompM2_Black";
			};
			class LinkedItemsAcc
			{
				slot="CUP_PicatinnySideMountM16";
				item="CUP_acc_ANPEQ_2";
			};
		};
	};
	class CUP_arifle_M16A4_GL_ACOG_Laser: CUP_arifle_M16A4_GL
	{
		author="CUP";
		class LinkedItems
		{
			class LinkedItemsOptic
			{
				slot="CUP_PicatinnyTopMountM16";
				item="CUP_optic_ACOG";
			};
			class LinkedItemsAcc
			{
				slot="CUP_PicatinnySideMountM16";
				item="CUP_acc_ANPEQ_2";
			};
		};
	};
	class CUP_arifle_M4_Base: CUP_arifle_M16A4_Base
	{
		author="CUP";
		scope=0;
		reloadMagazineSound[]=
		{
			"CUP\Weapons\CUP_Weapons_M16\data\sfx\Reload",
			1,
			1,
			35
		};
		drySound[]=
		{
			"CUP\Weapons\CUP_Weapons_M16\data\sfx\Dry",
			1,
			1,
			35
		};
		modes[]=
		{
			"Single",
			"FullAuto"
		};
		jsrs_soundeffect="JSRS2_Distance_Effects_M4";
		class Single: Mode_SemiAuto
		{
			sounds[]=
			{
				"StandardSound",
				"SilencedSound"
			};
			class BaseSoundModeType
			{
				weaponSoundEffect="DefaultRifle";
				closure1[]=
				{
					"A3\sounds_f\weapons\closure\closure_rifle_2",
					"db-12",
					1,
					10
				};
				closure2[]=
				{
					"A3\sounds_f\weapons\closure\closure_rifle_3",
					"db-12",
					1,
					10
				};
				soundClosure[]=
				{
					"closure1",
					0.5,
					"closure2",
					0.5
				};
			};
			class StandardSound: BaseSoundModeType
			{
				begin1[]=
				{
					"CUP\Weapons\CUP_Weapons_M16\data\sfx\M4_s1",
					1.77828,
					1,
					1000
				};
				begin2[]=
				{
					"CUP\Weapons\CUP_Weapons_M16\data\sfx\M4_s2",
					1.77828,
					1,
					1000
				};
				begin3[]=
				{
					"CUP\Weapons\CUP_Weapons_M16\data\sfx\M4_s3",
					1.77828,
					1,
					1000
				};
				begin4[]=
				{
					"CUP\Weapons\CUP_Weapons_M16\data\sfx\M4_s4",
					1.77828,
					1,
					1000
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
			class SilencedSound: BaseSoundModeType
			{
				begin1[]=
				{
					"A3\sounds_f\weapons\silenced\silent-18",
					1,
					1,
					300
				};
				begin2[]=
				{
					"A3\sounds_f\weapons\silenced\silent-19",
					1,
					1,
					300
				};
				begin3[]=
				{
					"A3\sounds_f\weapons\silenced\silent-11",
					1,
					1,
					300
				};
				soundBegin[]=
				{
					"begin1",
					0.333,
					"begin2",
					0.333,
					"begin3",
					0.333
				};
			};
			reloadTime=0.090000004;
			recoil="recoil_single_mk20";
			recoilProne="recoil_single_prone_mk20";
			dispersion=0.0017500001;
			minRange=2;
			minRangeProbab=0.30000001;
			midRange=150;
			midRangeProbab=0.69999999;
			maxRange=300;
			maxRangeProbab=0.050000001;
		};
		class FullAuto: Mode_FullAuto
		{
			sounds[]=
			{
				"StandardSound",
				"SilencedSound"
			};
			class BaseSoundModeType
			{
				weaponSoundEffect="DefaultRifle";
				closure1[]=
				{
					"A3\sounds_f\weapons\closure\closure_rifle_2",
					"db-12",
					1,
					10
				};
				closure2[]=
				{
					"A3\sounds_f\weapons\closure\closure_rifle_3",
					"db-12",
					1,
					10
				};
				soundClosure[]=
				{
					"closure1",
					0.5,
					"closure2",
					0.5
				};
			};
			class StandardSound: BaseSoundModeType
			{
				begin1[]=
				{
					"CUP\Weapons\CUP_Weapons_M16\data\sfx\M4_s1",
					1.77828,
					1,
					1000
				};
				begin2[]=
				{
					"CUP\Weapons\CUP_Weapons_M16\data\sfx\M4_s2",
					1.77828,
					1,
					1000
				};
				begin3[]=
				{
					"CUP\Weapons\CUP_Weapons_M16\data\sfx\M4_s3",
					1.77828,
					1,
					1000
				};
				begin4[]=
				{
					"CUP\Weapons\CUP_Weapons_M16\data\sfx\M4_s4",
					1.77828,
					1,
					1000
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
			class SilencedSound: BaseSoundModeType
			{
				begin1[]=
				{
					"A3\sounds_f\weapons\silenced\silent-18",
					1,
					1,
					300
				};
				begin2[]=
				{
					"A3\sounds_f\weapons\silenced\silent-19",
					1,
					1,
					300
				};
				begin3[]=
				{
					"A3\sounds_f\weapons\silenced\silent-11",
					1,
					1,
					300
				};
				soundBegin[]=
				{
					"begin1",
					0.333,
					"begin2",
					0.333,
					"begin3",
					0.333
				};
			};
			soundBurst=0;
			reloadTime=0.1;
			ffCount=3;
			recoil="recoil_auto_mk20";
			recoilProne="recoil_auto_prone_mk20";
			minRange=1;
			minRangeProbab=0.2;
			midRange=100;
			midRangeProbab=0.69999999;
			maxRange=300;
			maxRangeProbab=0.050000001;
			dispersion=0.0017500001;
		};
		class WeaponSlotsInfo: WeaponSlotsInfo
		{
			class CowsSlot
			{
			};
			class PointerSlot
			{
			};
			class MuzzleSlot
			{
				displayName="Muzzle SLot";
				linkProxy="\A3\data_f\proxies\weapon_slots\MUZZLE";
				compatibleItems[]=
				{
					"CUP_muzzle_snds_M16",
					"CUP_muzzle_snds_M16_camo"
				};
			};
			mass=40;
		};
		class M203: UGL_F
		{
			displayName="M203";
			magazines[]=
			{
				"CUP_1Rnd_HE_M203",
				"CUP_1Rnd_HEDP_M203",
				"CUP_FlareWhite_M203",
				"CUP_FlareGreen_M203",
				"CUP_FlareRed_M203",
				"CUP_FlareYellow_M203",
				"CUP_1Rnd_Smoke_M203",
				"CUP_1Rnd_SmokeRed_M203",
				"CUP_1Rnd_SmokeGreen_M203",
				"CUP_1Rnd_SmokeYellow_M203",
				"1Rnd_HE_Grenade_shell",
				"UGL_FlareWhite_F",
				"UGL_FlareGreen_F",
				"UGL_FlareRed_F",
				"UGL_FlareYellow_F",
				"UGL_FlareCIR_F",
				"1Rnd_Smoke_Grenade_shell",
				"1Rnd_SmokeRed_Grenade_shell",
				"1Rnd_SmokeGreen_Grenade_shell",
				"1Rnd_SmokeYellow_Grenade_shell",
				"1Rnd_SmokePurple_Grenade_shell",
				"1Rnd_SmokeBlue_Grenade_shell",
				"1Rnd_SmokeOrange_Grenade_shell"
			};
			useModelOptics=0;
			useExternalOptic=0;
			cameraDir="OP_look";
			discreteDistance[]={50,75,100,150,200,250,300,350,400};
			discreteDistanceCameraPoint[]=
			{
				"OP_eye_50",
				"OP_eye_75",
				"OP_eye_100",
				"OP_eye_150",
				"OP_eye_200",
				"OP_eye_250",
				"OP_eye_300",
				"OP_eye_350",
				"OP_eye_400"
			};
			discreteDistanceInitIndex=1;
		};
		class Library
		{
			libTextDesc="The Colt M4 is a shortened version of the M16";
		};
		descriptionShort="M4A1";
		inertia=0.40000001;
		dexterity=1.6;
		initSpeed=880;
	};
	class CUP_arifle_M4A1_BUIS_Base: CUP_arifle_M4_Base
	{
		author="CUP";
		scope=0;
		class WeaponSlotsInfo
		{
			class CowsSlot
			{
			};
			class PointerSlot
			{
			};
			class CUP_PicatinnyTopMountM4: CUP_PicatinnyTopMount
			{
			};
			class CUP_PicatinnySideMountM4: CUP_PicatinnySideMount
			{
			};
			class MuzzleSlot
			{
				displayName="Muzzle SLot";
				linkProxy="\A3\data_f\proxies\weapon_slots\MUZZLE";
				compatibleItems[]=
				{
					"CUP_muzzle_snds_M16",
					"CUP_muzzle_snds_M16_camo"
				};
			};
			mass=63;
		};
		inertia=0.40000001;
		dexterity=1.6;
	};
	class CUP_arifle_M4A1_BUIS_GL: CUP_arifle_M4A1_BUIS_Base
	{
		author="CUP";
		scope=2;
		model="\CUP\Weapons\CUP_Weapons_M16\CUP_M4_black_GL.p3d";
		displayName="M4A1 GL (black)";
		picture="\CUP\Weapons\CUP_Weapons_M16\data\ui\gear_M4GL_X_ca.paa";
		handAnim[]=
		{
			"OFP2_ManSkeleton",
			"CUP\Weapons\CUP_Weapons_M16\data\anim\M16GL.rtm"
		};
		muzzles[]=
		{
			"this",
			"M203"
		};
		class Library
		{
			libTextDesc="M4A1";
		};
		descriptionShort="M14A1 GL";
		inertia=0.5;
		dexterity=1.5;
		class WeaponSlotsInfo: WeaponSlotsInfo
		{
			mass=92;
		};
	};
	class CUP_arifle_M4A1_BUIS_camo_GL: CUP_arifle_M4A1_BUIS_Base
	{
		author="CUP";
		scope=2;
		model="\CUP\Weapons\CUP_Weapons_M16\CUP_M4_camo_GL.p3d";
		displayName="M4A1 GL (woodland)";
		picture="\CUP\Weapons\CUP_Weapons_M16\data\ui\gear_M4GLcamo_X_ca.paa";
		handAnim[]=
		{
			"OFP2_ManSkeleton",
			"CUP\Weapons\CUP_Weapons_M16\data\anim\M16GL.rtm"
		};
		muzzles[]=
		{
			"this",
			"M203"
		};
		class Library
		{
			libTextDesc="M4A1";
		};
		descriptionShort="M14A1 GL";
		inertia=0.5;
		dexterity=1.5;
		class WeaponSlotsInfo: WeaponSlotsInfo
		{
			mass=92;
		};
	};
	class CUP_arifle_M4A1_BUIS_desert_GL: CUP_arifle_M4A1_BUIS_Base
	{
		author="CUP";
		scope=2;
		model="\CUP\Weapons\CUP_Weapons_M16\CUP_M4_desert_GL.p3d";
		displayName="M4A1 GL (desert)";
		picture="\CUP\Weapons\CUP_Weapons_M16\data\ui\gear_m4gldesert_X_ca.paa";
		handAnim[]=
		{
			"OFP2_ManSkeleton",
			"CUP\Weapons\CUP_Weapons_M16\data\anim\M16GL.rtm"
		};
		muzzles[]=
		{
			"this",
			"M203"
		};
		class Library
		{
			libTextDesc="M4A1";
		};
		descriptionShort="M14A1 GL";
		inertia=0.5;
		dexterity=1.5;
		class WeaponSlotsInfo: WeaponSlotsInfo
		{
			mass=92;
		};
	};
	class CUP_arifle_M4A1: CUP_arifle_M4_Base
	{
		author="CUP";
		inertia=0.40000001;
		dexterity=1.6;
		scope=2;
		displayName="M4A1";
		model="\CUP\Weapons\CUP_Weapons_M16\CUP_M4A1.p3d";
		picture="\CUP\Weapons\CUP_Weapons_M16\data\ui\gear_M4A1_X_ca.paa";
		class WeaponSlotsInfo: WeaponSlotsInfo
		{
			mass=63;
			class PointerSlot
			{
			};
			class CUP_PicatinnySideMountM16
			{
			};
		};
	};
	class CUP_arifle_M4A1_camo: CUP_arifle_M4A1_BUIS_Base
	{
		author="CUP";
		scope=2;
		displayName="M4A1 (camo)";
		model="\CUP\Weapons\CUP_Weapons_M16\CUP_M4A1_BUIS.p3d";
		picture="\CUP\Weapons\CUP_Weapons_M16\data\ui\gear_M4_camo_X_ca.paa";
		inertia=0.40000001;
		dexterity=1.6;
		class WeaponSlotsInfo: WeaponSlotsInfo
		{
			mass=63;
		};
	};
	class CUP_arifle_M4A1_black: CUP_arifle_M4A1_BUIS_Base
	{
		author="CUP";
		scope=2;
		displayName="M4A1 (black)";
		model="\CUP\Weapons\CUP_Weapons_M16\CUP_M4A1_BUIS_black.p3d";
		picture="\CUP\Weapons\CUP_Weapons_M16\data\ui\gear_m4blk_X_ca.paa";
		inertia=0.40000001;
		dexterity=1.6;
		class WeaponSlotsInfo: WeaponSlotsInfo
		{
			mass=63;
		};
	};
	class CUP_arifle_M4A1_desert: CUP_arifle_M4A1_BUIS_Base
	{
		author="CUP";
		scope=2;
		displayName="M4A1 (desert)";
		model="\CUP\Weapons\CUP_Weapons_M16\CUP_M4A1_BUIS_desert.p3d";
		picture="\CUP\Weapons\CUP_Weapons_M16\data\ui\gear_M4A1desert_X_ca.paa";
		handAnim[]=
		{
			"OFP2_ManSkeleton",
			"\CUP\Weapons\CUP_Weapons_M16\data\anim\M4FG.rtm"
		};
		inertia=0.40000001;
		dexterity=1.6;
		class WeaponSlotsInfo: WeaponSlotsInfo
		{
			mass=63;
		};
	};
	class CUP_arifle_M4A3_desert: CUP_arifle_M4A1_BUIS_Base
	{
		author="CUP";
		scope=2;
		displayName="M4A3 (desert)";
		model="\CUP\Weapons\CUP_Weapons_M16\CUP_M4A3_desert.p3d";
		picture="\CUP\Weapons\CUP_Weapons_M16\data\ui\gear_M4A1desert_X_ca.paa";
		handAnim[]=
		{
			"OFP2_ManSkeleton",
			"\CUP\Weapons\CUP_Weapons_M16\data\anim\M4FG.rtm"
		};
		inertia=0.40000001;
		dexterity=1.6;
		class WeaponSlotsInfo: WeaponSlotsInfo
		{
			mass=63;
		};
	};
	class CUP_arifle_M4A1_camo_Aim: CUP_arifle_M4A1_camo
	{
		author="CUP";
		class LinkedItems
		{
			class LinkedItemsOptic
			{
				slot="CUP_PicatinnyTopMountM4";
				item="CUP_optic_CompM2_Woodland";
			};
		};
	};
	class CUP_arifle_M4A3_desert_Aim_Flashlight: CUP_arifle_M4A1_desert
	{
		author="CUP";
		displayName="M4A3 (desert)";
		class LinkedItems
		{
			class LinkedItemsOptic
			{
				slot="CUP_PicatinnyTopMountM4";
				item="CUP_optic_CompM2_Desert";
			};
			class LinkedItemsAcc
			{
				slot="CUP_PicatinnySideMountM4";
				item="CUP_acc_Flashlight_desert";
			};
		};
	};
	class CUP_arifle_M4A3_desert_GL_ACOG_Laser: CUP_arifle_M4A1_BUIS_desert_GL
	{
		author="CUP";
		class LinkedItems
		{
			class LinkedItemsOptic
			{
				slot="CUP_PicatinnyTopMountM4";
				item="CUP_optic_RCO_desert";
			};
			class LinkedItemsAcc
			{
				slot="CUP_PicatinnySideMountM4";
				item="CUP_acc_ANPEQ_2_desert";
			};
		};
	};
	class CUP_arifle_M4A1_Aim: CUP_arifle_M4A1_black
	{
		author="CUP";
		class LinkedItems
		{
			class LinkedItemsOptic
			{
				slot="CUP_PicatinnyTopMountM4";
				item="CUP_optic_CompM2_Black";
			};
		};
	};
	class CUP_arifle_M4A1_camo_AIM_snds: CUP_arifle_M4A1_camo
	{
		author="CUP";
		class LinkedItems
		{
			class LinkedItemsOptic
			{
				slot="CUP_PicatinnyTopMountM4";
				item="CUP_optic_CompM2_Woodland";
			};
			class LinkedItemsMuzzle
			{
				slot="MuzzleSlot";
				item="CUP_muzzle_snds_M16_camo";
			};
		};
	};
	class CUP_arifle_M4A1_GL_Holo_Flashlight: CUP_arifle_M4A1_BUIS_GL
	{
		author="CUP";
		class LinkedItems
		{
			class LinkedItemsOptic
			{
				slot="CUP_PicatinnyTopMountM4";
				item="CUP_optic_HoloBlack";
			};
			class LinkedItemsAcc
			{
				slot="CUP_PicatinnySideMountM4";
				item="CUP_acc_Flashlight";
			};
		};
	};
	class CUP_arifle_M4A1_GL_ACOG_Flashlight: CUP_arifle_M4A1_BUIS_GL
	{
		author="CUP";
		class LinkedItems
		{
			class LinkedItemsOptic
			{
				slot="CUP_PicatinnyTopMountM4";
				item="CUP_optic_RCO";
			};
			class LinkedItemsAcc
			{
				slot="CUP_PicatinnySideMountM4";
				item="CUP_acc_Flashlight";
			};
		};
	};
	class CUP_arifle_M4A1_camo_GL_Holo_Flashlight: CUP_arifle_M4A1_BUIS_camo_GL
	{
		author="CUP";
		class LinkedItems
		{
			class LinkedItemsOptic
			{
				slot="CUP_PicatinnyTopMountM4";
				item="CUP_optic_HoloWdl";
			};
			class LinkedItemsAcc
			{
				slot="CUP_PicatinnySideMountM4";
				item="CUP_acc_Flashlight_wdl";
			};
		};
	};
	class CUP_arifle_M4A1_camo_GL_Holo_Flashlight_Snds: CUP_arifle_M4A1_BUIS_camo_GL
	{
		author="CUP";
		class LinkedItems
		{
			class LinkedItemsOptic
			{
				slot="CUP_PicatinnyTopMountM4";
				item="CUP_optic_HoloWdl";
			};
			class LinkedItemsAcc
			{
				slot="CUP_PicatinnySideMountM4";
				item="CUP_acc_Flashlight_wdl";
			};
			class LinkedItemsMuzzle
			{
				slot="MuzzleSlot";
				item="CUP_muzzle_snds_M16_camo";
			};
		};
	};
	class CUP_srifle_Mk12SPR: CUP_arifle_M4A1
	{
		author="CUP";
		displayName="Mk 12 SPR";
		model="\CUP\Weapons\CUP_Weapons_M16\CUP_Mk12.p3d";
		picture="\CUP\Weapons\CUP_Weapons_M16\data\ui\gear_MK12_X_ca.paa";
		magazines[]=
		{
			"CUP_20Rnd_556x45_Stanag",
			"CUP_30Rnd_556x45_Stanag",
			"CUP_30Rnd_556x45_G36",
			"CUP_30Rnd_TE1_Red_Tracer_556x45_G36",
			"CUP_30Rnd_TE1_Green_Tracer_556x45_G36",
			"CUP_30Rnd_TE1_Yellow_Tracer_556x45_G36",
			"CUP_100Rnd_556x45_BetaCMag",
			"CUP_100Rnd_TE1_Red_Tracer_556x45_BetaCMag",
			"CUP_100Rnd_TE1_Green_Tracer_556x45_BetaCMag",
			"CUP_100Rnd_TE1_Yellow_Tracer_556x45_BetaCMag",
			"30Rnd_556x45_Stanag",
			"30Rnd_556x45_Stanag_Tracer_Red",
			"30Rnd_556x45_Stanag_Tracer_Green",
			"30Rnd_556x45_Stanag_Tracer_Yellow"
		};
		reloadMagazineSound[]=
		{
			"CUP\Weapons\CUP_Weapons_M16\data\sfx\SPR_Reload",
			1,
			1,
			35
		};
		drySound[]=
		{
			"CUP\Weapons\CUP_Weapons_M16\data\sfx\SPR_Dry",
			1,
			1,
			35
		};
		inertia=0.69999999;
		dexterity=1.3;
		initSpeed=820;
		modes[]=
		{
			"Single"
		};
		class Single: Mode_SemiAuto
		{
			sounds[]=
			{
				"StandardSound",
				"SilencedSound"
			};
			class BaseSoundModeType
			{
				weaponSoundEffect="DefaultRifle";
				closure1[]=
				{
					"A3\sounds_f\weapons\closure\closure_rifle_2",
					"db-12",
					1,
					10
				};
				closure2[]=
				{
					"A3\sounds_f\weapons\closure\closure_rifle_3",
					"db-12",
					1,
					10
				};
				soundClosure[]=
				{
					"closure1",
					0.5,
					"closure2",
					0.5
				};
			};
			class StandardSound: BaseSoundModeType
			{
				begin1[]=
				{
					"CUP\Weapons\CUP_Weapons_M16\data\sfx\SPR_s1",
					1.77828,
					1,
					1000
				};
				begin2[]=
				{
					"CUP\Weapons\CUP_Weapons_M16\data\sfx\SPR_s2",
					1.77828,
					1,
					1000
				};
				begin3[]=
				{
					"CUP\Weapons\CUP_Weapons_M16\data\sfx\SPR_s3",
					1.77828,
					1,
					1000
				};
				begin4[]=
				{
					"CUP\Weapons\CUP_Weapons_M16\data\sfx\SPR_s4",
					1.77828,
					1,
					1000
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
			class SilencedSound: BaseSoundModeType
			{
				begin1[]=
				{
					"A3\sounds_f\weapons\silenced\silent-18",
					1,
					1,
					300
				};
				begin2[]=
				{
					"A3\sounds_f\weapons\silenced\silent-19",
					1,
					1,
					300
				};
				begin3[]=
				{
					"A3\sounds_f\weapons\silenced\silent-11",
					1,
					1,
					300
				};
				soundBegin[]=
				{
					"begin1",
					0.333,
					"begin2",
					0.333,
					"begin3",
					0.333
				};
			};
			reloadTime=0.075000003;
			recoil="recoil_single_mk20";
			recoilProne="recoil_single_prone_mk20";
			dispersion=0.00044999999;
			minRange=0;
			minRangeProbab=0.30000001;
			midRange=300;
			midRangeProbab=0.69999999;
			maxRange=600;
			maxRangeProbab=0.050000001;
		};
		class WeaponSlotsInfo
		{
			class CowsSlot
			{
			};
			class PointerSlot
			{
			};
			class CUP_PicatinnyTopMountMk12: CUP_PicatinnyTopMount
			{
			};
			class CUP_PicatinnySideMountMk12: CUP_PicatinnySideMount
			{
			};
			class MuzzleSlot
			{
				displayName="Muzzle SLot";
				linkProxy="\A3\data_f\proxies\weapon_slots\MUZZLE";
				compatibleItems[]=
				{
					"CUP_muzzle_snds_M16",
					"CUP_muzzle_snds_M16_camo"
				};
			};
			mass=87;
		};
		class Library
		{
			libTextDesc="Mk12 Special Purpose Receiver";
		};
		descriptionShort="Mk12 SPR";
	};
	class CUP_srifle_Mk12SPR_LeupoldM3LR: CUP_srifle_Mk12SPR
	{
		author="CUP";
		class LinkedItems
		{
			class LinkedItemsOptic
			{
				slot="CUP_PicatinnyTopMountMk12";
				item="CUP_optic_LeupoldM3LR";
			};
		};
	};
};
