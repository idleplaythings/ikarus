BaseModuleOutpostMap1 = function BaseModuleOutpostMap1 () {
  BaseModule.call(this);
  this._id = "OutpostMap1";
  this.name = "Outpost network";
  this.description = "Allows you to teleport to any of your active outposts at the start of the mission.";
};

BaseModuleOutpostMap1.prototype = Object.create(BaseModule.prototype);

