Meteor.methods({
  'addToInventory': function(armaClass){
    var squad = getSquad();
    var company = getCompany();

    if (squad.isLocked()) {
      return false;
    }

    var squadInventory = Inventory.getBySquad(squad);

    var item = dic.get('ItemFactory').createItemByArmaClass(armaClass);

    if (! item) {
      return;
    }

    var modules = squad.getBaseModules();
    var vehicleSlots = BaseModule.calculateVehicleSlots(modules);
    var heloSlots = BaseModule.calculateHeloSlots(modules);
    var staticSlots = BaseModule.calculateStaticSlots(modules);

    if (item.hasTags('vehicle') && squadInventory.getAmountOfItemsWithTag('vehicle') > (vehicleSlots - 1)) {
      return;
    }

    if (item.hasTags('helicopter') && squadInventory.getAmountOfItemsWithTag('helicopter') > (heloSlots - 1)) {
      return;
    }

    if (item.hasTags('static weapon') && squadInventory.getAmountOfItemsWithTag('static weapon') > (staticSlots - 1)) {
      return;
    }

    Inventory.moveFromInventory(
      Inventory.getByCompany(company),
      squadInventory,
      armaClass
    );
  },

  'removeFromInventory': function(armaClass){
    var squad = getSquad();
    var company = getCompany();

    if (squad.isLocked()) {
      return false;
    }

    var armory = Inventory.getByCompany(company);
    Inventory.moveFromInventory(
      Inventory.getBySquad(squad),
      armory,
      armaClass
    );

    var inventory = Inventory.getBySquad(squad);

    inventory.getOrphanedMagazines().forEach(
      function (orphan){
        Inventory.moveFromInventory(
          inventory,
          armory,
          orphan.armaClass
        )
      }
    );
  }
});

function getSquad(){
  var player = getPlayer();
  var squad = Squad.getByPlayer(player);

  if (! squad){
    throw new Meteor.Error(404, 'Squad not found');
  }

  return squad;

};

function getPlayer(){
  var player = Player.getCurrent();

  if (! player){
    throw new Meteor.Error(404, 'Player not found');
  }

  return player;
}

function getCompany() {
  var player = getPlayer();
  return player.getCompany();
}
