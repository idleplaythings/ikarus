Template.squadMemberInventory.helpers({
  getInventory: function(){
    var inventory = dic.get('InventoryRepository').getByPlayer(
      dic.get('PlayerRepository').getCurrent());

    return new InventoryUi({
      inventory: inventory,
      showUnlimited: false
    });
  },
  locked: function(){
    dic.get('InventoryRepository').getByPlayer(
      dic.get('PlayerRepository').getCurrent()
    ).locked;
  }
});