class CfgPatches
{
 	class IKRS_hlc_ak
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
  class optic_dms;
  class hlc_ak_base;
  class InventoryOpticsItem_Base_F;

  class hlc_rifle_ak74: hlc_ak_base
  {
    ACE_barrelTwist=199.898;
    ACE_barrelLength=414.02;
    dexterity=1.4;
    inertia=0.5;

    class Single: Mode_SemiAuto { dispersion = 0.00125; reloadTime = 0.086; };
    class FullAuto: Mode_FullAuto { dispersion = 0.00125; reloadTime = 0.086; };
    class WeaponSlotsInfo: WeaponSlotsInfo { mass=100; };
  };

  class hlc_rifle_aks74: hlc_rifle_ak74 {
    ACE_barrelTwist=199.898;
    ACE_barrelLength=414.02;
    dexterity=1.4;
    inertia=0.5;

    class Single: Mode_SemiAuto { dispersion = 0.0013; reloadTime = 0.086; };
    class FullAuto: Mode_FullAuto { dispersion = 0.0013; reloadTime = 0.086; };
    class WeaponSlotsInfo: WeaponSlotsInfo { mass=95; };
  };
reloadTime = 0.086;
  class hlc_rifle_aks74_GL: hlc_rifle_aks74 {
    dexterity=1.3;
    inertia=0.6;
    class WeaponSlotsInfo: WeaponSlotsInfo { mass=115; };
  };

  class hlc_rifle_ak12: hlc_ak_base
  {
    ACE_barrelTwist=199.898;
    ACE_barrelLength=414.02;
    dexterity=1.4;
    inertia=0.5;

    class Single: Mode_SemiAuto { dispersion = 0.0001; reloadTime = 0.086; };
    class Burst: Mode_Burst { dispersion = 0.0001; reloadTime = 0.076; };
    class FullAuto: Mode_FullAuto { dispersion = 0.0001; reloadTime = 0.086; };
    class WeaponSlotsInfo: WeaponSlotsInfo { mass=100; };
  };

  class hlc_rifle_ak12GL: hlc_rifle_ak12 {
    dexterity=1.3;
    inertia=0.6;
    class Single: Mode_SemiAuto { dispersion = 0.0001; reloadTime = 0.086; };
    class Burst: Mode_Burst { dispersion = 0.0001; reloadTime = 0.076; };
    class FullAuto: Mode_FullAuto { dispersion = 0.0001; reloadTime = 0.086; };
    class WeaponSlotsInfo: WeaponSlotsInfo { mass=120; };
  };

  class hlc_rifle_aku12: hlc_rifle_ak12
  {
    ACE_barrelTwist=160.02;
    ACE_barrelLength=210.82;
    dexterity=1.7;
    inertia=0.3;

    class Single: Mode_SemiAuto { dispersion = 0.0015; reloadTime = 0.086;};
    class Burst: Mode_Burst { dispersion = 0.0015; reloadTime = 0.076; };
    class FullAuto: Mode_FullAuto { dispersion = 0.0015; reloadTime = 0.086; };
    class WeaponSlotsInfo: WeaponSlotsInfo { mass=80; };
  };
  class hlc_rifle_RPK12: hlc_rifle_ak12
  {
    ACE_barrelLength=589.28;
    dexterity=1.2;
    inertia=0.7;

    class Single: Mode_SemiAuto { dispersion = 0.00009; reloadTime = 0.086;};
    class Burst: Mode_Burst { dispersion = 0.00009; reloadTime = 0.076;};
    class FullAuto: Mode_FullAuto { dispersion = 0.00009; reloadTime = 0.086;};
    class WeaponSlotsInfo: WeaponSlotsInfo { mass=135; };
  };

  class hlc_rifle_aks74u: hlc_rifle_ak74
  {
    ACE_barrelTwist=160.02;
    ACE_barrelLength=210.82;
    dexterity=1.7;
    inertia=0.3;

