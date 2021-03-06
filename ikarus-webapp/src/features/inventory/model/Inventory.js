Inventory = function Inventory(args){

  if (! args) {
    args = {};
  }

  this._id = args._id;
  this.items = args.items || [];
  this.type = 'Inventory';
}

Inventory.MAX_ITEMS_PER_SQUAD_MEMBER = 30;

Inventory.prototype.isLocked = function(){
  return false;
};

Inventory.prototype.getAmountOfItemsWithClass = function(armaClass){
  return this.items.filter(function(item){
    return item.armaClass == armaClass;
  }, this).length;
};

Inventory.prototype.getAmountOfItemsWithTag = function(tag){
  return this.items.filter(function(item){
    return item.hasTags(tag);
  }, this).length;
};

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

Inventory.createForSquad = function(squad) {
  var id = collections.InventoryCollection.insert(
    new InventorySquad({
      squadId: squad._id
    }).serialize()
  );

  return Inventory.getById(id);
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

Inventory.removeByCompany = function(company){
  collections.InventoryCollection.remove({companyId: company._id});
};


Inventory.returnItems = function(company, squad){
  var squadInventory = Inventory.getBySquad(squad);

  if (! squadInventory) {
    return;
  }

  var companyInventory = this.getByCompany(company);

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
  if (!item) {
    return;
  }

  if (to instanceof InventorySquad && to.items.length >= to.getMaxItemCount()) {
    return;
  }

  Inventory.removeFromInventory(from, item) && Inventory.addToInventory(to, item);
};

Inventory.removeFromInventory = function(inventory, item, amount){

  amount = amount !== undefined ? amount * -1 : -1;

  var armaClass = item.armaClass;
  if (item.unlimited && inventory instanceof InventoryCompany) {
    return 1;
  }

  var exists = {};
  exists['items.' + armaClass] = {$exists: true};
  var gt = {};
  gt['items.' + armaClass] = {$gte: amount * -1};
  var dec = {};
  dec['items.' + armaClass] = amount;

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

Inventory.addToInventory = function(inventory, item, amount){

  amount = amount !== undefined ? amount : 1;

  var armaClass = item.armaClass;
  if (item.unlimited && inventory instanceof InventoryCompany) {
    return 1;
  }

  var inc = {};
  inc['items.' + armaClass] = amount;

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

Inventory.prototype.getDoc = function() {
  return collections.InventoryCollection.findOne({ _id: this._id });
}