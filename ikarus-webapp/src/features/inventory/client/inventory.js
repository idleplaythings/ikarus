Template.inventory.created = function() {
  console.log(this);
}

Template.inventory.helpers({
  isWeapon: function() {
    var item = get(this, 'item');

    if (!item)
      return false;

    return item instanceof ItemWeapon === true;
  },
  getMagazines: function() {
    var magazines = get(this, 'item.combatibleMagazines');

    if (!magazines)
      return;

    var data = Template.instance().data;
    var mags = magazines.map(function(magazineArmaClass) {
      var magazine = get(data, 'itemsByClass.' + magazineArmaClass);
      return magazine ? magazine : null;
    }).filter(function(mag) {
      return mag !== null;
    });

    return mags;
  },
  totalCount: function() {
    return this.targetCount + this.sourceCount;
  },
  targetInventoryItemCount: function() {
    return get(Template.instance(), 'data.targetInventory.items.length');
  },
  targetInventoryMaxItemCount: function() {
    var inventory = get(Template.instance(), 'data.targetInventory');

    if (inventory)
      return inventory.getMaxItemCount();

    return null;
  },
  locked: function() {
    var inventory = get(Template.instance(), 'data.targetInventory');

    if (inventory) {
      return inventory.isLocked();
    }

    return null;
  }
});

Template.inventory.events({
  'click .add-to-inventory': function(event, template){
    event.preventDefault();
    event.stopPropagation();
    var armaClass = jQuery(event.target).attr("data-armaclass");
    Meteor.call(
      'addToInventory',
      armaClass,
      function (error, result) {
        if (error) {
          alert(error)
        }
      }
    );
  },
  'click .remove-from-inventory': function(event, template){
    event.preventDefault();
    event.stopPropagation();
    var armaClass = jQuery(event.target).attr("data-armaclass");
    console.log("remove", armaClass);
    Meteor.call(
      'removeFromInventory',
      armaClass,
      function (error, result) {
        if (error) {
          alert(error)
        }
      }
    );
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
      $elem.prepend('<img class="item-image" src="/missing-item.png">');
      return;
    }

    $elem.find('img').remove();
    $elem.prepend('<img class="item-image" src="/items/' + matches[0].img + '">');
  };
  var hideItem = function (event, template) {
    var $target = jQuery(event.target);

    if (!$target.is('img')) {
      $target = $target.find('img');
    }

    $target.remove();
  };

  Template.inventory.events({
    'mouseenter .inventory-entry': showItem,
    'mouseleave .inventory-entry': hideItem,
    'mouseenter .inventory-entry img': hideItem
  });
});
