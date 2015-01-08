
InventoryUi = function InventoryUi(args){
  if (! args){
    args = {};
  }

  var items = args.inventory ? args.inventory.items : [];
  this.showUnlimited = args.showUnlimited;
  this.items = this._getItemsAndCounts(items);
};

InventoryUi.prototype.getOtherThanMagazines = function(){
  return this.items.filter(function(itemAndCount){
    return ! itemAndCount.item.isMagazine();
  });
};

InventoryUi.prototype.getCountByClass = function(armaClass){
  var entry =  this.items.filter(function(itemAndCount){
    return itemAndCount.item.armaClass == armaClass;
  }).pop();

  if ( ! entry)
    return 0;

  return entry.getCount();
};

InventoryUi.prototype._getItemsAndCounts = function(items){
  var itemsAndCounts = [];

  items.forEach(function(item){
    var existing = itemsAndCounts.filter(function(existingItem){
      return existingItem.item.armaClass === item.armaClass;
    }).pop();

    if (existing){
      if (existing.count !== -1)
        existing.count ++;
    } else {
      this._createItemEntry(item, itemsAndCounts);
    }
  }, this);

  itemsAndCounts.forEach(function(itemAndCount){
    itemAndCount.ammo = this._getAmmoAmount(itemAndCount.item, items);
  }.bind(this));

  return itemsAndCounts.sort(function(a, b) {

    if (! a.item.isWeapon() && b.item.isWeapon())
      return 1;

    if (a.item.isWeapon() && ! b.item.isWeapon())
      return -1;

    return a.item.armaClass > b.item.armaClass;
  });
};


InventoryUi.prototype._getAmmoAmount = function(weapon, items) {
  if (! weapon.isWeapon()){
    return null;
  }

  var unlimited = false;

  var count = items.filter(function(item){
    var combatible = weapon.isCombatibleMagazine(item);
    if (combatible && item.unlimited) {
      unlimited = true;
    }

    return combatible;
  }).length;

  return unlimited ? '∞' : count;
};

InventoryUi.prototype._createItemEntry = function(item, itemsAndCounts) {
  var unlimited = item.unlimited;
  var showUnlimited = this.showUnlimited;

  var entry = {
    item: item,
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


