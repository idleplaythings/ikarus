ItemDefinitions = [
  createWeapon('Lee Einfield rifle', 'CUP_srifle_LeeEnfield' ['CUP_10x_303_M']),
  createMagazine('10rnd .303', 'CUP_10x_303_M', 10)
];

var createWeapon = function(name, armaClass, magazines){
  return new ItemWeapon({
    armaClass: armaClass,
    name: name,
    combatibleMagazines: magazines
  })
};

var createMagazine = function(name, armaClass, ammo){
  return new ItemMagazine({
    armaClass: armaClass,
    name: name,
    ammo: ammo
  })
};

var createGeneric = function(name, armaClass){
  return new ItemGeneric({
    armaClass: armaClass,
    name: name
  })
};

var createBackpack = function(name, armaClass){
  return new ItemBackpack({
    armaClass: armaClass,
    name: name
  })
};