    class Single: Mode_SemiAuto { dispersion = 0.00175; reloadTime = 0.086; };
    class FullAuto: Mode_FullAuto { dispersion = 0.00175; reloadTime = 0.086; };
    class WeaponSlotsInfo: WeaponSlotsInfo { mass=80; };
  };
  class hlc_rifle_ak47: hlc_rifle_ak74
  {
    ACE_barrelTwist=240.03;
    ACE_barrelLength=414.02;
    dexterity=1.25;
    inertia=0.5;

    class FullAuto: Mode_FullAuto { dispersion = 0.00013; reloadTime = 0.097; };
    class Single: Mode_SemiAuto { dispersion = 0.00013; reloadTime = 0.097; };
    class WeaponSlotsInfo: WeaponSlotsInfo { mass=120; };
  };
  class hlc_rifle_akm: hlc_rifle_ak47
  {
    ACE_barrelTwist=199.898;
    ACE_barrelLength=414.02;
    dexterity=1.3;
    inertia=0.5;

    class Single: Mode_SemiAuto { dispersion = 0.00015; reloadTime = 0.097; };
    class FullAuto: Mode_FullAuto { dispersion = 0.00015; reloadTime = 0.097; };
    class WeaponSlotsInfo: WeaponSlotsInfo { mass=100; };
  };
  class hlc_rifle_akmgl: hlc_rifle_akm {
    dexterity=1.2;
    inertia=0.6;
    class WeaponSlotsInfo: WeaponSlotsInfo { mass=120; };
  };
  class hlc_rifle_rpk: hlc_rifle_ak47
  {
    ACE_barrelTwist=240.03;
    ACE_barrelLength=589.28;
    dexterity=1.1;
    inertia=0.8;

    class Single: Mode_SemiAuto { dispersion = 0.00013; reloadTime = 0.1; };
    class FullAuto: Mode_FullAuto { dispersion = 0.00013; reloadTime = 0.1; };
    class WeaponSlotsInfo: WeaponSlotsInfo { mass=135; };
  };
  class hlc_rifle_rpk74n: hlc_rifle_rpk
  {
    ACE_barrelTwist=240.03;
    ACE_barrelLength=589.28;
    dexterity=1.2;
    inertia=0.7;

    class Single: Mode_SemiAuto { dispersion = 0.000115; reloadTime = 0.092; };
    class FullAuto: Mode_FullAuto { dispersion = 0.000115; reloadTime = 0.092; };
    class WeaponSlotsInfo: WeaponSlotsInfo { mass=135; };
  };
  class hlc_rifle_aek971: hlc_rifle_ak74
  {
    ACE_barrelTwist=241.3;
    ACE_barrelLength=431.8;
    dexterity=1.4;
    inertia=0.5;

    class Single: Mode_SemiAuto { dispersion = 0.000125; reloadTime = 0.068; };
    class Burst: Mode_Burst { dispersion = 0.000125;  reloadTime = 0.068; };
    class FullAuto: Mode_FullAuto { dispersion = 0.000125;  reloadTime = 0.068; };
    class WeaponSlotsInfo: WeaponSlotsInfo { mass=105; };
  };
  class hlc_rifle_saiga12k: hlc_rifle_ak47
  {
    ACE_barrelTwist=0.0;
    ACE_twistDirection=0;
    ACE_barrelLength=429.26;
    dexterity=1.4;
    inertia=0.5;

    class Single: Mode_SemiAuto { dispersion = 0.00066; reloadTime = 0.1; };
    class WeaponSlotsInfo: WeaponSlotsInfo { mass=100; };
    };
    
    class HLC_Optic_PSO1 : optic_dms {
        ACE_ScopeAdjust_Vertical[] = { 0, 0 };
        ACE_ScopeAdjust_Horizontal[] = { -10, 10 };
        ACE_ScopeAdjust_Increment = 0.5;
        class ItemInfo : InventoryOpticsItem_Base_F {
            class OpticsModes {
                class Snip {
          discreteDistance[]={100, 200, 300, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000};
          discreteDistanceInitIndex=3;
                };
            };
        };
    };    
    class HLC_Optic_1p29 : HLC_Optic_PSO1 {
        ACE_ScopeAdjust_Vertical[] = {};
        ACE_ScopeAdjust_Horizontal[] = {};
        ACE_ScopeAdjust_Increment = 0;
    };
};