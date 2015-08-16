class CfgPatches
{
 	class IKRS_hlc_m14
 	{
 		units[] = {};
 		weapons[] = {};
 		requiredVersion = 0.1;
 		requiredAddons[] = {"a3_map_altis"};
 	};
};

class WeaponSlotsInfo;
class Single;
class Burst;
class FullAuto;
class Mode_SemiAuto;
class Mode_Burst;
class Mode_FullAuto;

class CfgWeapons
{
	class Rifle_Base_F;
	class hlc_M14_base: Rifle_Base_F
	{
		ACE_barrelTwist=304.8;
		ACE_barrelLength=558.8;
	};

	class hlc_rifle_M14: hlc_M14_base {
		dexterity=1.6;
		inertia=0.8;
		magazines[]=
		{
			"20Rnd_762x51_Mag"
		};

		class Single: Mode_SemiAuto { dispersion = 0.00095; };
        class FullAuto: Mode_FullAuto {	dispersion = 0.00095; };
        class WeaponSlotsInfo: WeaponSlotsInfo { mass=130; };
	};

	class hlc_rifle_m14sopmod: hlc_rifle_M14
	{
		ACE_barrelTwist=304.8;
		ACE_barrelLength=457.2;

		magazines[]=
		{
			"20Rnd_762x51_Mag"
		};
    };
};
