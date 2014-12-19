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
