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
};