BaseModuleStaticWeaponModule1 = function BaseModuleStaticWeaponModule1 () {
  BaseModule.call(this);
  this._id = "StaticWeaponModule1";
  this.name = "Static weapon depot";
  this.description = "This allows you to take two satic weapons with tripods on mission with you.";
  this.staticSlots = 4;
};

BaseModuleStaticWeaponModule1.prototype = Object.create(BaseModule.prototype);

