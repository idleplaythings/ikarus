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
  var inventory = dic.get('InventoryRepository').getByPlayer(
  Player.getCurrent());

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
  dic.get('InventoryRepository').getByPlayer(
    Player.getCurrent()
  ).locked;
};