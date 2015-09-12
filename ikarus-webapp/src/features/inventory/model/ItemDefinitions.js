
var battleRifles = [
  'hlc_rifle_M14',
  'hlc_rifle_c1A1',
  'hlc_rifle_g3a3ris',
  'srifle_DMR_06_camo_F',
  'srifle_DMR_06_olive_F',
  'srifle_EBR_F',
  'srifle_DMR_03_F'
];

var tactiCools = [
  'arifle_Mk20_F',
  'arifle_Mk20C_F',
  'arifle_Mk20_GL_F',
  'hlc_rifle_RU556',
  'hlc_rifle_RU5562',
  'hlc_rifle_CQBR',
  'hlc_rifle_bcmjack',
  'hlc_rifle_Bushmaster300',
  'hlc_rifle_vendimus',
  'hlc_rifle_samr2',
  'arifle_Katiba_C_F',
  'arifle_Katiba_F',
  'arifle_MX_F',
  'arifle_MX_GL_F',
  'arifle_MXC_F',
  'optic_MRCO',
  'hlc_rifle_auga1_b',
  'hlc_rifle_auga2_b'
];


var mediumOptics = [
  'optic_Arco',
  'optic_Hamr',
  'optic_MRCO'
];

var ghillie = [
  'U_B_FullGhillie_lsh',
  'U_B_FullGhillie_sard',
  'U_B_FullGhillie_ard'
];


