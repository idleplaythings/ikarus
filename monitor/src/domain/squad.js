var SquadEquipment = require('./squadEquipment');

module.exports = Squad;

function Squad(args) {

  this.squadId = args.squadId;
  this.membersOnServer = args.membersOnServer
  this.startingLocation = args.startingLocation;
  this.missionItems = new SquadEquipment(args.missionItems);
  this.objectives = args.objectives || ['SUPPLY'];
  this.locked = args.locked;
}

Squad.prototype.serializeForArma = function(){
  return [
    this.squadId,
    this.membersOnServer,
    [this.startingLocation.x, this.startingLocation.y],
    this.missionItems.serializeForArma(),
    null,
    null,
    [],
    this._objectives,
    []
  ];
};