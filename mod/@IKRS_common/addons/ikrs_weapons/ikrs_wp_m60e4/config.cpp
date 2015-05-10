class CfgPatches
{
	class ikrs_weapons_m60e4
	{
		requiredaddons[]=
		{
			"A3_Data_F",
			"A3_UI_F",
			"A3_Anims_F",
			"A3_Anims_F_Config_Sdr",
			"A3_Weapons_F",
			"asdg_jointrails",
			"hlcweapons_core",
			"hlcweapons_m60e4"
		};
		weapons[]=
		{
			"ikrs_lmg_M60E4",
			"ikrs_lmg_m60"
		};
		magazines[]=
		{
			"ikrs_100Rnd_762x51_M_M60E4"
		};
		version="1.0";
		author="popo";
		units[]={};
		ammo[]={};
	};
};

class CfgMagazines
{
	class hlc_100Rnd_762x51_M_M60E4;
	class ikrs_100Rnd_762x51_M_M60E4: hlc_100Rnd_762x51_M_M60E4
	{
		author="Toadie, Ikarus Team";
		displayname="M60E4 Belt 100rnd 7.62mm";
		mass=14;
	};
};


class Mode_SemiAuto;
class Mode_Burst;
class Mode_FullAuto;

class WeaponSlotsInfo;



class CfgWeapons
{
	class hlc_lmg_M60E4;
	class ikrs_lmg_M60E4: hlc_lmg_M60E4
	{
		author="Bohemia Interactive, Toadie, Ikarus Team";
		initSpeed=715;

		dexterity=1.2;
		inertia=0.5;

		magazines[]=
		{
			"ikrs_100Rnd_762x51_M_M60E4"
		};

		class FullAuto: Mode_FullAuto
		{
			reloadTime=0.105;
			recoil="recoil_auto_mk200";
			recoilProne="recoil_auto_prone_mk200";
			dispersion=0.000261799;
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
					"\hlc_wp_M60E4\snd\m60_first",
					1,
					1,
					10
				};
				closure2[]=
				{
					"\hlc_wp_M60E4\snd\m60_first",
					1,
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
					"\hlc_wp_M60E4\snd\m60_fire_1p",
					1,
					1,
					1200
				};
				begin2[]=
				{
					"\hlc_wp_M60E4\snd\m60_fire_1p",
					1,
					1,
					1200
				};
				begin3[]=
				{
					"\hlc_wp_M60E4\snd\m60_fire_1p",
					1,
					1,
					1200
				};
				soundBegin[]=
				{
					"begin1",
					0.33000001,
					"begin2",
					0.33000001,
					"begin3",
					0.34
				};
			};
			class SilencedSound: BaseSoundModeType
			{
				begin1[]=
				{
					"\hlc_wp_M60E4\snd\m60_first",
					1,
					1,
					200
				};
				begin2[]=
				{
					"\hlc_wp_M60E4\snd\m60_first",
					1,
					1,
					200
				};
				soundBegin[]=
				{
					"begin1",
					0.5,
					"begin2",
					0.5
				};
			};
			begin1[]=
			{
				"\hlc_wp_M60E4\snd\m60_fire_1p",
				1,
				1,
				1200
			};
			begin2[]=
			{
				"\hlc_wp_M60E4\snd\m60_fire_1p",
				1,
				1,
				1200
			};
			soundBegin[]=
			{
				"begin1",
				0.5,
				"begin2",
				0.5
			};
			closure1[]=
			{
				"\hlc_wp_M60E4\snd\m60_first",
				3.1622777,
				1,
				30
			};
			closure2[]=
			{
				"\hlc_wp_M60E4\snd\m60_first",
				3.1622777,
				1,
				30
			};
			soundClosure[]=
			{
				"closure1",
				0.5,
				"closure2",
				0.5
			};
			weaponSoundEffect="DefaultRifle";
			maxrange=600;
			maxrangeprobab=0.050000001;
			midrange=300;
			midrangeprobab=0.69999999;
			minrange=1;
			minrangeprobab=0.30000001;
			airateoffire=4;
		};
		class WeaponSlotsInfo: WeaponSlotsInfo
		{
			mass=105;
		};
	};
	
	class hlc_lmg_m60;
	class ikrs_lmg_m60: hlc_lmg_m60
	{
		author="Twinke Masta, Millenia, Toadie, Ikarus Team";
		initSpeed="900"
		dexterity=1.4;
		inertia=0.5;

		magazines[]=
		{
			"ikrs_100Rnd_762x51_M_M60E4"
		};

		class FullAuto: Mode_FullAuto
		{
			reloadTime=0.105;
			recoil="recoil_auto_mk200";
			recoilProne="recoil_auto_prone_mk200";
			dispersion=0.000261799;
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
					"\hlc_wp_M60E4\snd\m60_first",
					1,
					1,
					10
				};
				closure2[]=
				{
					"\hlc_wp_M60E4\snd\m60_first",
					1,
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
					"\hlc_wp_M60E4\snd\m60_fire_1p",
					1,
					1,
					1200
				};
				begin2[]=
				{
					"\hlc_wp_M60E4\snd\m60_fire_1p",
					1,
					1,
					1200
				};
				begin3[]=
				{
					"\hlc_wp_M60E4\snd\m60_fire_1p",
					1,
					1,
					1200
				};
				soundBegin[]=
				{
					"begin1",
					0.33000001,
					"begin2",
					0.33000001,
					"begin3",
					0.34
				};
			};
			class SilencedSound: BaseSoundModeType
			{
				begin1[]=
				{
					"\hlc_wp_M60E4\snd\m60_first",
					1,
					1,
					200
				};
				begin2[]=
				{
					"\hlc_wp_M60E4\snd\m60_first",
					1,
					1,
					200
				};
				soundBegin[]=
				{
					"begin1",
					0.5,
					"begin2",
					0.5
				};
			};
			begin1[]=
			{
				"\hlc_wp_M60E4\snd\m60_fire_1p",
				1,
				1,
				1200
			};
			begin2[]=
			{
				"\hlc_wp_M60E4\snd\m60_fire_1p",
				1,
				1,
				1200
			};
			soundBegin[]=
			{
				"begin1",
				0.5,
				"begin2",
				0.5
			};
			closure1[]=
			{
				"\hlc_wp_M60E4\snd\m60_first",
				3.1622777,
				1,
				30
			};
			closure2[]=
			{
				"\hlc_wp_M60E4\snd\m60_first",
				3.1622777,
				1,
				30
			};
			soundClosure[]=
			{
				"closure1",
				0.5,
				"closure2",
				0.5
			};
			weaponSoundEffect="DefaultRifle";
			maxrange=600;
			maxrangeprobab=0.050000001;
			midrange=300;
			midrangeprobab=0.69999999;
			minrange=1;
			minrangeprobab=0.30000001;
			airateoffire=4;
		};
		class WeaponSlotsInfo: WeaponSlotsInfo
		{
			mass=100;
		};
	};
};
