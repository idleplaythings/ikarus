ItemFactory = function ItemFactory(itemDefinitions){
  this._itemDefinitions = itemDefinitions;
}

ItemFactory.prototype.createItemByArmaClass = function(armaClass, args){
  var itemDefinition = this._itemDefinitions.filter(function(definition){
    return definition.armaClass === armaClass;
  }).pop();

  if (! itemDefinition){
    return null;
  }

  return itemDefinition.clone(args);
};

ItemFactory.prototype.createItems = function(armaClasses){
  return armaClasses.map(function(armaClass){
    return this.createItemByArmaClass(armaClass);
  }, this).filter(function(item){
    return Boolean(item);
  });
};

ItemFactory.prototype.getUnlimitedItems = function(){
  return this._itemDefinitions.filter(function(definition){
    return definition.unlimited;
  }).map(function(definition){
    return definition.clone();
  });
};