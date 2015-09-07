InventoryView = function InventoryView(args) {
  this.sourceInventory = args.sourceInventory || null;
  this.targetInventory = args.targetInventory || null;
  this.itemsByClass = {}
  this.groups = [];
  this.layout = [];
  this.vehicleSlots = 0;
  this.armorSlots = 0;
  this.heloSlots = 0;
  this.staticWeaponSlots = 0;
}

InventoryView.prototype.getUsedStaticWeaponSlots = function() {
  return this.targetInventory.getAmountOfItemsWithTag(['static weapon']);
};

InventoryView.prototype.getUsedVehicleSlots = function() {
  return this.targetInventory.getAmountOfItemsWithTag(['vehicle', 'unarmored']);
};

InventoryView.prototype.getUsedArmorSlots = function() {
  return this.targetInventory.getAmountOfItemsWithTag(['vehicle', 'armored']);
};

InventoryView.prototype.getUsedHeloSlots = function() {
  return this.targetInventory.getAmountOfItemsWithTag(['helicopter']);
};

InventoryView.prototype.addGroup = function(column) {
  this.groups.push(column);
}

InventoryView.prototype.refresh = function() {
  var self = this;

  self.layout = [];
  self.populateItemsByClass();

  self.groups.forEach(function(group) {
    var layoutColumn = {
      title: group.title,
      items: []
    };

    Object.keys(self.itemsByClass).forEach(function(armaClass) {
      var itemWrapper = self.itemsByClass[armaClass];
      if (group.policy(itemWrapper)) {
        layoutColumn.items.push(itemWrapper);
      }
    });

    layoutColumn.items.sort(group.sort);

    this.layout.push(layoutColumn);
  }.bind(this));
}

InventoryView.prototype.populateItemsByClass = function() {
  var self = this;
  self.itemsByClass = {};

  if (this.sourceInventory) {
    this.sourceInventory.items.forEach(function(item) {
      var armaClass = get(item, 'armaClass');

      if (!armaClass) {
        return;
      }

      if (self.itemsByClass[armaClass]) {
        self.itemsByClass[armaClass].sourceCount++;
      } else {
        self.itemsByClass[armaClass] = {
          sourceCount: 1,
          targetCount: 0,
          item: item
        }
      }
    });
  }

  if (this.targetInventory) {
    this.targetInventory.items.forEach(function(item) {
      var armaClass = get(item, 'armaClass');

      if (!armaClass) {
        return;
      }

      if (self.itemsByClass[armaClass]) {
        self.itemsByClass[armaClass].targetCount++;
      } else {
        self.itemsByClass[armaClass] = {
          sourceCount: 0,
          targetCount: 1,
          item: item
        }
      }
    });
  }
}
