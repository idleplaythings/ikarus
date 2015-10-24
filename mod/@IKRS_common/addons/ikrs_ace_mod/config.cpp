class CfgPatches
{
 	class IKRS_ace_mod
 	{
 		units[] = {};
 		weapons[] = {};
 		requiredVersion = 0.1;
 		requiredAddons[] = {"a3_map_altis"};
 	};
};

class BulletBase;

class CfgAmmo
{
  class B_762x51_Ball : BulletBase {
    airFriction=-0.00100957;
    typicalSpeed=833;
    hit=12;
    tracerScale = 1.2; //0.6;
    tracerStartTime=0.073;  // Based on the British L5A1 which burns out to 1000m 
    tracerEndTime=2.15957;  // Time in seconds calculated with ballistics calculator
    ACE_caliber=7.823;
    ACE_bulletLength=28.956;
    ACE_bulletMass=9.4608;
    ACE_ammoTempMuzzleVelocityShifts[]={-26.55, -25.47, -22.85, -20.12, -16.98, -12.80, -7.64, -1.53, 5.96, 15.17, 26.19};
    ACE_ballisticCoefficients[]={0.2};
    ACE_velocityBoundaries[]={};
    ACE_standardAtmosphere="ICAO";
    ACE_dragModel=7;
    ACE_muzzleVelocities[]={700, 800, 820, 833, 845};
    ACE_barrelLengths[]={254.0, 406.4, 508.0, 609.6, 660.4};
  };
};