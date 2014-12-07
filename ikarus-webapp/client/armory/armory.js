Template.armory.helpers({
  getInventory: function(){
    return dic.get('InventoryRepository').getByCompany(this);
  }
})