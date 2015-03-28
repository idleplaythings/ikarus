BaseModulePrimary1 = function BaseModulePrimary1(){
  BaseModule.call(this);
  this._id = "Primary1";
  this.name = "Camp";
  this.description = "An irregular camp of couple tents, a fire and two ATVs." +
   " Most basic of possible primary modules for a base.";
  this._primary = true;
};

BaseModulePrimary1.prototype = Object.create(BaseModule.prototype);