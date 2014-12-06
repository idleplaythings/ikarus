
InventoryCompany = function InventoryCompany(args){
  Inventory.call(this, args);
  this.type = 'company';
}

InventoryCompany.prototype = Object.create(Inventory.prototype);




