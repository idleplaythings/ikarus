get = function get(obj, property) {
  if (Boolean(obj) === false) {
    return null;
  }

  if (property.indexOf('.') === -1) {
    if (typeof obj[property] !== 'undefined') {
      return obj[property];
    }

    return null;
  }

  var properties = property.split('.');
  return get(obj[properties.shift()], properties.join('.'));
};


gettersAndSetters = function(target, list, source) {
  list.forEach(function(name) {
    target['get'+name] = function() {
      return get(this.getDoc(), name.toLowerCase());
    };

    target['set'+name] = function(value) {
      var set = {};
      set[name.toLowerCase()] = value;

      source.update(
        { _id: this._id },
        { $set: set }
      );
    };
  });
}