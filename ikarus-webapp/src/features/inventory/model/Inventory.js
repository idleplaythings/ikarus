Inventory = function Inventory(args){

  if (! args) {
    args = {};
  }

  this._id = args._id;
  this.items = args.items || [];
  this.type = 'Inventory';
}

Inventory.prototype.getOrphanedMagazines = function(){
  return this.items.filter(function(item){
    if (! item.isMagazine())
      return false;

    var parents = this.items.filter(function(weapon){
      if (! weapon.isWeapon())
        return false;

      return weapon.isCombatibleMagazine(item);
    });

    return parents.length === 0;
  }, this)
};

Inventory.createForCompany = function(company) {
  var id = collections.InventoryCollection.insert(
    new InventoryCompany({
      companyId: company._id
    }).serialize()
  );

  return Inventory.getById(id);
};

Inventory.createForSquadOnServer = function(squad, server) {
  var id = collections.InventoryCollection.insert(
    new InventorySquad({
      squadId: squad._id,
      serverId: server._id
    }).serialize()
  );

  return Inventory.getById(id);
};

Inventory.lockByServer = function(server){
  collections.InventoryCollection.update(
    {serverId: server._id},
    {$set: {locked: true}},
    {multi: true}
  );
};

Inventory.getById = function(id){
  return dic.get('InventoryFactory').deserialize(
    collections.InventoryCollection.findOne({_id: id})
  );
};

Inventory.getBySquad = function(squad){
  return dic.get('InventoryFactory').deserialize(
    collections.InventoryCollection.findOne({squadId: squad._id})
  );
};

Inventory.getByCompany = function(company){
  return dic.get('InventoryFactory').deserialize(
    collections.InventoryCollection.findOne({companyId: company._id})
  );
};

Inventory.removeBySquad = function(squad){
  collections.InventoryCollection.remove({squadId: squad._id});
};

Inventory.removeByServer = function(server){
  collections.InventoryCollection.remove({serverId: server._id});
};


Inventory.returnItems = function(company, squad){
  var squadInventory = Inventory.getBySquad(squad);

  if (! squadInventory) {
    return;
  }

  var companyInventory = this.getByCompany(company);

  if (squadInventory.locked){
    return;
  }

  squadInventory.items.forEach(function(item){
    Inventory.moveFromInventory(squadInventory, companyInventory, item.armaClass);
  });
};

Inventory.prototype.getByArmaClass = function(armaClass){
  return this.items.filter(function(item){
    return item.armaClass === armaClass;
  }).pop();
};


Inventory.moveFromInventory = function(from, to, armaClass){
  var item = from.getByArmaClass(armaClass);
  if (!item || from.locked || to.locked) {
    return;
  }

  Inventory.removeFromInventory(from, item) && Inventory.addToInventory(to, item);
};

Inventory.removeFromInventory = function(inventory, item){

  if (inventory.locked) {
    return 0;
  }

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

  var result = collections.InventoryCollection.update(
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

Inventory.addToInventory = function(inventory, item){

  if (inventory.locked) {
    return 0;
  }

  var armaClass = item.armaClass;
  if (item.unlimited && inventory instanceof InventoryCompany) {
    return 1;
  }

  var inc = {};
  inc['items.' + armaClass] = 1;

  var result = collections.InventoryCollection.update(
    {_id: inventory._id},
    {$inc: inc}
  );

  return result;
};

Inventory.prototype.serialize = function(){

  var itemsByTypes = {};

  this.items.filter(function(item){
    return ! item.unlimited;
  }).forEach(function(item){
    if (itemsByTypes[item.armaClass]){
      itemsByTypes[item.armaClass]++;
    } else {
      itemsByTypes[item.armaClass] = 1;
    }
  });

  return {
    type: this.type,
    items: itemsByTypes
  };
};