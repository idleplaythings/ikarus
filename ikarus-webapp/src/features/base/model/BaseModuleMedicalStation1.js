BaseModuleMedicalStation1 = function BaseModuleReconStation1 () {
  BaseModule.call(this);
  this._id = "MedicalStation1";
  this.name = "Medical station";
  this.description = "Allows one member of the squad to become medic. Provides few blood bags and some epi pens.";
};

BaseModuleMedicalStation1.prototype = Object.create(BaseModule.prototype);

