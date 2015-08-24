BaseModuleHeloLandingPad1 = function BaseModuleHeloLandingPad1 () {
  BaseModule.call(this);
  this._id = "HeloLandingPad1";
  this.name = "Helicopter landing pad";
  this.description = "Allows you to take one helicopter on mission with you. Takes two base module slots!";
  this.heloSlots = 1;
  this.size = 2;
};

BaseModuleHeloLandingPad1.prototype = Object.create(BaseModule.prototype);

