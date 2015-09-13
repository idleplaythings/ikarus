BaseModuleShootingRange1 = function BaseModuleShootingRange1 () {
  BaseModule.call(this);
  this._id = "ShootingRange1";
  this.name = "Shooting range";
  this.description = "Gives you 4 railed Lee Einfield rifles with ammo.";
  this.size = 1;
  this._removeLoot = {
    'CUP_srifle_LeeEnfield_rail': 4,
    'CUP_10x_303_M': 20
  };
};

BaseModuleShootingRange1.prototype = Object.create(BaseModule.prototype);

