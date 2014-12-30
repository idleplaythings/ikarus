Template.armory.helpers({
  getInventory: getInventory
});

function getInventory(){
  var inventory = dic.get('InventoryRepository').getByCompany(this);
  console.log(this);
  return new InventoryUi({
    inventory: inventory,
    showUnlimited: true
  });
};