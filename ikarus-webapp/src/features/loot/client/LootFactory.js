var namespace = this;

LootFactory = function LootFactory(itemFactory) {
  this._itemFactory = itemFactory;
}

LootFactory.prototype.create = function (name) {

  if (namespace[name] && namespace[name] instanceof Array) {
    return Loot.createFromArray(namespace[name]);
  }

  var item = this._itemFactory.createItemByArmaClass(name);
  if (item instanceof ItemLoot) {
    return Loot.createFromItem(item);
  }
};