BaseModuleWeaponCache1 = function BaseModuleWeaponCache1 () {
  BaseModule.call(this);
  this._id = "WeaponCache1";
  this.name = "Insurgent weapon cache";
  this.description = "Provides you with 5 AKs, 1 RPK and plenty of ammo.";
  this._removeLoot = {
    'CUP_arifle_RPK74': 1,
    'CUP_arifle_AKS74': 2,
    'CUP_arifle_AK74': 3,
    'CUP_30Rnd_545x39_AK_M': 30,
    'CUP_75Rnd_TE4_LRT4_Green_Tracer_545x39_RPK_M': 5
  };
};

BaseModuleWeaponCache1.prototype = Object.create(BaseModule.prototype);

