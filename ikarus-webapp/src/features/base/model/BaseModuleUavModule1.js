BaseModuleUavModule1 = function BaseModuleUavModule1 () {
  BaseModule.call(this);
  this._id = "UavModule1";
  this.name = "UAV control hub";
  this.description = "Gives you one UAV terminal to control UAVs and UGVs.";
};

BaseModuleUavModule1.prototype = Object.create(BaseModule.prototype);

