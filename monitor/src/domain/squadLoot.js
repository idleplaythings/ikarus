
module.exports = SquadLoot;

function SquadLoot() {
  this.loot = [];
}

SquadLoot.prototype.deserializeFromArma = function(serialized){
  var parsed = JSON.parse(serialized);
  this.loot = parsed.filter(function(lootItem){
    return lootItem && lootItem.length > 0;
  });

  console.log(this.loot);

  return this;
};
