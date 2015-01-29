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
  var showItem = function (event, template) {
    var $elem = jQuery(event.target);
    var armaClass = event.target.attributes.getNamedItem('data-armaclass').value;

    var matches = items.filter(function(item) { return item.armaClass === armaClass; });
    if (matches.length < 1) {
      console.log('missing item ' + armaClass);
      $elem.find('img').remove();
      $elem.prepend('<img src="/missing-item.png">');
      return;
    }

    $elem.find('img').remove();
    $elem.prepend('<img src="/items/' + matches[0].img + '">');
  };
  var hideItem = function (event, template) {
    var $target = jQuery(event.target);

    if (!$target.is('img')) {
      $target = $target.find('img');
    }

    $target.remove();
  };

  Template.armory.events({
    'mouseenter .inventory-entry': showItem,
    'mouseleave .inventory-entry': hideItem,
    'mouseenter .inventory-entry img': hideItem
  });
});
