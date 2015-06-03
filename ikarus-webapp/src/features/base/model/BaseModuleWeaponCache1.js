BaseModuleWeaponCache1 = function BaseModuleWeaponCache1 () {
  BaseModule.call(this);
  this._id = "WeaponCache1";
  this.name = "Insurgent weapon cache";
  this.description = "Provides you with 4 AKs, 1 RPK, 1 Lee Einfield and plenty of ammo for each";
  this._removeLoot = {
    'hlc_rifle_rpk74n': 1,
    'hlc_rifle_aks74': 2,
    'hlc_rifle_ak74': 3,
    'hlc_30Rnd_545x39_B_AK': 30,
    'hlc_45Rnd_545x39_t_rpk': 5
  };
};

BaseModuleWeaponCache1.prototype = Object.create(BaseModule.prototype);

