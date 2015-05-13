ItemMagazine = function ItemMagazine(args){
  Item.call(this, args);
  this.ammo = args.ammo;
  this.ammoSpent = 0;
}

ItemMagazine.prototype = Object.create(Item.prototype);

ItemMagazine.prototype.populate = function(args){

  if (! args){
    args = {};
  }

  this.ammoSpent = args.ammoSpent || 0;

  return this;
};

ItemMagazine.prototype.getProperties = function(){
  var magazine = magazineProperties[this.armaClass];

  if ( ! magazine) {
    return [];
  }

  var damage = this.getDamage(magazine.ammo);

  return [
    {name: 'Damage', value: damage},
    {name: 'Mass', value: magazine.mass}
  ];
};

ItemMagazine.prototype.getDamage = function (ammo) {
  var ammo = ammoProperties[ammo];
  if (! ammo) {
    return 0;
  }

  return ammo.hit;
};
