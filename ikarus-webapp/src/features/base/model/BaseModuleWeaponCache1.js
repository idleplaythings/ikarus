BaseModuleWeaponCache1 = function BaseModuleWeaponCache1 () {
  BaseModule.call(this);
  this._id = "WeaponCache1";
  this.name = "Insurgent weapon cache";
  this.description = "Provides you with 4 AKs, 1 RPK, 1 Lee Einfield and plenty of ammo for each";
  this._removeLoot = {
    /*
    'CUP_srifle_LeeEnfield': 1,
    'CUP_arifle_AK74': 4,
    'CUP_arifle_RPK74': 1,
    'CUP_75Rnd_TE4_LRT4_Green_Tracer_545x39_RPK_M': 5,
    'CUP_10x_303_M': 5,
    'CUP_30Rnd_545x39_AK_M': 20,
    */
    'arifle_Mk20_F': 1,
    'arifle_Mk20C_F': 1,
    'arifle_TRG21_F': 2,
    'arifle_TRG20_F': 2,
    '30Rnd_556x45_Stanag': 30
  };
};

BaseModuleWeaponCache1.prototype = Object.create(BaseModule.prototype);

