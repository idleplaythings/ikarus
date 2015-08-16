class CfgPatches
{
 	class IKRS_hlc_g3
 	{
 		units[] = {};
 		weapons[] = {};
 		requiredVersion = 0.1;
 		requiredAddons[] = {"a3_map_altis"};
 	};
};


class CfgWeapons
{
	class hlc_g3_base;
	class hlc_rifle_g3sg1: hlc_g3_base
	{
		magazines[]=
		{
			"20Rnd_762x51_Mag"
		};
		
		ACE_barrelTwist=304.8;
		ACE_barrelLength=449.58;
	};
	class hlc_rifle_psg1: hlc_rifle_g3sg1
	{
		magazines[]=
		{
			"20Rnd_762x51_Mag"
		};
		
		ACE_barrelTwist=304.8;
		ACE_barrelLength=650.24;
	};
	class hlc_rifle_g3a3: hlc_rifle_g3sg1
	{
		magazines[]=
		{
			"20Rnd_762x51_Mag"
		};
		
		ACE_barrelTwist=304.8;
		ACE_barrelLength=449.58;
	};
	class hlc_rifle_g3a3ris: hlc_rifle_g3a3
	{
		magazines[]=
		{
			"20Rnd_762x51_Mag"
		};
		
		ACE_barrelTwist=304.8;
		ACE_barrelLength=449.58;
	};
	class hlc_rifle_g3ka4: hlc_rifle_g3a3
	{
		magazines[]=
		{
			"20Rnd_762x51_Mag"
		};
		
		ACE_barrelTwist=304.8;
		ACE_barrelLength=314.96;
	};
	class HLC_Rifle_g3ka4_GL: hlc_rifle_g3ka4
	{
		magazines[]=
		{
			"20Rnd_762x51_Mag"
		};
		
		ACE_barrelTwist=304.8;
		ACE_barrelLength=314.96;
	};
	class hlc_rifle_hk51: hlc_rifle_g3sg1
	{
		ACE_barrelTwist=304.8;
		ACE_barrelLength=211.074;
	};
	class hlc_rifle_hk53: hlc_rifle_g3sg1
	{
		ACE_barrelTwist=177.8;
		ACE_barrelLength=211.074;
    };
};
