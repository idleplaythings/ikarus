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