BaseModulePrimary1 = function BaseModulePrimary1(){
  BaseModule.call(this);
  this._id = "Primary1";
  this.name = "Camp";
  this.description = "An irregular camp of couple tents, a fire and two ATVs." +
   " Most basic of possible primary modules for a base.";
  this._primary = true;
  this._removeLoot = {
    'CUP_arifle_AKS74U': 4,
    'CUP_30Rnd_545x39_AK_M': 20
  };
};

BaseModulePrimary1.prototype = Object.create(BaseModule.prototype);

BaseModulePrimary2 = function BaseModulePrimary2(){
  BaseModulePrimary1.call(this);
  this._id = "Primary2";
  this.name = "Slum tower";
  this.description = "Two story stone building, with questionable fortifications on to. Two ATVs.";

};

BaseModulePrimary2.prototype = Object.create(BaseModulePrimary1.prototype);

BaseModulePrimary3 = function BaseModulePrimary3(){
  BaseModulePrimary1.call(this);
  this._id = "Primary3";
  this.name = "Bunker shed";
  this.description = "A complex consisting of small shed with fortifications on top and camouflaged large bunker. Two ATVs.";

};

BaseModulePrimary3.prototype = Object.create(BaseModulePrimary1.prototype);

BaseModulePrimary4 = function BaseModulePrimary4(){
  BaseModulePrimary1.call(this);
  this._id = "Primary4";
  this.name = "Fuel station";
  this.description = "An old fuel station built into a fortress. Has garage for one vehicle and one ATV.";
  this.carSlots = 1;
};

BaseModulePrimary4.prototype = Object.create(BaseModulePrimary1.prototype);

BaseModulePrimary5 = function BaseModulePrimary5(){
  BaseModulePrimary1.call(this);
  this._id = "Primary5";
  this.name = "Shop tower";
  this.description = "An observation tower built on top of an old shop. Two ATVs.";

};

BaseModulePrimary5.prototype = Object.create(BaseModulePrimary1.prototype);

BaseModulePrimary6 = function BaseModulePrimary6(){
  BaseModulePrimary1.call(this);
  this._id = "Primary6";
  this.name = "Slum tower 2";
  this.description = "Two story building with a container and bunker fortifications on top. Two ATVs.";

};

BaseModulePrimary6.prototype = Object.create(BaseModulePrimary1.prototype);

BaseModulePrimary7 = function BaseModulePrimary7(){
  BaseModulePrimary1.call(this);
  this._id = "Primary7";
  this.name = "Large building";
  this.description = "Large two story building with a bunker on top. Two ATVs.";

};

BaseModulePrimary7.prototype = Object.create(BaseModulePrimary1.prototype);





