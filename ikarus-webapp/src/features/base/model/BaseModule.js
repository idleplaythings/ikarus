var namespace = this;

BaseModule = function BaseModule() {
  this._id = "";
  this.name = "";
  this.description = "";
  this.carSlots = 0;
  this.armorSlots = 0;
  this.heloSlots = 0;
  this.size = 1;
};

BaseModule.prototype.isPrimary = function () {
  return Boolean(this._primary);
};

BaseModule.prototype.isNormal = function () {
  return ! this.isPrimary();
};

BaseModule.prototype.serialize = function () {
  return this._id;
};

BaseModule.calculateVehicleSlots = function(modules) {
  var slots = 0;
  modules.forEach(function(module){
    slots += module.carSlots;
  });
  return slots;
};

BaseModule.calculateArmorSlots = function(modules) {
  var slots = 0;
  modules.forEach(function(module){
    slots += module.armorSlots;
  });
  return slots;
};

BaseModule.calculateHeloSlots = function(modules) {
  var slots = 0;
  modules.forEach(function(module){
    slots += module.heloSlots;
  });
  return slots;
};

BaseModule.create = function (id) {
  if (id.constructor === Array) {
    return id.map(BaseModule.create);
  } else {
    return new namespace['BaseModule' + id]();
  }
};

BaseModule.getPrimaryModules = function () {
  return BaseModule.getAllModules().filter(function(module) {
    return module.isPrimary();
  })
};

BaseModule.getNormalModules = function () {
  return BaseModule.getAllModules().filter(function(module) {
    return module.isNormal();
  })
};

BaseModule.getAllModules = function () {
  return Object.keys(namespace).filter(function(key){
    return key.indexOf('BaseModule') > -1 && key !== 'BaseModule';
  }).map(function(key){
    return key.replace("BaseModule", "");
  }).map(BaseModule.create);
};