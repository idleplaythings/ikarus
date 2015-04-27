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
  isManageable: function() {
    var targetInventory = get(Template.instance(), 'data.targetInventory');

    if (!targetInventory) {
      return false;
    }

    return !targetInventory.isLocked();
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
