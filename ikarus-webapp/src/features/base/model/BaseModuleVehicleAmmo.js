BaseModuleVehicleAmmo = function BaseModuleVehicleAmmo () {
  BaseModule.call(this);
  this._id = "VehicleAmmo";
  this.name = "Vehicle ammo depot";
  this.description = "Provides ammo for armed vehicles. Without this module, all armed vehicles will have zero ammo!";
};

BaseModuleVehicleAmmo.prototype = Object.create(BaseModule.prototype);

