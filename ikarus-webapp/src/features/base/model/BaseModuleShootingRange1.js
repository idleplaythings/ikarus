BaseModuleShootingRange1 = function BaseModuleShootingRange1 () {
  BaseModule.call(this);
  this._id = "ShootingRange1";
  this.name = "Shooting range";
  this.description = "Gives you one MRCO scope and one railed Lee Einfield rifle with ammo. Requires 2 module slots.";
  this.size = 2;
  this._removeLoot = {
    'CUP_srifle_LeeEnfield_rail': 1,
    'CUP_10x_303_M': 10,
    'optic_MRCO': 1
  };
};

BaseModuleShootingRange1.prototype = Object.create(BaseModule.prototype);

