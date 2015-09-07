BaseModuleMortarPit = function BaseModuleMortarPit () {
  BaseModule.call(this);
  this._id = "MortarPit";
  this.name = "(DISABLED) Mortar Pit";
  this.description = "THIS IS DISABLED AND WILL BE REMOVED SOON!";
};

BaseModuleMortarPit.prototype = Object.create(BaseModule.prototype);

