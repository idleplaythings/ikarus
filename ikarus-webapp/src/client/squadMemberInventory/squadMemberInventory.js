Template.squadMemberInventory.created = function(){
  Tracker.autorun(function(){
    var player = Player.getCurrent();

    if (! player){
      return;
    }

    var squad = Squad.getByPlayer(player);

    if (! squad){
      return;
    }

    Meteor.subscribe('SquadInventory', squad._id);
  });
};

Template.squadMemberInventory.helpers({
  getInventory: getInventory,
  locked: locked,
  getAmmo: getAmmo
});

Template.squadMemberInventory.events({
  'click .remove-from-inventory': function(event, template){
    var armaClass = jQuery(event.target).attr("data-armaclass");
    console.log("remove", armaClass);
    Meteor.call(
      'removeFromInventory',
      armaClass,
      function (error, result){}
    );
  }
});

Template.squadMemberInventory_ammoEntry.helpers({
  getInventory: getInventory,
  locked: locked,
  getAmmo: getAmmo
});

function getInventory(){
  var inventory = getCurrentInventory();

  return new InventoryUi({
    inventory: inventory,
    showUnlimited: false
  });
};

function getAmmo(item){
  if ( ! item.combatibleMagazines)
    return [];

  return dic.get('ItemFactory').createItems(item.combatibleMagazines);
};

function locked(){
  return getInventory().locked;
};

function getCurrentInventory(){
  return Inventory.getBySquad(getSquad());
};

function getSquad(){
  return Player.getCurrent().getSquad();
};