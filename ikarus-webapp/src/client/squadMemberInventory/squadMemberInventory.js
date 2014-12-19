Template.squadMemberInventory.helpers({
  getInventory: function(){
    var inventory = dic.get('InventoryRepository').getByPlayer(
      Player.getCurrent());

    return new InventoryUi({
      inventory: inventory,
      showUnlimited: false
    });
  },
  locked: function(){
    dic.get('InventoryRepository').getByPlayer(
      Player.getCurrent()
    ).locked;
  }
});