ItemLoot = function ItemLoot(args){
  Item.call(this, args);
  this.loot = args.loot;
}

ItemLoot.prototype = Object.create(Item.prototype);

ItemLoot.prototype.randomizeLoot = function(dice){
  var lootAndAmount = {};

  Object.keys(this.loot).forEach(function(key){
    var lootClass = key;
    var lootAmount = this.loot[key];
    lootAmount = (typeof lootAmount === 'string') ? dice.roll(lootAmount).total : lootAmount;

    if (lootAndAmount[lootClass] !== undefined){
      lootAndAmount[lootClass] += lootAmount;
    } else {
      lootAndAmount[lootClass] = lootAmount;
    }
  }, this);

  return lootAndAmount;
};