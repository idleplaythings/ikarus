module.exports = Squad;

function Squad(args) {

  this._id = args._id;
  this.companyId = args.companyId;
  this.steamIds = args.steamIds || [];
  this.startingLocation = args.startingLocation || {x:10000, y:10000};
  this.objective = 'Supply';
  this.locked = args.locked;
  this.gear = args.gear;
  this.baseModules = args.baseModules;
  this.outposts = args.outposts;
}