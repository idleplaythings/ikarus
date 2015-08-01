BaseModulePrimary1 = function BaseModulePrimary1(){
  BaseModule.call(this);
  this._id = "Primary1";
  this.name = "Camp";
  this.description = "An irregular camp of couple tents, a fire and two ATVs." +
   " Most basic of possible primary modules for a base.";
  this._primary = true;
  this._removeLoot = {
    'hlc_rifle_aks74u': 4,
    'hlc_30Rnd_545x39_B_AK': 20
  };
};

BaseModulePrimary1.prototype = Object.create(BaseModule.prototype);