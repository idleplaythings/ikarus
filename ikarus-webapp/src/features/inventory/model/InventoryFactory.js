var namespace = this;

InventoryFactory = function(itemFactory){
  this._itemFactory = itemFactory;
};

InventoryFactory.prototype.deserialize = function(serialized){

  if (! serialized){
    return null;
  }

  var items = [];
  var type = serialized.type;
  var serializedItems = serialized.items;

  Object.keys(serializedItems).forEach(function(key){
    var amount = serializedItems[key];

    while (amount--){
      items.push(this._itemFactory.createItemByArmaClass(key));
    }
  }, this);

  serialized.items = items;

  var inventory = new namespace[type](serialized);

  if (inventory.hasUnlimitedItems){
    var unlimitedItems = this._itemFactory.getUnlimitedItems();
    inventory.items = inventory.items.concat(unlimitedItems);
  }

  return inventory;
};