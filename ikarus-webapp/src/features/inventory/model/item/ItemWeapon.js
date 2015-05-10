ItemWeapon = function ItemWeapon(args){
  Item.call(this, args);
  this.combatibleMagazines = args.combatibleMagazines;
}

ItemWeapon.prototype = Object.create(Item.prototype);

ItemWeapon.prototype.isCombatibleMagazine = function(magazine){
  if ( ! (magazine instanceof ItemMagazine)){
    return false;
  }

  //Should we use itemId or armaClass. ArmaClass makes it easier to do itemDefinitions
  return this.combatibleMagazines.indexOf(magazine.armaClass) !== -1;
};

ItemWeapon.prototype.getProperties = function(){
  var weapon = weaponProperties[this.armaClass];

  if ( ! weapon) {
    return [];
  }

  var muzzleVelocity = weapon.initSpeed || this.getMuzzleVelocity(weapon);
  var dispersion = (weapon.dispersion * 10000).toFixed(1);
  return [
    {name: 'Dispersion', value: dispersion + " cm/100m"},
    {name: 'Muzzle velocity', value: muzzleVelocity + " m/s"},
    {name: 'Dexterity', value: weapon.dexterity},
    {name: 'Inertia', value: weapon.inertia},
    {name: 'Mass', value: weapon.mass}
  ];
};

ItemWeapon.prototype.getMuzzleVelocity = function () {
  var magazine = magazineProperties[this.combatibleMagazines[0]];
  if (! magazine) {
    return 0;
  }

  return magazine.initSpeed;
};





