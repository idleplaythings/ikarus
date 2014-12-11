InventoryRepository = function(collection, inventoryFactory, itemFactory){
  this._collection = collection;
  this._inventoryFactory = inventoryFactory;
  this._itemFactory = itemFactory;
}

InventoryRepository.prototype.createCompanyInventory = function(company){
  var id = this._collection.insert(
    new InventoryCompany({
      companyId: company._id
    }).serialize()
  );

  return this.getById(id);
};

InventoryRepository.prototype.createOnServerForPlayer = function(server, player){
  var id = this._collection.insert(
    new InventorySquadMember({
      serverId: server._id,
      steamId: player.steamId
    }).serialize()
  );

  return this.getById(id);
};

InventoryRepository.prototype.getByCompany = function(company){
  return this._inventoryFactory.deserialize(
    this._collection.findOne({companyId: company._id})
  );
};

InventoryRepository.prototype.getByPlayer = function(player){
  return this._inventoryFactory.deserialize(
    this._collection.findOne({steamId: player.steamId})
  );
};

InventoryRepository.prototype.getById = function(id){
  return this._inventoryFactory.deserialize(
    this._collection.findOne({_id: id})
  );
};

InventoryRepository.prototype.lockByServer = function(serverId){
  this._collection.update({serverId: server._id}, {$set: {locked: true}});
};

InventoryRepository.prototype.removeByPlayer = function(player){
  this._collection.remove({steamId: player.steamId});
};

InventoryRepository.prototype.removeByServer = function(server){
  this._collection.remove({serverId: server._id});
};

InventoryRepository.prototype.removeById = function(id){
  this._collection.remove({_id: id});
};

InventoryRepository.prototype.returnItems = function(company, player){
  var playerInventory = this.getByPlayer(player);
  var companyInventory = this.getByCompany(company);

  if (playerInventory.locked){
    return;
  }

  playerInventory.items.forEach(function(item){
    this.moveFromInventory(playerInventory, companyInventory, item.armaClass);
  }, this);
};

InventoryRepository.prototype.moveFromInventory = function(from, to, armaClass){
  var item = this._itemFactory.createItemByArmaClass(armaClass);
  this.removeFromInventory(from, item) && this.addToInventory(to, item);
};

InventoryRepository.prototype.removeFromInventory = function(inventory, item){

  var armaClass = item.armaClass;
  if (item.unlimited && inventory instanceof InventoryCompany) {
    return 1;
  }

  var exists = {};
  exists['items.' + armaClass] = {$exists: true};
  var gt = {};
  gt['items.' + armaClass] = {$gt: 0};
  var dec = {};
  dec['items.' + armaClass] = -1;

  var result = this._collection.update(
    {$and :
      [
        {_id: inventory._id},
        exists,
        gt
      ]
    },

    {$inc: dec}
  );

  return result;
};

InventoryRepository.prototype.addToInventory = function(inventory, item){

  var armaClass = item.armaClass;
  if (item.unlimited && inventory instanceof InventoryCompany) {
    return 1;
  }

  var inc = {};
  inc['items.' + armaClass] = 1;

  var result = this._collection.update(
    {_id: inventory._id},
    {$inc: inc}
  );

  return result;
};
