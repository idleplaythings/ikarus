module.exports = Squad;

function Squad(args) {

  this._id = args._id;
  this.companyId = args.companyId;
  this.steamIds = args.steamIds || [];
  this.startingLocation = args.startingLocation || {x:10000, y:10000};
  this.objectives = args.objectives || ['SUPPLY'];
  this.locked = args.locked;
}