module.exports = Squad;

function Squad(args) {

  this._id = args._id;
  this.companyId = args.companyId;
  this.steamIds = args.steamIds;
  this.startingLocation = args.startingLocation;
  this.objectives = args.objectives || ['SUPPLY'];
  this.locked = args.locked;
}