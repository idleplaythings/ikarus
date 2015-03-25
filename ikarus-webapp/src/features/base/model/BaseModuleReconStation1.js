BaseModuleReconStation1 = function BaseModuleReconStation1 () {
  BaseModule.call(this);
  this._id = "ReconStation1";
  this.name = "Recon & Signal station";
  this.description = "Gives you 4 binoculars and 4 GPS to use during mission.";
  this._removeLoot = {
    'ItemGPS': 4,
    'Binocular': 4
  };
};

BaseModuleReconStation1.prototype = Object.create(BaseModule.prototype);

