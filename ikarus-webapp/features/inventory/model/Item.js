Item = function Item(args){
  this.armaClass = args.armaClass;
  this.name = args.name;
  this.unlimited = args.unlimited;
}

Item.prototype.populate = function(args){
  return this;
};

Item.prototype.clone = function(args){

  if (this.isWeapon()){
    return new ItemWeapon(this).populate(args);
  } else if (this.isMagazine()){
    return new ItemMagazine(this).populate(args);
  } else if (this.isGeneric()){
    return new ItemGeneric(this).populate(args);
  } else if (this.isBackpack()){
    return new ItemBackpack(this).populate(args);
  }

};

Item.prototype.isWeapon = function(){
  return this instanceof ItemWeapon;
};

Item.prototype.isMagazine = function(){
  return this instanceof ItemMagazine;
};

Item.prototype.isGeneric = function(){
  return this instanceof ItemGeneric;
};

Item.prototype.isBackpack = function(){
  return this instanceof ItemBackpack;
};