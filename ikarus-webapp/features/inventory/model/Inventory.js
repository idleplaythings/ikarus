
Inventory = function Inventory(){
  this._items = [];
}

Inventory.prototype.serialize = function(){

  var itemsByTypes = {

  };

  return this._items.forEach(function(item){
    if (itemsByTypes[item.armaClass]){
      itemsByTypes[item.armaClass]++;
    } else {
      itemsByTypes[item.armaClass] = 1;
    }
  });
};

