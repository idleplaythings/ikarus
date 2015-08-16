class CfgPatches
{
 	class IKRS_hlc_fal
 	{
 		units[] = {};
 		weapons[] = {};
 		requiredVersion = 0.1;
 		requiredAddons[] = {"a3_map_altis"};
 	};
};

class CfgWeapons
{
	class hlc_fal_base;
	class hlc_rifle_falosw: hlc_fal_base
	{
		magazines[]=
		{
			"20Rnd_762x51_Mag"
		};
		
		ACE_barrelTwist=304.8;
		ACE_barrelLength=330.2;
	};
	class hlc_rifle_osw_GL: hlc_rifle_falosw
	{
		magazines[]=
		{
			"20Rnd_762x51_Mag"
		};
		
		ACE_barrelTwist=304.8;
		ACE_barrelLength=330.2;
	};
	class hlc_rifle_SLR: hlc_fal_base
	{
		magazines[]=
		{
			"20Rnd_762x51_Mag"
		};
		
		ACE_barrelTwist=304.8;
		ACE_barrelLength=551.18;
	};
	class hlc_rifle_STG58F: hlc_fal_base
	{
		magazines[]=
		{
			"20Rnd_762x51_Mag"
		};
		
		ACE_barrelTwist=304.8;
		ACE_barrelLength=533.4;
	};
	class hlc_rifle_FAL5061: hlc_fal_base
	{
		magazines[]=
		{
			"20Rnd_762x51_Mag"
		};
		
		ACE_barrelTwist=304.8;
		ACE_barrelLength=457.2;
	};
	class hlc_rifle_L1A1SLR: hlc_rifle_SLR
	{
		magazines[]=
		{
			"20Rnd_762x51_Mag"
		};
		
		ACE_barrelTwist=304.8;
		ACE_barrelLength=551.18;
	};
	class hlc_rifle_c1A1: hlc_rifle_SLR
	{
		magazines[]=
		{
			"20Rnd_762x51_Mag"
		};
		
		ACE_barrelTwist=304.8;
		ACE_barrelLength=551.18;
	};
	class hlc_rifle_LAR: hlc_rifle_FAL5061
	{
		magazines[]=
		{
			"20Rnd_762x51_Mag"
		};
		
		ACE_barrelTwist=304.8;
		ACE_barrelLength=533.4;
	};
	class hlc_rifle_SLRchopmod: hlc_rifle_FAL5061
	{
		magazines[]=
		{
			"20Rnd_762x51_Mag"
		};
		
		ACE_barrelTwist=304.8;
		ACE_barrelLength=457.2;
    };
};