
InventoryUi = function InventoryUi(args){
  if (! args){
    args = {};
  }

  var items = args.inventory ? args.inventory.items : [];
  this.showUnlimited = args.showUnlimited;
  this.items = this._getItemsAndCounts(items);
};

InventoryUi.prototype._getItemsAndCounts = function(items){
  var itemsAndCounts = [];

  items.forEach(function(item){
    var existing = itemsAndCounts.filter(function(existingItem){
      return existingItem.armaClass === item.armaClass;
    }).pop();

    if (existing){
      if (existing.count !== -1)
        existing.count ++;
    } else {
      this._createItemEntry(item, itemsAndCounts);
    }
  }, this);

  return itemsAndCounts;
};

InventoryUi.prototype._createItemEntry = function(item, itemsAndCounts) {
  var unlimited = item.unlimited;
  var showUnlimited = this.showUnlimited;

  var entry = {
    armaClass: item.armaClass,
    name: item.name,
    count: 1,
  };

  entry.getCount = function(){
    if (showUnlimited && unlimited){
      return '∞';
    }
    return this.count;
  }.bind(entry);

  itemsAndCounts.push(entry);

};


