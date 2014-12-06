module.exports = Squad;

function Squad(args) {

  this.squadId = args.squadId;
  this.companyId = args.companyId;
  this.playerIds = args.playerIds;
  this.startingLocation = args.startingLocation;
  this.objectives = args.objectives || ['SUPPLY'];
  this.locked = args.locked;
}