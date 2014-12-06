ItemFactory = function ItemFactory(itemDefinitions){
  this._itemDefinitions = itemDefinitions;
}

ItemFactory.prototype.createItemByArmaClass = function(armaClass, args){
  var itemDefinition = this.itemDefinitions.filter(function(definition){
    return definition.armaClass === armaClass;
  }).pop();

  if (! itemDefinition){
    return null;
  }

  return itemDefinition.clone(args);
};