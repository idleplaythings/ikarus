BaseModuleBodyArmor1 = function BaseModuleBodyArmor1 () {
  BaseModule.call(this);
  this._id = "BodyArmor1 ";
  this.name = "Body armor container";
  this.description = "Provides armor for 4 persons.";
  this._removeLoot = {
    'V_PlateCarrierIA2_dgtl': 2,
    'V_PlateCarrier2_rgr': 2,
    'H_HelmetIA': 4
  };
};

BaseModuleBodyArmor1.prototype = Object.create(BaseModule.prototype);

