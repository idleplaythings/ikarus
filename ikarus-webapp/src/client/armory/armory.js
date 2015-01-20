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

jQuery.getJSON('/items.json').then(function(items) {
  Template.armory.events({
    'mouseenter .inventory-entry': function (event, template) {
      var $elem = jQuery(event.target);
      var armaClass = event.target.attributes.getNamedItem('data-armaclass').value;

      var matches = items.filter(function(item) { return item.armaClass === armaClass; });
      if (matches.length < 1) {
        return;
      }

      $elem.find('img').remove();
      $elem.prepend('<img src="/items/' + matches[0].img + '">');
    },
    'mouseleave .inventory-entry': function (event, template) {
      jQuery(event.target).find('img').remove();
    }
  });
});
