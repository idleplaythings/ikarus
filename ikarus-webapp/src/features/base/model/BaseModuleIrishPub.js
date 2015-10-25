BaseModuleIrishPub = function BaseModuleIrishPub () {
  BaseModule.call(this);
  this._id = "IrishPub";
  this.name = "Classy Irish Pub";
  this.description = "Everything an irish paramilitary person might ever need.";
  this._removeLoot = {
    'CUP_arifle_AK74': 4,
    'CUP_30Rnd_545x39_AK_M': 30
  };
};

BaseModuleIrishPub.prototype = Object.create(BaseModule.prototype);

