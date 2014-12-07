
Inventory = function Inventory(args){

  if (! args) {
    args = {};
  }

  this._id = args._id;
  this.items = args.items || [];
  this.type = 'Inventory';
}

Inventory.prototype.getItemsAndCounts = function(){
  var itemsAndCounts = [];

  this.items.forEach(function(item){
    var existing = itemsAndCounts.filter(function(existingItem){
      return existingItem.armaClass === item.armaClass;
    }).pop();

    if (existing){
      if (existing.count !== -1)
        existing.count ++;
    } else {

      var count = item.unlimited ? -1 : 1;

      itemsAndCounts.push({
        armaClass: item.armaClass,
        name: item.name,
        count: count,
        getCount: function(){
          if (count === -1){
            return '∞';
          }
          return count;
        }
      })
    }
  });

  return itemsAndCounts;
};

Inventory.prototype.serialize = function(){

  var itemsByTypes = {};

  this.items.filter(function(item){
    return ! item.unlimited;
  }).forEach(function(item){
    if (itemsByTypes[item.armaClass]){
      itemsByTypes[item.armaClass]++;
    } else {
      itemsByTypes[item.armaClass] = 1;
    }
  });

  return {
    type: this.type,
    items: itemsByTypes
  };
};