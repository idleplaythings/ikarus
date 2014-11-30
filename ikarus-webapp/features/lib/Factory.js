Factory = (function () {
  "use strict";

  function Factory() {
    this._registry = {};
  }

  Factory.prototype.add = function(key, value){
    this._registry[key] = value;
  };

  Factory.prototype.create = function(key) {
    if (typeof this._registry[key] === 'function') {
      return this._registry[key].call(undefined);
    }

    return this._registry[key];
  };

  Factory.createFactoryFromTags = function (tag) {
    var factory = new Factory();
    var classes = dic.getTagged(tag);

    classes.forEach(function(modelName) {
      factory.add(modelName, function() {
        return dic.get(modelName);
      });
    });

    return factory;
  };

  return Factory;
})();
