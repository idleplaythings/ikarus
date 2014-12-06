InventoryRepository = function(itemFactory, inventoryCollection){
  this._itemFactory = itemFactory;
  this._inventoryCollection = inventoryCollection;
};

InventoryRepository.prototype.getById = function(id) {
  var inventory = this.deserialize(this._inventoryCollection.findOne(_id: id));

  if (inventory instanceof InventoryCompany){
    inventory.add(this._itemFactory.getUnlimitedItems());
  }

  return inventory;
};

InventoryRepository.prototype.persist = function(inventory) {
   this._inventoryCollection.update(
    { _id: inventory._id },
    this._serialize(inventory),
    { upsert: true }
  );
};

InventoryRepository.prototype.deserialize = function(serialized){

  var items = [];
  var type = serialized.type;
  var serializedItems = serialized.items;

  Object.keys(serializedItems).forEach(function(key){
    var amount = serialized.amount;

    while (amount--){
      items.push(this._itemFactory.createItemByArmaClass(key));
    }
  }, this)

  if (type === 'company'){
    return new InventoryCompany(items);
  }

  return new Inventory(items);
};

InventoryRepository.prototype.serialize = function(inventory){

  var itemsByTypes = {};

  inventory.items.filter(function(item){
    return ! item.unlimited;
  }).forEach(function(item){
    if (itemsByTypes[item.armaClass]){
      itemsByTypes[item.armaClass]++;
    } else {
      itemsByTypes[item.armaClass] = 1;
    }
  });

  return {
    type: inventory.type,
    items: itemsByTypes
  };
};