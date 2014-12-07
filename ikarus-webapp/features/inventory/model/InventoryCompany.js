
InventoryCompany = function InventoryCompany(args){
  Inventory.call(this, args);
  this.type = 'InventoryCompany';
  this.hasUnlimitedItems = true;
  this.companyId = args.companyId;
}

InventoryCompany.prototype = Object.create(Inventory.prototype);

InventoryCompany.prototype.serialize = function(){
  var serialized = Inventory.prototype.serialize.call(this);
  serialized.companyId = this.companyId;
  return serialized;
};




