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
  getInventory: function getInventory() {
    var inventory = Inventory.getByCompany(this);
    return new InventoryUi({
      inventory: inventory,
      showUnlimited: true
    });
  }
});
