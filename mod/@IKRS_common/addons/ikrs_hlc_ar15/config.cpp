class CfgPatches
{
  class IKRS_hlc_ar15
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
  class Rifle;
  class Rifle_Base_F;
  
  class hlc_ar15_base: Rifle_Base_F
  {
        ACE_barrelTwist=177.8;
        ACE_barrelLength=292.1;
  };
  class hlc_rifle_RU556: hlc_ar15_base
  {
    ACE_barrelTwist=177.8;
    ACE_barrelLength=261.62;
        dexterity=1.6;
    inertia=0.4;

    class Single: Mode_SemiAuto { dispersion = 0.0013; reloadTime = 0.075; };
    class FullAuto: Mode_FullAuto { dispersion = 0.0013; reloadTime = 0.075; };
    class WeaponSlotsInfo: WeaponSlotsInfo { mass=85; };
  };
  class hlc_rifle_RU5562: hlc_rifle_RU556
  {
    ACE_barrelTwist=177.8;
    ACE_barrelLength=261.62;
    dexterity=1.7;
    inertia=0.35;

    class Single: Mode_SemiAuto { dispersion = 0.0014; reloadTime = 0.075; };
    class FullAuto: Mode_FullAuto { dispersion = 0.0014; reloadTime = 0.075; };
    class WeaponSlotsInfo: WeaponSlotsInfo { mass=85; };
  };
  class hlc_rifle_CQBR: hlc_rifle_RU556
  {
    ACE_barrelTwist=177.8;
    ACE_barrelLength=254.0;
    dexterity=1.7;
    inertia=0.3;

    class Single: Mode_SemiAuto { dispersion = 0.00185;  reloadTime = 0.075; };
    class FullAuto: Mode_FullAuto { dispersion = 0.00185;  reloadTime = 0.075; };
    class WeaponSlotsInfo: WeaponSlotsInfo { mass=75; };
  };
  class hlc_rifle_M4: hlc_rifle_RU556
  {
    ACE_barrelTwist=177.8;
    ACE_barrelLength=368.3;
    dexterity=1.6;
    inertia=0.4;

    class Single: Mode_SemiAuto { dispersion = 0.0015; reloadTime = 0.075; };
    class FullAuto: Mode_FullAuto { dispersion = 0.0015; reloadTime = 0.075; };
    class WeaponSlotsInfo: WeaponSlotsInfo { mass=80; };
  };
  class hlc_rifle_m4m203: hlc_rifle_M4
  {
    dexterity=1.5;
    inertia=0.5;

    class Single: Mode_SemiAuto { dispersion = 0.0015; reloadTime = 0.075; };
    class FullAuto: Mode_FullAuto { dispersion = 0.0015; reloadTime = 0.075; };
    class WeaponSlotsInfo: WeaponSlotsInfo { mass=100; };
  };
  class hlc_rifle_bcmjack: hlc_ar15_base
  {
    ACE_barrelTwist=177.8;
    ACE_barrelLength=368.3;
    dexterity=1.5;
    inertia=0.5;

    class Single: Mode_SemiAuto { dispersion = 0.00116; reloadTime = 0.075; };
    class FullAuto: Mode_FullAuto { dispersion = 0.00116; reloadTime = 0.075; };
    class WeaponSlotsInfo: WeaponSlotsInfo { mass=95; };
  };
  class hlc_rifle_Colt727: hlc_ar15_base
  {
    ACE_barrelTwist=177.8;
    ACE_barrelLength=368.3;
    dexterity=1.5;
    inertia=0.5;

    class Single: Mode_SemiAuto { dispersion = 0.00155; reloadTime = 0.086; };
    class FullAuto: Mode_FullAuto { dispersion = 0.00155; reloadTime = 0.086; };
    class WeaponSlotsInfo: WeaponSlotsInfo { mass=85; };
  };
  class hlc_rifle_Colt727_GL: hlc_rifle_Colt727
  {
    ACE_barrelTwist=177.8;
    ACE_barrelLength=368.3;
    dexterity=1.4;
    inertia=0.6;
    
    class WeaponSlotsInfo: WeaponSlotsInfo { mass=115; };
  };
  class hlc_rifle_Bushmaster300: hlc_rifle_Colt727
  {
    ACE_barrelTwist=203.2;
    ACE_barrelLength=368.3;
    dexterity=1.3;
    inertia=0.5;

    class Single: Mode_SemiAuto { dispersion = 0.0015; reloadTime = 0.075; };
    class FullAuto: Mode_FullAuto { dispersion = 0.0015; reloadTime = 0.075; };
    class WeaponSlotsInfo: WeaponSlotsInfo { mass=100; };
  };
  class hlc_rifle_vendimus: hlc_rifle_Bushmaster300
  {
    ACE_barrelTwist=203.2;
    ACE_barrelLength=406.4;
    dexterity=1.25;
    inertia=0.55;

    class Single: Mode_SemiAuto { dispersion = 0.0014; reloadTime = 0.086; };
    class FullAuto: Mode_FullAuto { dispersion = 0.0014; reloadTime = 0.086; };
    class WeaponSlotsInfo: WeaponSlotsInfo { mass=105; };
  };
  class hlc_rifle_SAMR: hlc_rifle_RU556
  {
    ACE_barrelTwist=228.6;
    ACE_barrelLength=406.4;
    dexterity=1.2;
    inertia=0.55;

    class Single: Mode_SemiAuto { dispersion = 0.0009; reloadTime = 0.086; };
    class FullAuto: Mode_FullAuto { dispersion = 0.0009; reloadTime = 0.086; };
    class WeaponSlotsInfo: WeaponSlotsInfo { mass=105; };
  };

  class hlc_rifle_honeybase: hlc_rifle_RU556
  {
    ACE_barrelTwist=203.2;
    ACE_barrelLength=152.4;
    dexterity=1.7;
    inertia=0.3;

    class Single: Mode_SemiAuto { dispersion = 0.00185; reloadTime = 0.086; };
    class FullAuto: Mode_FullAuto { dispersion = 0.00185; reloadTime = 0.086; };
    class WeaponSlotsInfo: WeaponSlotsInfo { mass=80; };
  };
};