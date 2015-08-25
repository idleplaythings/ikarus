BaseModuleIrishPub = function BaseModuleIrishPub () {
  BaseModule.call(this);
  this._id = "IrishPub";
  this.name = "Classy Irish Pub";
  this.description = "Everything an irish paramilitary person might ever need.";
  this._removeLoot = {
    'hlc_rifle_auga1_b': 4,
    'hlc_30Rnd_556x45_B_AUG': 30
  };
};

BaseModuleIrishPub.prototype = Object.create(BaseModule.prototype);

