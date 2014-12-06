InventoryFactory = function(itemFactory, inventoryCollection){
  this._itemFactory = itemFactory;
  this._inventoryCollection = inventoryCollection;
};

InventoryFactory.prototype.deserialize = function(serialized){

  var items = [];
  var type = serialized.type;
  var serializedItems = serialized.items;

  Object.keys(serializedItems).forEach(function(key){
    var amount = serialized.amount;

    while (amount--){
      items.push(this._itemFactory.createItemByArmaClass(key));
    }
  }, this);

  serialized.items = items;

  if (type === 'company'){
    return new InventoryCompany(serialized);
  }

  return new Inventory(serialized);
};