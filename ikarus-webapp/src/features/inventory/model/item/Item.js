Item = function Item(args){
  this.armaClass = args.armaClass;
  this.tags = args.tags || [];
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
  } else if (this.isLoot()){
    return new ItemLoot(this).populate(args);
  }

};

Item.prototype.isWeapon = function(){
  return this instanceof ItemWeapon;
};

Item.prototype.isLoot = function(){
  return this instanceof ItemLoot;
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

Item.prototype.hasSomeTags = function(tags) {
  if (tags instanceof Array === false) {
    tags = [tags];
  }

  return tags.some(function(tag){
    return this.tags.indexOf(tag) > -1;
  }.bind(this));
};

Item.prototype.hasTags = function(tags) {
  if (tags instanceof Array === false) {
    tags = [tags];
  }

  return tags.every(function(tag){
    return this.tags.indexOf(tag) > -1;
  }.bind(this));
};
