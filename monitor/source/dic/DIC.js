module.exports = (function(){
  'use strict';

  function DIC() {
    this._registry = {};
    this._shared = {};
    this._tags = {};
    this._resolved = false;
  }

  DIC.prototype.register = function(name, item, opts) {
    opts = opts || {};

    this._registry[name] = item;

    if (opts.shared) {
      // Flag this name as a shared instance,
      // but don't instantiate it yet
      this._shared[name] = null;
    }

    if (opts.tags) {
      opts.tags.forEach(function(tag) {
        this._tag(name, tag);
      }.bind(this));
    }
  };

  DIC.prototype.get = function(name) {
    if (this._isShared(name)) {
      this._shared[name] = this._shared[name] || this._create(name);
      return this._shared[name];
    }

    return this._create(name);
  };

  DIC.prototype.getTagged = function(tag) {
    return this._tags[tag];
  };

  DIC.prototype._tag = function(name, tag) {
    if (typeof this._tags[tag] === 'undefined') {
      this._tags[tag] = [];
    }

    this._tags[tag].push(name);
  };

  DIC.prototype._isShared = function(name) {
    return Object.keys(this._shared).indexOf(name) != -1;
  };

  DIC.prototype._create = function(name) {
    if (typeof this._registry[name] === 'undefined') {
      throw new Error("Undefined key: '" + name + "'");
    }

    if (typeof this._registry[name] === 'function') {
      return this._registry[name].call(undefined, this);
    }

    return this._registry[name];
  };

  return DIC;
})();
