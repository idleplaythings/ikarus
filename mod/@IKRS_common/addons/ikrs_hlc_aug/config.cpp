class CfgPatches
{
 	class IKRS_hlc_aug
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
	class hlc_aug_base;
	class hlc_rifle_aug: hlc_aug_base
	{
		ACE_barrelTwist=228.6;
		ACE_barrelLength=508.0;
		dexterity=1.6;
    	inertia=0.4;

		class FullAuto: Mode_FullAuto { dispersion = 0.00115; reloadTime = 0.086; };
    	class WeaponSlotsInfo: WeaponSlotsInfo { mass=90; };
	};
	class hlc_rifle_auga1carb: hlc_rifle_aug
	{
		ACE_barrelTwist=228.6;
		ACE_barrelLength=406.4;
	};
	class hlc_rifle_aughbar: hlc_rifle_aug
	{
		ACE_barrelTwist=228.6;
		ACE_barrelLength=609.6;
	};
	class hlc_rifle_augpara: hlc_rifle_aug
	{
		ACE_barrelTwist=228.6;
		ACE_barrelLength=419.1;
	};
	class hlc_rifle_auga2: hlc_rifle_aug
	{
		ACE_barrelTwist=228.6;
		ACE_barrelLength=508.0;
	};
	class hlc_rifle_auga2para: hlc_rifle_auga2
	{
		ACE_barrelTwist=228.6;
		ACE_barrelLength=419.1;
	};
	class hlc_rifle_auga2carb: hlc_rifle_auga2
	{
		ACE_barrelTwist=228.6;
		ACE_barrelLength=457.2;
	};
	class hlc_rifle_auga2lsw: hlc_rifle_aughbar
	{
		ACE_barrelTwist=228.6;
		ACE_barrelLength=609.6;
	};
	class hlc_rifle_auga3: hlc_rifle_aug
	{
		ACE_barrelTwist=228.6;
		ACE_barrelLength=457.2;
	};
};