BaseModuleGarage1 = function BaseModuleGarage1 () {
  BaseModule.call(this);
  this._id = "Garage1";
  this.name = "Garage";
  this.description = "Garage allows you to select one vehicle to take on mission.";
  this.carSlots = 1;
};

BaseModuleGarage1.prototype = Object.create(BaseModule.prototype);

