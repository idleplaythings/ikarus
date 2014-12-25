ItemDefinitions = [
  createWeapon('Lee Einfield rifle', 'CUP_srifle_LeeEnfield', ['CUP_10x_303_M']),
  createMagazine('10rnd .303', 'CUP_10x_303_M', 10),

  createWeapon('CZ 550 hunting rifle', 'CUP_srifle_CZ550', ['CUP_5x_22_LR_17_HMR_M']),
  createMagazine('5rnd 22Lr', 'CUP_5x_22_LR_17_HMR_M', 5),

  createWeapon('AK-74 assault rifle', 'CUP_arifle_AK74', ['CUP_30Rnd_545x39_AK_M']),
  createMagazine('30rnd 5.45x39mm (AK-74)', 'CUP_30Rnd_545x39_AK_M', 30),

  createWeapon('M249 lmg', 'CUP_lmg_M249', ['CUP_200Rnd_TE4_Red_Tracer_556x45_M249', 'CUP_30Rnd_556x45_Stanag']),
  createMagazine('200rnd box 5.56x45mm STANAG', 'CUP_200Rnd_TE4_Red_Tracer_556x45_M249', 30),

  createWeapon('M16A2 assault rifle (no rail)', 'CUP_arifle_M16A2', ['CUP_30Rnd_556x45_Stanag']),
  createMagazine('30rnd 5.56x45mm STANAG', 'CUP_30Rnd_556x45_Stanag', 30),

  createWeapon('M16A4 assault rifle', 'CUP_arifle_M16A4_Base', ['CUP_30Rnd_556x45_Stanag']),

  createWeapon('M4A1 assault rifle', 'CUP_arifle_M4A1_black', ['CUP_30Rnd_556x45_Stanag']),

  createWeapon('M1014 Shotgun', 'CUP_sgun_M1014', ['CUP_8Rnd_B_Beneli_74Slug'], true),
  createMagazine('8rnd 12 gauge slugs', 'CUP_8Rnd_B_Beneli_74Slug', 8, true),

  createWeapon('MP5A5 smg', 'CUP_smg_MP5A5', ['CUP_30Rnd_9x19_MP5'], true),
  createMagazine('30rnd 9x19mm', 'CUP_30Rnd_9x19_MP5', 30, true),

  createWeapon('Dragunov SVD sniper rifle', 'CUP_srifle_SVD', ['CUP_10Rnd_762x54_SVD_M']),
  createMagazine('10rnd 7.62x51mm SVD', 'CUP_10Rnd_762x54_SVD_M', 10),

  createWeapon('AKM assault rifle', 'CUP_arifle_AKM', ['CUP_30Rnd_762x39_AK47_M']),
  createMagazine('30rnd 7.62x39mm (AKM)', 'CUP_30Rnd_762x39_AK47_M', 30),

  createWeapon('RPK-74 lmg', 'CUP_arifle_RPK74', ['CUP_75Rnd_TE4_LRT4_Green_Tracer_545x39_RPK_M', 'CUP_30Rnd_545x39_AK_M']),
  createMagazine('75rnd 5.45x39mm (RPK-74)', 'CUP_75Rnd_TE4_LRT4_Green_Tracer_545x39_RPK_M', 75),

  createWeapon('AK-107 assault rifle', 'CUP_arifle_AK107', ['CUP_30Rnd_545x39_AK_M']),


  createGeneric('Kobra Reflex Sight', 'CUP_optic_Kobra'),
  createGeneric('PSO-1 Scope', 'CUP_optic_PSO_1'),
  createGeneric('M68 CCO red dot optic', 'CUP_optic_CompM2_Black'),

  createGeneric('Trijicon ACOG optic', 'CUP_optic_RCO'),
  createGeneric('Aimpoint CompM4 optic', 'CUP_optic_CompM4'),

  createGeneric('Guerrila uniform 1', 'U_IG_Guerilla1_1', true),
  createGeneric('Guerrila uniform 2', 'U_IG_Guerilla2_1', true),
  createGeneric('Guerrila uniform 3', 'U_IG_Guerilla2_2', true),
  createGeneric('Guerrila uniform 4', 'U_IG_Guerilla2_3', true),
  createGeneric('Guerrila uniform 5', 'U_IG_Guerilla3_1', true),
  createGeneric('Guerrila uniform 6', 'U_IG_Guerilla3_2', true),
  createGeneric('Guerrila uniform 7', 'U_IG_leader', true),

  createGeneric('Rangemaster belt', 'V_Rangemaster_belt', true),
  createGeneric('Slash bandolier (Black)', 'V_BandollierB_blk', true),
  createGeneric('Slash bandolier (Black)', 'V_BandollierB_oli', true),
  createGeneric('Fighter chestrig (Khaki)', 'V_Chestrig_khk', true),

  createGeneric('First aid kit', 'FirstAidKit', true),

  createGeneric('Combat fatigues (AAF)', 'U_I_CombatUniform'),
  createGeneric('Combat fatigues (MTP)', 'U_B_CombatUniform_mcam'),
  createGeneric('Combat recon fatigues (MTP)', 'U_B_CombatUniform_mcam_vest'),


  createGeneric('Vest (press)', 'V_Press_F'),

  createGeneric('Tactical vest (police)', 'V_TacVest_blk_POLICE'),
  createGeneric('Tactical vest (camo)', 'V_TacVest_camo'),
  createGeneric('Tactical vest (black)', 'V_TacVest_blk'),
  createGeneric('Tactical vest (olive)', 'V_TacVest_oli'),


  createGeneric('GA carrier lite (digi)', 'V_PlateCarrierIA1_dgtl'),
  createGeneric('GA carrier rig (digi)', 'V_PlateCarrierIA2_dgtl'),

  createGeneric('Carrier lite (green, US)', 'V_PlateCarrier1_rgr'),
  createGeneric('Carrier rig (green, US)', 'V_PlateCarrier2_rgr'),

  createLoot(
    'Civilian Weapons',
    'IKRS_loot_civilian_weapons',
    {
      'CUP_srifle_LeeEnfield': 1,
      'CUP_10x_303_M': 'd5+2',
      'CUP_srifle_CZ550': 'd20-19',
      'CUP_5x_22_LR_17_HMR_M': 'd3-2',
      'V_Press_F': 'd10-9',
      'V_TacVest_blk_POLICE': 'd10-8'
    }
  ),

  createLoot(
    'Old Russian Weapons',
    'IKRS_loot_old_RU_weapons',
    {
      'CUP_arifle_AK74': 'd2',
      'CUP_30Rnd_545x39_AK_M': '2d5+5',
      'CUP_optic_Kobra': 'd10-8',
      'CUP_optic_PSO_1': 'd10-9',
      'CUP_srifle_SVD': 'd20-19',
      'CUP_10Rnd_762x54_SVD_M': 'd1',
      'CUP_30Rnd_762x39_AK47_M': 'd3-1',
      'CUP_arifle_AKM': 'd5-4',
      'CUP_75Rnd_TE4_LRT4_Green_Tracer_545x39_RPK_M': 'd5-4',
      'V_TacVest_camo': 'd3-1',
      'V_TacVest_oli': 'd3-1',
      'V_TacVest_blk': 'd3-1',
      'V_PlateCarrierIA1_dgtl': 'd5-4'
    }
  ),

  createLoot(
    'Old NATO weapons',
    'IKRS_loot_old_nato_weapons',
    {
      'CUP_arifle_M16A2': 'd2',
      'CUP_30Rnd_556x45_Stanag': 'd5+3',
      'CUP_arifle_M16A4_Base': 'd5-4',
      'CUP_optic_CompM2_Black': 'd5-4',
      'CUP_optic_RCO': 'd20-18',
      'V_TacVest_camo': 'd3-1',
      'V_TacVest_oli': 'd3-1',
      'V_TacVest_blk': 'd3-1',
      'V_PlateCarrier1_rgr': 'd5-4'
    }
  ),

  createLoot(
    'Common NATO weapons',
    'IKRS_loot_common_nato_weapons',
    {
      'CUP_arifle_M4A1_black': 'd2',
      'CUP_optic_CompM4': 'd10-8',
      'CUP_optic_CompM2_Black': 'd2',
      'CUP_optic_RCO': 'd10-8',
      'CUP_200Rnd_TE4_Red_Tracer_556x45_M249': 'd3-2',
      'V_TacVest_camo': 'd3-1',
      'V_TacVest_oli': 'd3-1',
      'V_TacVest_blk': 'd3-1',
      'V_PlateCarrier1_rgr': 'd2',
      'V_PlateCarrier2_rgr': 'd5-4'
    }
  ),

  createLoot(
    'Common Russian weapons',
    'IKRS_loot_common_RU_weapons',
    {
      'CUP_arifle_AK107': 'd2+1',
      'CUP_optic_Kobra': 'd2+1',
      'CUP_optic_PSO_1': 'd5-4',
      'CUP_srifle_SVD': 'd10-9',
      'CUP_10Rnd_762x54_SVD_M': 'd1+1',
      'CUP_30Rnd_545x39_AK_M': '2d5+5',
      'V_TacVest_camo': 'd3-1',
      'V_TacVest_oli': 'd3-1',
      'V_TacVest_blk': 'd3-1',
      'V_PlateCarrierIA1_dgtl': 'd2',
      'V_PlateCarrierIA2_dgtl': 'd5-4'
    }
  ),

  createLoot(
    'NATO heavy weapons',
    'IKRS_loot_heavy_nato_weapons',
    {
      'CUP_lmg_M249': 1,
      'CUP_200Rnd_TE4_Red_Tracer_556x45_M249': 'd3+2'
    }
  ),

  createLoot(
    'Russian heavy weapons',
    'IKRS_loot_heavy_RU_weapons',
    {
      'CUP_arifle_RPK74': 'd2',
      'CUP_75Rnd_TE4_LRT4_Green_Tracer_545x39_RPK_M': '2d3+5'
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

function createWeapon(name, armaClass, magazines, unlimited){
  return new ItemWeapon({
    armaClass: armaClass,
    name: name,
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

function createGeneric(name, armaClass, unlimited){
  return new ItemGeneric({
    armaClass: armaClass,
    name: name,
    unlimited: unlimited
  })
};

function createBackpack(name, armaClass, unlimited){
  return new ItemBackpack({
    armaClass: armaClass,
    name: name,
    unlimited: unlimited
  })
}