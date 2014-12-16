Template.armory.helpers({
  getInventory: function(){
    var inventory = dic.get('InventoryRepository').getByCompany(this);
    return new InventoryUi({
      inventory: inventory,
      showUnlimited: true
    });
  },
  squad: function() {
    var player = Player.getCurrent();
    if (! player)
      return null;

    return dic.get('SquadRepository').getByPlayer(player);
  }
})