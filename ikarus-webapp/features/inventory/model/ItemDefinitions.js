ItemDefinitions = [
  createWeapon('Lee Einfield rifle', 'CUP_srifle_LeeEnfield' ['CUP_10x_303_M']),
  createMagazine('10rnd .303', 'CUP_10x_303_M', 10),

  createWeapon('M1014 Shotgun', 'CUP_sgun_M1014', ['CUP_8Rnd_B_Beneli_74Slug'], true),
  createMagazine('8rnd 12 gauge slugs', 'CUP_8Rnd_B_Beneli_74Slug', 8, true),

  createWeapon('MP5A5 smg', 'CUP_smg_MP5A5', ['CUP_30Rnd_9x19_MP5'], true),
  createMagazine('30 rnd 9x19mm', 'CUP_30Rnd_9x19_MP5', 30, true),
];

var createWeapon = function(name, armaClass, magazines, unlimited){
  return new ItemWeapon({
    armaClass: armaClass,
    name: name,
    combatibleMagazines: magazines,
    unlimited: unlimited
  })
};

var createMagazine = function(name, armaClass, ammo, unlimited){
  return new ItemMagazine({
    armaClass: armaClass,
    name: name,
    ammo: ammo,
    unlimited: unlimited
  })
};

var createGeneric = function(name, armaClass, unlimited){
  return new ItemGeneric({
    armaClass: armaClass,
    name: name,
    unlimited: unlimited
  })
};

var createBackpack = function(name, armaClass, unlimited){
  return new ItemBackpack({
    armaClass: armaClass,
    name: name,
    unlimited: unlimited
  })
};