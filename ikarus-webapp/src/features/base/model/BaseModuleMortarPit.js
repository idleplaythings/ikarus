BaseModuleMortarPit = function BaseModuleMortarPit () {
  BaseModule.call(this);
  this._id = "MortarPit";
  this.name = "Mortar Pit";
  this.description = "Provides you with one static mortar and ammo.";
};

BaseModuleMortarPit.prototype = Object.create(BaseModule.prototype);

