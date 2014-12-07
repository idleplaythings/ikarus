InventoryRepository = function(collection, inventoryFactory){
  this._collection = collection;
  this._inventoryFactory = inventoryFactory;
}

InventoryRepository.prototype.createCompanyInventory = function(company){
  var id = this._collection.insert(
    new InventoryCompany({
      companyId: company._id
    }).serialize()
  );

  return this.getById(id);
};

InventoryRepository.prototype.createSquadMemberInvetory = function(squad, player){
  var id = this._collection.insert(
    new InventorySquadMember({
      serverId: squad.serverId,
      steamId: player.stemId
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

InventoryRepository.prototype.removeByPlayer = function(player){
    this._collection.remove({steamId: player.steamId});
};

InventoryRepository.prototype.removeById = function(id){
    this._collection.remove({_id: id});
};

InventoryRepository.prototype.moveFromInventory = function(fromId, toId, armaClass){
  var result = this.removeFromInventory(fromId, armaClass);
  if (! result){
    return false;
  }

  return this.addToInventory(toId, armaClass);
};

InventoryRepository.prototype.removeFromInventory = function(id, armaClass){

  var exists = {};
  exists['items.' + armaClass] = {exists: true};
  var gt = {};
  gt['items.' + armaClass] = {$gt: 0};
  var dec = {};
  inc['items.' + armaClass] = -1;

  var result = this._collection.update(
    {$and :
      [
        {_id: id},
        exists,
        gt
      ]
    },

    {$inc: dec}
  );

  return result;
};

InventoryRepository.prototype.addToInventory = function(id, armaClass){

  var inc = {};
  inc['items.' + armaClass] = 1;

  return this._collection.update(
    {_id: id},
    {$inc: inc}
  );
};