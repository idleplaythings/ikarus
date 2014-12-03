
module.exports = SquadLoot;

function SquadLoot() {
  this._loot = [];
}

SquadLoot.prototype.deserializeFromArma = function(serialized){
  var parsed = JSON.parse(serialized);
  this._loot = parsed.filter(function(lootItem){
    return lootItem && lootItem.length > 0;
  });

  console.log(this._loot);

  return this;
};
