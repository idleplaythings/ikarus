InventoryView = function InventoryView(args) {
  this.sourceInventory = args.sourceInventory || null;
  this.targetInventory = args.targetInventory || null;
  this.itemsByClass = {}
  this.groups = [];
  this.layout = [];
}

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