ItemDefinitions = [

  //RESOURCES


  createGeneric('Outpost backpack', 'IKRS_outpost_backpack', ['resource', 'missionkey']),
  createGeneric('Loot key level 1', 'IKRS_loot_key1', ['resource', 'missionkey']),
  createGeneric('Loot key level 2', 'IKRS_loot_key2', ['resource', 'missionkey']),
  createGeneric('Intelligence (Weapon depot)', 'IKRS_intelligence_weapon', ['resource', 'missionkey']),
  createGeneric('Intelligence (Vehicle depot)', 'IKRS_intelligence_vehicle', ['resource', 'missionkey']),
  createGeneric('Intelligence (Helicopter depot)', 'IKRS_intelligence_helo', ['resource', 'missionkey']),
  createGeneric('Signal device', 'IKRS_signal_device', ['resource', 'missionkey']),


  createGeneric('Money', 'money', ['resource', 'non mission item']),
  createGeneric('Renown', 'IKRS_renown', ['non mission item']),

  //VEHICLES
  createGeneric('Pickup truck', 'C_Offroad_01_F', ['vehicle', 'unarmored', 'unarmed']),
  createGeneric('SUV', 'C_SUV_01_F', ['vehicle', 'unarmored', 'unarmed']),
  createGeneric('Hatchback sport', 'C_Hatchback_01_sport_F', ['vehicle', 'unarmored', 'unarmed']),
  createGeneric('Flatbed', 'C_Van_01_transport_F', ['vehicle', 'unarmored', 'unarmed']),
  createGeneric('UAZ', 'UAZ_Unarmed', ['vehicle', 'unarmored', 'unarmed']),
  createGeneric('Landrover (Desert)', 'BAF_Offroad_D', ['vehicle', 'unarmored', 'unarmed']),
  createGeneric('Landrover (Woodland)', 'BAF_Offroad_W', ['vehicle', 'unarmored', 'unarmed']),
  createGeneric('Stomper UGV', 'B_UGV_01_F', ['vehicle', 'armored', 'unarmed', 'uav']),

  createGeneric('Jackal L2A1 (Desert)', 'BAF_Jackal2_L2A1_D', ['vehicle', 'armored', 'armed']),
  createGeneric('Jackal L2A1 (Woodland)', 'BAF_Jackal2_L2A1_W', ['vehicle', 'armored', 'armed']),
  createGeneric('Fennek', 'I_MRAP_03_F', ['vehicle', 'armored', 'unarmed']),
  createGeneric('M-ATV', 'B_MRAP_01_F', ['vehicle', 'armored', 'unarmed']),
  createGeneric('Punisher', 'O_MRAP_02_F', ['vehicle', 'armored', 'unarmed']),
  createGeneric('UAZ (AGS-30)', 'UAZ_AGS30', ['vehicle', 'armored', 'unarmed']),

  createGeneric('Littlebird', 'B_Heli_Light_01_F', ['helicopter', 'unarmed']),
  createGeneric('AW159 Wildcat', 'I_Heli_light_03_unarmed_F', ['helicopter', 'unarmed']),
  createGeneric('Ka-60 Kasatka', 'O_Heli_Light_02_unarmed_F', ['helicopter', 'unarmed']),


  createGeneric('Civilian helicopter', 'C_Heli_Light_01_civil_F', ['helicopter', 'unarmed']),
  createGeneric('Civilian helicopter', 'C_Heli_light_01_blue_F', ['helicopter', 'unarmed']),
  createGeneric('Civilian helicopter', 'C_Heli_light_01_red_F', ['helicopter', 'unarmed']),
  createGeneric('Civilian helicopter', 'C_Heli_light_01_ion_F', ['helicopter', 'unarmed']),
  createGeneric('Civilian helicopter', 'C_Heli_light_01_blueLine_F', ['helicopter', 'unarmed']),
  createGeneric('Civilian helicopter', 'C_Heli_light_01_digital_F', ['helicopter', 'unarmed']),
  createGeneric('Civilian helicopter', 'C_Heli_light_01_elliptical_F', ['helicopter', 'unarmed']),
  createGeneric('Civilian helicopter', 'C_Heli_light_01_furious_F', ['helicopter', 'unarmed']),
  createGeneric('Civilian helicopter', 'C_Heli_light_01_graywatcher_F', ['helicopter', 'unarmed']),
  createGeneric('Civilian helicopter', 'C_Heli_light_01_jeans_F', ['helicopter', 'unarmed']),
  createGeneric('Civilian helicopter', 'C_Heli_light_01_light_F', ['helicopter', 'unarmed']),
  createGeneric('Civilian helicopter', 'C_Heli_light_01_shadow_F', ['helicopter', 'unarmed']),
  createGeneric('Civilian helicopter', 'C_Heli_light_01_sheriff_F', ['helicopter', 'unarmed']),
  createGeneric('Civilian helicopter', 'C_Heli_light_01_speedy_F', ['helicopter', 'unarmed']),
  createGeneric('Civilian helicopter', 'C_Heli_light_01_sunset_F', ['helicopter', 'unarmed']),
  createGeneric('Civilian helicopter', 'C_Heli_light_01_vrana_F', ['helicopter', 'unarmed']),
  createGeneric('Civilian helicopter', 'C_Heli_light_01_wasp_F', ['helicopter', 'unarmed']),
  createGeneric('Civilian helicopter', 'C_Heli_light_01_wave_F', ['helicopter', 'unarmed']),
  createGeneric('Civilian helicopter', 'C_Heli_light_01_stripped_F', ['helicopter', 'unarmed']),
  createGeneric('Civilian helicopter', 'C_Heli_light_01_luxe_F', ['helicopter', 'unarmed']),

  //ASSAULT RIFLES (HLC)

  createWeapon('Izhmash AK74', 'hlc_rifle_ak74', ['assault-rifle'], ["hlc_30Rnd_545x39_B_AK","hlc_45Rnd_545x39_t_rpk"]),
  createWeapon('Izhmash AKS74','hlc_rifle_aks74',['assault-rifle'], ["hlc_30Rnd_545x39_B_AK","hlc_45Rnd_545x39_t_rpk"]),
  createWeapon('Izhmash AK12','hlc_rifle_ak12',['assault-rifle'], ["hlc_30Rnd_545x39_B_AK","hlc_45Rnd_545x39_t_rpk"]),
  createWeapon('Izhmash AK12(GL)','hlc_rifle_ak12GL',['assault-rifle'], ["hlc_30Rnd_545x39_B_AK","hlc_45Rnd_545x39_t_rpk", "hlc_VOG25_AK"]),
  createWeapon('Izhmash RPK12','hlc_rifle_RPK12',['lmg'], ["hlc_30Rnd_545x39_B_AK","hlc_45Rnd_545x39_t_rpk"]),
  createWeapon('Izhmash AKS74U','hlc_rifle_aks74u',['assault-rifle'], ["hlc_30Rnd_545x39_B_AK","hlc_45Rnd_545x39_t_rpk"]),
  createWeapon('Izhmash RPK74','hlc_rifle_rpk74n',['lmg'], ["hlc_30Rnd_545x39_B_AK","hlc_45Rnd_545x39_t_rpk"]),
  createWeapon('Izhmash AKS74(GL)','hlc_rifle_aks74_GL',['assault-rifle'], ["hlc_30Rnd_545x39_B_AK","hlc_45Rnd_545x39_t_rpk", "hlc_VOG25_AK"]),
  createWeapon('ZID AEK971S','hlc_rifle_aek971',['assault-rifle'], ["hlc_30Rnd_545x39_B_AK","hlc_45Rnd_545x39_t_rpk"]),

  createWeapon('Izhmash AK47','hlc_rifle_ak47',['assault-rifle'], ["hlc_30Rnd_762x39_b_ak","hlc_45Rnd_762x39_m_rpk"]),
  createWeapon('Izhmash AKM','hlc_rifle_akm',['assault-rifle'], ["hlc_30Rnd_762x39_b_ak","hlc_45Rnd_762x39_m_rpk"]),
  createWeapon('Izhmash RPK','hlc_rifle_rpk',['lmg'], ["hlc_30Rnd_762x39_b_ak","hlc_45Rnd_762x39_m_rpk"]),

  createMagazine('30rnd 5.45x39mm', 'hlc_30Rnd_545x39_B_AK', 30),
  createMagazine('45rnd 5.45x39mm', 'hlc_45Rnd_545x39_t_rpk', 75),

  createMagazine('30rnd 7.62x39mm', 'hlc_30Rnd_762x39_b_ak', 30),
  createMagazine('45rnd 7.62x39mm', 'hlc_45Rnd_762x39_m_rpk', 75),

  createWeapon('AR15 Sanitised Carbine', 'hlc_rifle_RU556', ['assault-rifle'], ["30Rnd_556x45_Stanag"]),
  createWeapon('AR15 Magpul Carbine', 'hlc_rifle_RU5562', ['assault-rifle'], ["30Rnd_556x45_Stanag"]),
  createWeapon('Colt M4 CQB-R', 'hlc_rifle_CQBR', ['assault-rifle'], ["30Rnd_556x45_Stanag"]),
  createWeapon('Colt M4 Carbine', 'hlc_rifle_M4', ['assault-rifle'], ["30Rnd_556x45_Stanag"]),
  createWeapon('Colt M4 Carbine (GL)', 'hlc_rifle_m4m203', ['assault-rifle'], ["30Rnd_556x45_Stanag", "1Rnd_HE_Grenade_shell"]),
  createWeapon('BCM "Jack" Carbine', 'hlc_rifle_bcmjack', ['assault-rifle'], ["30Rnd_556x45_Stanag"]),
  createWeapon('Colt Carbine', 'hlc_rifle_Colt727', ['assault-rifle'], ["30Rnd_556x45_Stanag"]),
  createWeapon('Colt Carbine(GL)', 'hlc_rifle_Colt727_GL', ['assault-rifle'], ["30Rnd_556x45_Stanag", "1Rnd_HE_Grenade_shell"]),
  createWeapon('Bushmaster .300 Carbine', 'hlc_rifle_Bushmaster300', ['assault-rifle'], ["29rnd_300BLK_STANAG"]),
  createWeapon('AR15 .300 Dissipator', 'hlc_rifle_vendimus', ['assault-rifle'], ["29rnd_300BLK_STANAG"]),
  createWeapon('AAC "Honey-Badger"', 'hlc_rifle_honeybadger', ['assault-rifle'], ["29rnd_300BLK_STANAG"]),
  createWeapon('RRA LAR-15', 'hlc_rifle_SAMR', ['assault-rifle'], ["30Rnd_556x45_Stanag"]),
  createWeapon('RRA LAR-15', 'hlc_rifle_samr2', ['assault-rifle'], ["30Rnd_556x45_Stanag"]),

  createMagazine('29rnd .300 cal blackout', '29rnd_300BLK_STANAG', 29),

  createWeapon('Steyr AUG A1', 'hlc_rifle_auga1_b', ['assault-rifle'], ["hlc_30Rnd_556x45_B_AUG"]),
  createWeapon('Steyr AUG A2', 'hlc_rifle_auga2_b', ['assault-rifle'], ["hlc_30Rnd_556x45_B_AUG"]),
  createMagazine('30rnd 5.56x45 AUG', 'hlc_30Rnd_556x45_B_AUG', 30),


  //ASSAULT RIFLES (CUP)

  createWeapon('AK-74 assault rifle', 'CUP_arifle_AK74', ['assault-rifle'], ['CUP_30Rnd_545x39_AK_M']),
  createMagazine('30rnd 5.45x39mm', 'CUP_30Rnd_545x39_AK_M', 30),

  createWeapon('M16A2 assault rifle (no rail)', 'CUP_arifle_M16A2', ['assault-rifle'], ['30Rnd_556x45_Stanag']),
  createMagazine('30rnd 5.56x45mm', '30Rnd_556x45_Stanag', 30),
  createMagazine('30rnd 5.56x45mm', 'CUP_30Rnd_556x45_Stanag', 30),

  createWeapon('AKM assault rifle', 'CUP_arifle_AKM', ['assault-rifle'], ['CUP_30Rnd_762x39_AK47_M']),
  createMagazine('30rnd 7.62x39mm', 'CUP_30Rnd_762x39_AK47_M', 30),

  createWeapon('M4A1 assault rifle', 'CUP_arifle_M4A1_black', ['assault-rifle'], ['30Rnd_556x45_Stanag']),
  createWeapon('M16A4 assault rifle', 'CUP_arifle_M16A4_Base', ['assault-rifle'], ['30Rnd_556x45_Stanag']),

  createWeapon('AK-107 assault rifle', 'CUP_arifle_AK107', ['assault-rifle'], ['CUP_30Rnd_545x39_AK_M']),

  //ASSAULT RIFLES (Vanilla)

  createWeapon('Katiba Carbine', 'arifle_Katiba_C_F', ['assault-rifle'], ['30Rnd_65x39_caseless_green']),
  createWeapon('Katiba', 'arifle_Katiba_F', ['assault-rifle'], ['30Rnd_65x39_caseless_green']),
  createWeapon('Katiba (GL)', 'arifle_Katiba_GL_F', ['assault-rifle'], ['30Rnd_65x39_caseless_green', '1Rnd_HE_Grenade_shell']),
  createMagazine('30rnd 6.5 caseless CSAT', '30Rnd_65x39_caseless_green', 30),

  createWeapon('Mk20 (Camo)', 'arifle_Mk20_F', ['assault-rifle'], ['30Rnd_556x45_Stanag']),
  createWeapon('Mk20 (Desert)', 'arifle_Mk20_plain_F', ['assault-rifle'], ['30Rnd_556x45_Stanag']),
  createWeapon('Mk20 Carbine (Camo)', 'arifle_Mk20C_F', ['assault-rifle'], ['30Rnd_556x45_Stanag']),
  createWeapon('Mk20 Carbine (Desert)', 'arifle_Mk20C_plain_F', ['assault-rifle'], ['30Rnd_556x45_Stanag']),
  createWeapon('Mk20 GL (Camo)', 'arifle_Mk20_GL_F', ['assault-rifle'], ['30Rnd_556x45_Stanag', '1Rnd_HE_Grenade_shell']),
  createWeapon('Mk20 GL (Desert)', 'arifle_Mk20_GL_plain_F', ['assault-rifle'], ['30Rnd_556x45_Stanag', '1Rnd_HE_Grenade_shell']),

  createWeapon('TRG-21', 'arifle_TRG21_F', ['assault-rifle'], ['30Rnd_556x45_Stanag']),
  createWeapon('TRG-20 Carbine', 'arifle_TRG20_F', ['assault-rifle'], ['30Rnd_556x45_Stanag']),
  createWeapon('TRG-21 GL', 'arifle_TRG21_GL_F', ['assault-rifle'], ['30Rnd_556x45_Stanag']),

  createWeapon('MX', 'arifle_MX_F', ['assault-rifle'], ['30Rnd_65x39_caseless_mag']),
  createWeapon('MX (Black)', 'arifle_MX_Black_F', ['assault-rifle'], ['30Rnd_65x39_caseless_mag']),
  createWeapon('MX GL', 'arifle_MX_GL_F', ['assault-rifle'], ['30Rnd_65x39_caseless_mag', '1Rnd_HE_Grenade_shell']),
  createWeapon('MX GL (Black)', 'arifle_MX_GL_Black_F', ['assault-rifle'], ['30Rnd_65x39_caseless_mag', '1Rnd_HE_Grenade_shell']),
  createWeapon('MX Carbine', 'arifle_MXC_F', ['assault-rifle'], ['30Rnd_65x39_caseless_mag']),
  createWeapon('MX Carbine (Black)', 'arifle_MXC_Black_F', ['assault-rifle'], ['30Rnd_65x39_caseless_mag']),

  createMagazine('30rnd 6.5 caseless NATO', '30Rnd_65x39_caseless_mag', 30),



  //BATTLE RIFLES (CUP)
  createWeapon('M14 battle rifle', 'CUP_srifle_M14', ['assault-rifle'], ['20Rnd_762x51_Mag']),
  createMagazine('20rnd 7.62x51mm NATO', '20Rnd_762x51_Mag', 20),

  createWeapon('FN FAL (no rail)', 'CUP_arifle_FNFAL', ['assault-rifle'], ['CUP_20Rnd_762x51_FNFAL_M']),
  createMagazine('20rnd 7.62x51mm FN FAL', 'CUP_20Rnd_762x51_FNFAL_M', 20),

  //BATTLE RIFLES (HLC)

  createWeapon('Springfield Armory M14', 'hlc_rifle_M14', ['assault-rifle'], ['20Rnd_762x51_Mag']),
  createWeapon('FN C1A1', 'hlc_rifle_c1A1', ['assault-rifle'], ['20Rnd_762x51_Mag']),

  createWeapon('G3A3 RIS', 'hlc_rifle_g3a3ris', ['assault-rifle'], ['20Rnd_762x51_Mag']),


  //BATTLE RIFLES (Vanilla)


  createWeapon('Mk14 7.62mm (camo)', 'srifle_DMR_06_camo_F', ['assault-rifle'], ['20Rnd_762x51_Mag']),
  createWeapon('Mk14 7.62mm (olive)', 'srifle_DMR_06_olive_F', ['assault-rifle'], ['20Rnd_762x51_Mag']),

  createWeapon('Mk18 ABR 7.62 mm', 'srifle_EBR_F', ['assault-rifle'], ['20Rnd_762x51_Mag']),


  //MACHINE GUNS (HLC)

  createWeapon('M249E2 lmg (no rail)', 'hlc_lmg_M249E2', ['lmg'], ['hlc_200rnd_556x45_T_SAW', '30Rnd_556x45_Stanag']),
  createMagazine('200rnd box 5.56x45mm', 'hlc_200rnd_556x45_T_SAW', 30),

  createWeapon('M249E2 lmg (RIS/13.7 in)', 'hlc_m249_pip1', ['lmg'], ['hlc_200rnd_556x45_T_SAW', '30Rnd_556x45_Stanag']),



  //MACHINE GUNS (CUP)

  createWeapon('M249 lmg', 'CUP_lmg_M249', ['lmg'], ['CUP_200Rnd_TE4_Red_Tracer_556x45_M249', '30Rnd_556x45_Stanag']),
  createMagazine('200rnd box 5.56x45mm', 'CUP_200Rnd_TE4_Red_Tracer_556x45_M249', 30),

  createWeapon('RPK-74 lmg', 'CUP_arifle_RPK74', ['lmg'], ['CUP_75Rnd_TE4_LRT4_Green_Tracer_545x39_RPK_M', 'CUP_30Rnd_545x39_AK_M']),
  createMagazine('75rnd 5.45x39mm', 'CUP_75Rnd_TE4_LRT4_Green_Tracer_545x39_RPK_M', 75),

  createWeapon('PKM mmg', 'CUP_lmg_PKM', ['mmg'], ['CUP_100Rnd_TE4_LRT4_762x54_PK_Tracer_Green_M']),
  createMagazine('100rnd 7.62x54mm', 'CUP_100Rnd_TE4_LRT4_762x54_PK_Tracer_Green_M', 100),

  //MACHINE GUNS (Vanilla)

  createWeapon('MX Support weapon', 'arifle_MX_SW_F', ['lmg'], ['30Rnd_65x39_caseless_mag']),
  createWeapon('MX Support weapon (black)', 'arifle_MX_SW_Black_F', ['lmg'], ['30Rnd_65x39_caseless_mag']),
  createMagazine('100rnd 6.5 caseless NATO', '100Rnd_65x39_caseless_mag', 100),

  createWeapon('Mk 200 LMG', 'LMG_Mk200_F', ['lmg'], ['200Rnd_65x39_cased_Box']),
  createMagazine('6.5mm 200Rnd belt', '200Rnd_65x39_cased_Box', 200),

  createWeapon('Zafir 7.62 LMG', 'LMG_Zafir_F', ['mmg'], ['150Rnd_762x54_Box']),
  createMagazine('150rnd 7.62x54mm box', '150Rnd_762x54_Box', 150),

  createWeapon('Navid 9.3mm MMG (hex)', 'MMG_01_hex_F', ['mmg'], ['150Rnd_93x64_Mag']),
  createWeapon('Navid 9.3mm MMG (desert)', 'MMG_01_tan_F', ['mmg'], ['150Rnd_93x64_Mag']),
  createMagazine('150rnd 9.3x64mm belt', '150Rnd_93x64_Mag', 150),

  createWeapon('SPMG .338 MMG (camo)', 'MMG_02_camo_F', ['lmg'], ['130Rnd_338_Mag']),
  createWeapon('SPMG .338 MMG (black)', 'MMG_02_black_F', ['lmg'], ['130Rnd_338_Mag']),
  createWeapon('SPMG .338 MMG (desert)', 'MMG_02_sand_F', ['lmg'], ['130Rnd_338_Mag']),
  createMagazine('130rnd .338 NM Belt', '130Rnd_338_Mag', 130),

  //SNIPER RIFLES (CUP)

  createWeapon('Lee Einfield rifle', 'CUP_srifle_LeeEnfield', ['rifle'], ['CUP_10x_303_M']),
  createWeapon('Lee Einfield rifle (rail)', 'CUP_srifle_LeeEnfield_rail', ['rifle'], ['CUP_10x_303_M']),
  createMagazine('10rnd .303', 'CUP_10x_303_M', 10),

  createWeapon('CZ 550 hunting rifle', 'CUP_srifle_CZ550', ['rifle'], ['CUP_5x_22_LR_17_HMR_M']),
  createMagazine('5rnd 22Lr', 'CUP_5x_22_LR_17_HMR_M', 5),

  createWeapon('Dragunov SVD sniper rifle', 'CUP_srifle_SVD', ['sniper-rifle'], ['CUP_10Rnd_762x54_SVD_M']),
  createMagazine('10rnd 7.62x51mm', 'CUP_10Rnd_762x54_SVD_M', 10),

  createWeapon('M24 sniper rifle', 'CUP_srifle_M24_wdl', ['sniper-rifle'], ['CUP_5Rnd_762x51_M24']),
  createMagazine('5rnd 762x51mm NATO', 'CUP_5Rnd_762x51_M24', 5),

  //SNIPER RIFLES (Vanilla)

  createWeapon('MAR-10 .338 (black)', 'srifle_DMR_02_F', ['sniper-rifle'], ['10Rnd_338_Mag']),
  createWeapon('MAR-10 .338 (camo)', 'srifle_DMR_02_camo_F', ['sniper-rifle'], ['10Rnd_338_Mag']),
  createWeapon('MAR-10 .338 (desert)', 'srifle_DMR_02_sniper_F', ['sniper-rifle'], ['10Rnd_338_Mag']),
  createMagazine('10rnd .338', '10Rnd_338_Mag', 10),

  createWeapon('Mk-I EMR 7.62mm (black)', 'srifle_DMR_03_F', ['sniper-rifle'], ['20Rnd_762x51_Mag']),
  createWeapon('Mk-I EMR 7.62mm (khaki)', 'srifle_DMR_03_khaki_F', ['sniper-rifle'], ['20Rnd_762x51_Mag']),
  createWeapon('Mk-I EMR 7.62mm (desert)', 'srifle_DMR_03_tan_F', ['sniper-rifle'], ['20Rnd_762x51_Mag']),
  createWeapon('Mk-I EMR 7.62mm (camo)', 'srifle_DMR_03_multicam_F', ['sniper-rifle'], ['20Rnd_762x51_Mag']),
  createWeapon('Mk-I EMR 7.62mm (woodland)', 'srifle_DMR_03_woodland_F', ['sniper-rifle'], ['20Rnd_762x51_Mag']),

  createWeapon('ASP-1 Kir 12.7mm (black)', 'srifle_DMR_04_F', ['sniper-rifle'], ['10Rnd_127x54_Mag']),
  createWeapon('ASP-1 Kir 12.7mm (desert)', 'srifle_DMR_04_Tan_F', ['sniper-rifle'], ['10Rnd_127x54_Mag']),
  createMagazine('10rnd 12.7mm mag', '10Rnd_127x54_Mag', 10),

  createWeapon('Cyrus 9.3mm (black)', 'srifle_DMR_05_blk_F', ['sniper-rifle'], ['10Rnd_93x64_DMR_05_Mag']),
  createWeapon('Cyrus 9.3mm (hex)', 'srifle_DMR_05_hex_F', ['sniper-rifle'], ['10Rnd_93x64_DMR_05_Mag']),
  createWeapon('Cyrus 9.3mm (desert)', 'srifle_DMR_05_tan_F', ['sniper-rifle'], ['10Rnd_93x64_DMR_05_Mag']),
  createMagazine('10rnd 9.3mm mag', '10Rnd_93x64_DMR_05_Mag', 10),

  createWeapon('Rahim 7.62mm', 'srifle_DMR_01_F', ['sniper-rifle'], ['10Rnd_762x54_Mag']),
  createMagazine('10rnd 7.62x54mm Mag', '10Rnd_762x54_Mag', 10),

  createWeapon('MXM Marksman rifle', 'arifle_MXM_F', ['sniper-rifle'], ['30Rnd_65x39_caseless_mag']),
  createWeapon('MXM Marksman rifle (black)', 'arifle_MXM_Black_F', ['sniper-rifle'], ['30Rnd_65x39_caseless_mag']),

  //STATIC WEAPONS

  createGeneric('Mk6 Mortar base', 'B_Mortar_01_support_F', ['static weapon']),
  createGeneric('Mk6 Mortar tube', 'B_Mortar_01_weapon_F', ['static weapon']),

  createGeneric('M2 .50 cal HMG tripod', 'RDS_M2_MiniTripod_Bag', ['static weapon']),
  createGeneric('M2 .50 cal HMG gun', 'RDS_M2_Gun_Bag', ['static weapon']),

  createGeneric('DShkM HMG tripod', 'RDS_DShkM_TripodLow_Bag', ['static weapon']),
  createGeneric('DShkM HMG gun', 'RDS_DShkM_Gun_Bag', ['static weapon']),

  //LAUNCHERS

  createWeapon('RPG-7V launcher', 'launch_RPG7V', ['rpg'], ['RPG7_PG7V']),
  createMagazine('RPG-7 AT rocket', 'RPG7_PG7V', 1),

  createWeapon('NLAW', 'launch_NLAW_F', ['rpg'], ['NLAW_F']),
  createMagazine('NLAW AT rocket', 'NLAW_F', 1),

  createWeapon('RPG-32', 'launch_RPG32_F', ['rpg'], ['RPG32_F']),
  createMagazine('RPG-32 AT rocket', 'RPG32_F', 1),

  //LAUCHERS (CUP)

  createWeapon('RPG-7V launcher', 'CUP_launch_RPG7V', ['rpg'], ['CUP_PG7V_M']),
  createMagazine('RPG-7 AT rocket', 'CUP_PG7V_M', 1),

  createWeapon('M79 Grenadelauncher', 'CUP_glaunch_M79', ['grenade-launcher'], ['1Rnd_HE_Grenade_shell']),
  createMagazine('HE M203 grenade', 'CUP_1Rnd_HE_M203', 1),
  createMagazine('Smoke M203 grenade', 'CUP_1Rnd_Smoke_M203', 1),
  createMagazine('Red smoke M203 grenade', 'CUP_1Rnd_SmokeRed_M203', 1),

  createWeapon('M32 Grenadelauncher', 'CUP_glaunch_M32', ['grenade-launcher'], ['CUP_6Rnd_HE_M203', 'CUP_6Rnd_Smoke_M203']),
  createMagazine('HE M203 grenade', 'CUP_6Rnd_HE_M203', 6),
  createMagazine('Smoke M203 grenade', 'CUP_6Rnd_Smoke_M203', 6),

  createWeapon('NLAW launcher', 'CUP_launch_NLAW', ['law'], ['CUP_NLAW_M']),
  createMagazine('NLAW AT rocket', 'CUP_NLAW_M', 1),


  //WEARABLES


  createGeneric('Full Ghillie (Lush)', 'U_B_FullGhillie_lsh', ['tactical-vest']),
  createGeneric('Full Ghillie (Semi-Arid)', 'U_B_FullGhillie_sard', ['tactical-vest']),
  createGeneric('Full Ghillie (Arid)', 'U_B_FullGhillie_ard', ['tactical-vest']),


  createBackpack('Assault Pack (Khaki)', 'B_AssaultPack_khk', ['backpack'], true),

  createGeneric('Tactical vest (camo)', 'V_TacVest_camo', ['tactical-vest']),
  createGeneric('Tactical vest (black)', 'V_TacVest_blk', ['tactical-vest']),
  createGeneric('Tactical vest (olive)', 'V_TacVest_oli', ['tactical-vest']),

  //Light armor
  createGeneric('GA carrier lite (digi)', 'V_PlateCarrierIA1_dgtl', ['tactical-vest']),
  //Medium armor
  createGeneric('GA carrier rig (digi)', 'V_PlateCarrierIA2_dgtl', ['tactical-vest']),

  //Light armor
  createGeneric('Carrier lite (black, US)', 'V_PlateCarrier1_blk', ['tactical-vest']),
  createGeneric('Carrier lite (green, US)', 'V_PlateCarrier1_rgr', ['tactical-vest']),

  //Medium armor
  createGeneric('Carrier rig (green, US)', 'V_PlateCarrier2_rgr', ['tactical-vest']),

  //Heavy armor
  createGeneric('GA Carrier GL Rig (digi)', 'V_PlateCarrierIAGL_dgtl', ['tactical-vest']),
  createGeneric('GA Carrier GL Rig (olive)', 'V_PlateCarrierIAGL_oli', ['tactical-vest']),

  //Heavy armor
  createGeneric('Carrier GL Rig (green, US)', 'V_PlateCarrierGL_rgr', ['tactical-vest']),
  createGeneric('Carrier GL Rig (black, US)', 'V_PlateCarrierGL_blk', ['tactical-vest']),
  createGeneric('Carrier GL Rig (mtp, US)', 'V_PlateCarrierGL_mtp', ['tactical-vest']),

  //Medium heavy armor
  createGeneric('Carrier Special Rig (green, US)', 'V_PlateCarrierSpec_rgr', ['tactical-vest']),
  createGeneric('Carrier Special Rig (black, US)', 'V_PlateCarrierSpec_blk', ['tactical-vest']),
  createGeneric('Carrier Special Rig (mtp, US)', 'V_PlateCarrierSpec_mtp', ['tactical-vest']),

  createGeneric('ECH helmet', 'H_HelmetB', ['helmet']),
  createGeneric('MICH helmet', 'H_HelmetIA', ['helmet']),





  //WEAPON ATTACHMENTS (HLC)

  createGeneric('Kobra Reflex Sight', 'hlc_optic_kobra', ['sight']),
  createGeneric('PSO-1 Scope', 'HLC_Optic_PSO1', ['scope']),

  //WEAPON ATTACHMENTS (CUP)

  createGeneric('Kobra Reflex Sight', 'CUP_optic_Kobra', ['sight']),
  createGeneric('PSO-1 Scope', 'CUP_optic_PSO_1', ['scope']),
  createGeneric('M68 CCO red dot optic', 'CUP_optic_CompM2_Black', ['sight']),
  createGeneric('Leupold Mark 4 10x40mm LR/T', 'CUP_optic_LeupoldMk4_10x40_LRT_Woodland', ['scope']),

  createGeneric('Trijicon ACOG optic', 'CUP_optic_RCO', ['scope']),
  createGeneric('Aimpoint CompM4 optic', 'CUP_optic_CompM4', ['scope']),

  //WEAPON ATTACHMENTS (Vanilla)

  createGeneric('Mk17 Holosight SMG','optic_Holosight_smg', ['scope']),
  createGeneric('ACO SMG (Red)','optic_Aco_smg', ['scope']),
  createGeneric('ACO SMG (Green)','optic_ACO_grn_smg', ['scope']),


  createGeneric('Honeybadger supressor', 'muzzle_HBADGER', ['scope']),
  createGeneric('Sound Suppressor (.45 ACP)', 'muzzle_snds_acp', ['scope']),
  createGeneric('Sound Suppressor (9 mm)', 'muzzle_snds_L', ['scope']),

  createGeneric('Mk17 Holosight','optic_Holosight', ['scope']),
  createGeneric('ACO (Red)','optic_Aco', ['scope']),
  createGeneric('ACO (Green)','optic_ACO_grn', ['scope']),

  createGeneric('ARCO','optic_Arco', ['scope']),
  createGeneric('DMS','optic_DMS', ['scope']),
  createGeneric('Long-Range Precision Scope','optic_LRPS', ['scope']),
  createGeneric('Nightstalker','optic_Nightstalker', ['scope']),
  createGeneric('Night Vision Scope','optic_NVS', ['scope']),
  createGeneric('Marksman Optical Sights','optic_SOS', ['scope']),

  createGeneric('RCO', 'optic_Hamr', ['scope']),
  createGeneric('MRCO', 'optic_MRCO', ['scope']),

  createGeneric('Bipod (black) (NATO)', 'bipod_01_F_blk', ['scope']),
  createGeneric('Bipod (MTP) (NATO)', 'bipod_01_F_mtp', ['scope']),
  createGeneric('Bipod (desert) (NATO)', 'bipod_01_F_snd', ['scope']),
  createGeneric('Bipod (black) (CSAT)', 'bipod_02_F_blk', ['scope']),
  createGeneric('Bipod (hex) (CSAT)', 'bipod_02_F_hex', ['scope']),
  createGeneric('Bipod (desert) (CSAT)', 'bipod_02_F_tan', ['scope']),
  createGeneric('Bipod (black) (AAF)', 'bipod_03_F_blk', ['scope']),
  createGeneric('Bipod (olive) (AAF)', 'bipod_03_F_oli', ['scope']),



  //GENERIC

  createGeneric('AR-2 Darter UAV (backpack)', 'B_UAV_01_backpack_F', ['binoculars']),

  createGeneric('GPS', 'ItemGPS', ['binoculars']),
  createGeneric('Binoculars', 'Binocular', ['binoculars']),
  createGeneric('RGO Hand grenade', 'HandGrenade', ['grenade']),
  createGeneric('Smoke grenade', 'SmokeShell', ['grenade']),

  createMagazine('40mm HE grenade', '1Rnd_HE_Grenade_shell', 1),
  createMagazine('40mm VOG25 HE grenade', 'hlc_VOG25_AK', 1),



  //PISTOLS (CUP)

  createWeapon('Makarov handgun', 'CUP_hgun_Makarov', ['handgun'], ['CUP_8Rnd_9x18_Makarov_M']),
  createMagazine('8rnd 9x18mm', 'CUP_8Rnd_9x18_Makarov_M', 8),

  createWeapon('CZ 75 P-07 Duty handgun', 'CUP_hgun_Duty', ['handgun'], ['16Rnd_9x21_Mag']),
  createMagazine('16rnd 9x21mm', '16Rnd_9x21_Mag', 16),

  createWeapon('Glock 17 handgun', 'CUP_hgun_Glock17', ['handgun'], ['CUP_17Rnd_9x19_glock17']),
  createMagazine('17rnd 9x19mm', 'CUP_17Rnd_9x19_glock17', 17),

  createWeapon('Micro UZI PDW', 'CUP_hgun_MicroUzi', ['handgun'], ['CUP_30Rnd_9x19_UZI']),
  createMagazine('30rnd 9x19mm', 'CUP_30Rnd_9x19_UZI', 10),

  //PISTOLS (Vanilla)

  createWeapon('Zubr .45 revolver', 'hgun_Pistol_heavy_02_F', ['handgun'], ['6Rnd_45ACP_Cylinder']),
  createMagazine('6rnd .45 ACP cylinder', '6Rnd_45ACP_Cylinder', 6),




  //SHOTGUNS (CUP)
  createWeapon('Saiga12K shotgun', 'CUP_sgun_Saiga12K', ['shotgun'], ['CUP_8Rnd_B_Saiga12_74Slug_M']),
  createMagazine('8rnd Saiga 74 slug', 'CUP_8Rnd_B_Saiga12_74Slug_M', 8),

  createWeapon('AA-12 shotgun', 'CUP_sgun_AA12', ['shotgun'], ['CUP_20Rnd_B_AA12_Pellets']),
  createMagazine('20rnd pellets', 'CUP_20Rnd_B_AA12_Pellets', 20),




  //SMGS (CUP)

  createWeapon('MP5 SD6', 'CUP_smg_MP5SD6', ['smg'], ['CUP_30Rnd_9x19_MP5']),
  createMagazine('30rnd 9x19mm', 'CUP_30Rnd_9x19_MP5', 30, true),

  //SMGS (Vanilla)

  createWeapon('Vermin SMG .45 ACP', 'SMG_01_F', ['smg'], ['30Rnd_45ACP_Mag_SMG_01']),
  createMagazine('30rnd .45 ACP', '30Rnd_45ACP_Mag_SMG_01', 30),

  createWeapon('Sting SMG 9mm', 'SMG_02_F', ['smg'], ['30Rnd_9x21_Mag']),
  createMagazine('30rnd 9x21 mm', '30Rnd_9x21_Mag', 30),

  createLoot(
    'Test renown',
    'IKRS_test_renown',
    {
      'IKRS_renown': '50d10+400'
    }
  ),

  createLoot(
    'Kill reward',
    'IKRS_kill_reward',
    {
      'IKRS_renown': 'd3+2'
    }
  ),

  createLoot(
    'Underdog kill reward level 1',
    'IKRS_underdog_reward_lvl1',
    {
      'money': '5d5+25',
      'IKRS_renown': '2d3+6',
      'rifle reward': {
        selectFrom: tactiCools,
        change: 'd2-1'
      }
    }
  ),

  createLoot(
    'Underdog kill reward level 2',
    'IKRS_underdog_reward_lvl2',
    {
      'money': '10d5+50',
      'IKRS_renown': '4d3+12',
      'battle rifle reward': {
        selectFrom: battleRifles,
        change: 'd3-2'
      },
      'rifle reward': {
        selectFrom: tactiCools,
        change: 'd2-1'
      }
    }
  ),

  createLoot(
    'Underdog kill reward level 3',
    'IKRS_underdog_reward_lvl3',
    {
      'money': '10d10+100',
      'IKRS_renown': '4d3+12',
      'battle rifle reward': {
        selectFrom: battleRifles,
        change: 'd2-1'
      },
      'optic reward': {
        selectFrom: mediumOptics,
        change: 'd5-4'
      },
      'ghillie reward': {
        selectFrom: ghillie,
        change: 'd10-9'
      }
    }
  ),

  createLoot(
    'Guard kill reward',
    'IKRS_guard_kill_reward',
    {
      'money': '5d5+50',
      'IKRS_renown': '4d3+10'
    }
  ),

  createLoot(
    'Guard loot secure reward',
    'IKRS_guard_secure_reward',
    {
      'money': '10d5+50',
      'IKRS_renown': '4d3+10'
    }
  ),

  createLoot(
    'Guard survive reward (per each kill)',
    'IKRS_guard_survive_reward',
    {
      'money': '10d5+50',
      'IKRS_renown': '2d3+6',
      'rifle reward': {
        selectFrom: tactiCools,
        change: 1
      }
    }
  ),

  createLoot(
    'Objective renown reward (Loot box level 1)',
    'IKRS_box_opening_reward_lvl1',
    {

      'Binocular': 'd5-2',
      'ItemGPS': 'd5-3',
      'SMG_02_F': 'd4-2',
      'SMG_01_F': 'd4-2',
      '30Rnd_9x21_Mag': 'd5+2',
      '30Rnd_45ACP_Mag_SMG_01': 'd5+2',
      'optic_Holosight_smg': 'd5-4',
      'optic_Aco_smg': 'd5-4',
      'optic_ACO_grn_smg': 'd5-4',
      'muzzle_snds_acp': 'd8-7',
      'muzzle_snds_L': 'd8-6',
      'IKRS_renown': '2d3+6'
    }
  ),

  createLoot(
    'Objective renown reward (Loot box level 2)',
    'IKRS_box_opening_reward_lvl2',
    {
      'IKRS_renown': '4d3+12'
    }
  ),

  createLoot(
    'Objective renown reward (Loot box level 3)',
    'IKRS_box_opening_reward_lvl4',
    {
      'IKRS_renown': '6d3+18'
    }
  ),

  createLoot(
    'Objective renown reward (Loot box level 4)',
    'IKRS_box_opening_reward_lvl4',
    {
      'IKRS_renown': '8d3+24'
    }
  ),

  createLoot(
    'Objective renown reward (Depot held)',
    'IKRS_hold_renown_reward',
    {
      'IKRS_renown': '8d3+24'
    }
  ),

  createLoot(
    'Valuables, money',
    'IKRS_loot_valuables',
    {
      'money': '5d5+50'
    }
  ),

  createLoot(
    'Starting loot',
    'IKRS_STARTING_LOOT',
    {
      'money': 500,
      'Binocular': 10,
      'hlc_rifle_ak74': 10,
      'hlc_30Rnd_545x39_B_AK': 50,
      'IKRS_outpost_backpack': 3
    }
  ),

  createLoot(
    'SMG Weapons',
    'IKRS_loot_smg_weapons',
    {
      'Binocular': 'd5-2',
      'ItemGPS': 'd5-3',
      'SMG_02_F': 'd4-2',
      'SMG_01_F': 'd4-2',
      '30Rnd_9x21_Mag': 'd5+2',
      '30Rnd_45ACP_Mag_SMG_01': 'd5+2',
      'optic_Holosight_smg': 'd5-4',
      'optic_Aco_smg': 'd5-4',
      'optic_ACO_grn_smg': 'd5-4',
      'muzzle_snds_acp': 'd8-7',
      'muzzle_snds_L': 'd8-6'
    }
  ),

  createLoot(
    'Warsaw pact, old',
    'IKRS_loot_warsaw_old',
    {
      'Binocular': 'd5-2',
      'ItemGPS': 'd5-3',
      'hlc_rifle_ak47':'d2+1',
      'hlc_rifle_akm': 'd5+2',
      'hlc_rifle_rpk': 'd2-1',
      'hlc_30Rnd_762x39_b_ak': '4d3+5',
      'hlc_45Rnd_762x39_m_rpk': 'd5+2'
    }
  ),

  createLoot(
    'Warsaw pact, standard',
    'IKRS_loot_warsaw_standard',
    {
      'Binocular': 'd5-2',
      'ItemGPS': 'd5-3',
      'hlc_rifle_ak74': 'd5+2',
      'hlc_rifle_aks74': 'd2',
      'hlc_rifle_rpk74n': 'd2-1',
      'hlc_rifle_aks74_GL': 'd10-9',
      'hlc_30Rnd_545x39_B_AK': '4d3+5',
      'hlc_45Rnd_545x39_t_rpk': 'd5+5'
    }
  ),

  createLoot(
    'Warsaw pact, explosives and ammo',
    'IKRS_loot_warsaw_ammo',
    {
      'hlc_VOG25_AK': '2d3+2',
      'CUP_PG7V_M': 'd2',
      'CUP_100Rnd_TE4_LRT4_762x54_PK_Tracer_Green_M': 'd2',
      'HandGrenade': '4d3+15',
      'SmokeShell': '4d3+15'
    }
  ),

  createLoot(
    'NATO, standard',
    'IKRS_loot_nato_standard',
    {
      'Binocular': 'd5-2',
      'ItemGPS': 'd5-3',
      'CUP_arifle_M16A2': 'd2-1',
      'CUP_arifle_M16A4_Base': 'd2-1',
      'hlc_rifle_M4': 'd2-1',
      'hlc_rifle_Colt727': 'd2',
      'hlc_rifle_Colt727_GL': 'd10-9',

      '30Rnd_556x45_Stanag': '2d3+5'
    }
  ),

  createLoot(
    'NATO, explosives and ammo',
    'IKRS_loot_nato_ammo',
    {
      '1Rnd_HE_Grenade_shell': '2d3+2',
      'NLAW_F': 'd2',
      '20Rnd_762x51_Mag': 'd5+3',
      'hlc_200rnd_556x45_T_SAW': 'd3+2',
      'HandGrenade': '4d3+15',
      'SmokeShell': '4d3+15'
    }
  ),

  createLoot(
    'NATO, modern',
    'IKRS_loot_nato_modern',
    {
      'Binocular': 'd5-2',
      'ItemGPS': 'd5-3',
      'arifle_MX_F': 'd2',
      'arifle_MX_GL_F': 'd10-9',
      'arifle_MXC_F': 'd2',

      '30Rnd_65x39_caseless_mag': '5d3+5'
    }
  ),

  createLoot(
    'NATO, modern explosives and ammo',
    'IKRS_loot_nato_modern_ammo',
    {
      '1Rnd_HE_Grenade_shell': '2d3+2',
      'NLAW_F': 'd2+2',
      '20Rnd_762x51_Mag': 'd5+3',
      '200Rnd_65x39_cased_Box': 'd3+2',
      'HandGrenade': '4d3+15',
      'SmokeShell': '4d3+15'
    }
  ),

  createLoot(
    'CSAT, modern',
    'IKRS_loot_csat_modern',
    {
      'Binocular': 'd5-2',
      'ItemGPS': 'd5-3',
      'arifle_Katiba_C_F': 'd2',
      'arifle_Katiba_F': 'd2',
      'arifle_Katiba_GL_F': 'd10-9',

      '30Rnd_65x39_caseless_green': '5d3+5'
    }
  ),

  createLoot(
    'CSAT, modern explosives and ammo',
    'IKRS_loot_csat_modern_ammo',
    {
      '1Rnd_HE_Grenade_shell': '2d3+2',
      'RPG32_F': 'd2+2',
      '150Rnd_762x54_Box': 'd3+2',
      'HandGrenade': '4d3+15',
      'SmokeShell': '4d3+15'
    }
  ),

  createLoot(
    'Assasin survive reward',
    'IKRS_loot_assasin',
    {

    }
  ),

  createLoot(
    'Body armor, light',
    'IKRS_loot_armor_light',
    {
      'V_TacVest_camo': 'd2+1',
      'V_TacVest_blk': 'd2+1',
      'V_TacVest_oli': 'd2+1',
    }
  ),

  createLoot(
    'Body armor, medium',
    'IKRS_loot_armor_medium',
    {
      'V_PlateCarrierIA1_dgtl': 'd2',
      'V_PlateCarrierIA2_dgtl': 'd2',
      'V_PlateCarrier1_blk': 'd2-1',
      'V_PlateCarrier1_rgr': 'd2-1',
      'V_PlateCarrier2_rgr': 'd2-1',
      'V_PlateCarrierSpec_rgr': 'd3-2',
      'V_PlateCarrierSpec_blk': 'd3-2',
      'V_PlateCarrierSpec_mtp': 'd3-2',

      'H_HelmetB': 'd2',
      'H_HelmetIA': 'd2',
    }
  ),

  createLoot(
    'Body armor, heavy',
    'IKRS_loot_armor_heavy',
    {
      'V_PlateCarrierIAGL_dgtl': 'd2',
      'V_PlateCarrierIAGL_oli': 'd2',
      'V_PlateCarrierGL_rgr': 'd2-1',
      'V_PlateCarrierGL_blk': 'd2-1',
      'V_PlateCarrierGL_mtp': 'd2-1',

      'H_HelmetB': 'd2',
      'H_HelmetIA': 'd2',
    }
  ),

  createLoot(
    'Rare weapons',
    'IKRS_loot_rare_weapons',
    {
    }
  ),

];

function createLoot(name, armaClass, loot){
  return new ItemLoot({
    armaClass: armaClass,
    name: name,
    loot: loot
  })
};

function createWeapon(name, armaClass, tags, magazines, unlimited){
  return new ItemWeapon({
    armaClass: armaClass,
    name: name,
    tags: tags,
    combatibleMagazines: magazines,
    unlimited: unlimited
  })
};

function createMagazine(name, armaClass, ammo, unlimited){
  return new ItemMagazine({
    armaClass: armaClass,
    name: name,
    ammo: ammo,
    unlimited: unlimited
  })
};

function createGeneric(name, armaClass, tags, unlimited){
  return new ItemGeneric({
    armaClass: armaClass,
    tags: tags,
    name: name,
    unlimited: unlimited
  })
};

function createBackpack(name, armaClass, tags, unlimited){
  return new ItemBackpack({
    armaClass: armaClass,
    tags: tags,
    name: name,
    unlimited: unlimited
  })
}