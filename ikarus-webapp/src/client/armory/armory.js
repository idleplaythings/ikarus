Template.armory.created = function(){
  Tracker.autorun(function(){
    var player = Player.getCurrent();

    if (! player){
      return;
    }

    var company = Company.getByPlayer(player);

    if (! company){
      return;
    }

    Meteor.subscribe('CompanyArmory', company._id);
  });
};

Template.armory.helpers({
  getInventory: getInventory,
  squad: function() {
    var player = Player.getCurrent();

    if (!player) {
      return null;
    }

    var squad = player.getSquad();

    if (!squad) {
      return null;
    }

    return squad;
  }
});

function getInventory(){
  var inventory = Inventory.getByCompany(this);
  return new InventoryUi({
    inventory: inventory,
    showUnlimited: true
  });
};