ItemLoot = function ItemLoot(args){
  Item.call(this, args);
  this.loot = args.loot;
}

ItemLoot.prototype = Object.create(Item.prototype);

ItemLoot.prototype.randomizeLoot = function(dice){
  var lootAndAmount = {};

  Object.keys(this.loot).forEach(function(key){
    var payload = this.loot[key];

    if (payload instanceof Object) {
      this.getLootSet(payload, lootAndAmount, dice);
    } else {
      this.getLoot(key, payload, lootAndAmount, dice);
    }

  }, this);

  return lootAndAmount;
};

ItemLoot.prototype.getLootSet = function(lootObject, lootAndAmount, dice){
  var lootList = lootObject.selectFrom;
  var lootClass = lootList[Math.floor(Math.random() * lootList.length)];
  this.getLoot(lootClass, lootObject.change, lootAndAmount, dice);
};

ItemLoot.prototype.getLoot = function(lootClass, lootAmount, lootAndAmount, dice){

  lootAmount = (typeof lootAmount === 'string') ? dice.roll(lootAmount).total : lootAmount;
  this.addToLoot(lootClass, lootAmount, lootAndAmount);

};

ItemLoot.prototype.addToLoot = function(lootClass, lootAmount, lootAndAmount) {
  if (lootAndAmount[lootClass] !== undefined){
    lootAndAmount[lootClass] += lootAmount;
  } else {
    lootAndAmount[lootClass] = lootAmount;
  }
};