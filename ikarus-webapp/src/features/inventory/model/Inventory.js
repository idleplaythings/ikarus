Inventory = function Inventory(args){

  if (! args) {
    args = {};
  }

  this._id = args._id;
  this.items = args.items || [];
  this.type = 'Inventory';
}

Inventory.createForCompany = function(company) {
  var id = collections.InventoryCollection.insert(
    new InventoryCompany({
      companyId: company._id
    }).serialize()
  );

  return Inventory.getById(id);
};

Inventory.getById = function(id){
  return dic.get('InventoryFactory').deserialize(
    collections.InventoryCollection.findOne({_id: id})
  );
};

Inventory.prototype.getByArmaClass = function(armaClass){
  return this.items.filter(function(item){
    return item.armaClass === armaClass;
  }).pop();
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