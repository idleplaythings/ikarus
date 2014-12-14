ItemDefinitions = [
  createWeapon('Lee Einfield rifle', 'CUP_srifle_LeeEnfield', ['CUP_10x_303_M']),
  createMagazine('10rnd .303', 'CUP_10x_303_M', 10),

  createWeapon('CZ 550 hunting rifle', 'CUP_srifle_CZ550', ['CUP_5x_22_LR_17_HMR_M']),
  createMagazine('5rnd 22Lr', 'CUP_5x_22_LR_17_HMR_M', 5),

  createWeapon('AK-74 assault rifle', 'CUP_arifle_AK74', ['CUP_30Rnd_545x39_AK_M']),
  createMagazine('30rnd 5.45x39mm', 'CUP_30Rnd_545x39_AK_M', 30),

  createWeapon('M16A2 assault rifle (no rail)', 'CUP_arifle_M16A2', ['CUP_30Rnd_556x45_Stanag']),
  createMagazine('30rnd 5.56x45mm STANAG', 'CUP_30Rnd_556x45_Stanag', 30),

  createWeapon('M16A4 assault rifle', 'CUP_arifle_M16A4_Base', ['CUP_30Rnd_556x45_Stanag']),

  createWeapon('M1014 Shotgun', 'CUP_sgun_M1014', ['CUP_8Rnd_B_Beneli_74Slug'], true),
  createMagazine('8rnd 12 gauge slugs', 'CUP_8Rnd_B_Beneli_74Slug', 8, true),

  createWeapon('MP5A5 smg', 'CUP_smg_MP5A5', ['CUP_30Rnd_9x19_MP5'], true),
  createMagazine('30rnd 9x19mm', 'CUP_30Rnd_9x19_MP5', 30, true),

  createWeapon('Dragunov SVD sniper rifle', 'CUP_srifle_SVD', ['CUP_10Rnd_762x54_SVD_M']),
  createMagazine('10rnd 7.62x51mm SVD', 'CUP_10Rnd_762x54_SVD_M', 10),

  createGeneric('Kobra Reflex Sight', 'CUP_optic_Kobra'),
  createGeneric('PSO-1 Scope', 'CUP_optic_PSO_1'),
  createGeneric('M68 CCO red dot optic', 'CUP_optic_CompM2_Black'),

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

  createLoot(
    'Civilian Weapons',
    'IKRS_loot_civilian_weapons',
    {
      'CUP_srifle_LeeEnfield': 1,
      'CUP_10x_303_M': 'd5+2',
      'CUP_srifle_CZ550': 'd20-19',
      'CUP_5x_22_LR_17_HMR_M': 'd3-2'
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
      'CUP_10Rnd_762x54_SVD_M': 'd1'
    }
  ),

  createLoot(
    'Common NATO weapons',
    'IKRS_loot_common_nato_weapons',
    {
      'CUP_arifle_M16A2': 'd2',
      'CUP_30Rnd_556x45_Stanag': 'd5+3',
      'CUP_arifle_M16A4_Base': 'd5-4',
      'CUP_optic_CompM2_Black': 'd5-4'
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