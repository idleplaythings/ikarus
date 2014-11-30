module.exports = Squad;

function Squad(args) {
  
  this._id = args.id;
  this._playerIds = args.playerIds
  this._startingLocation = args.startingLocation;
  this._equipment = args.equipment || new SquadEquipment();
  this._objectives = args.objectives || [SUPPLY];
}

Squad.prototype.serializeForArma = function(){
  return [
    this._id,
    this._playerIds,
    this._startingLocation,
    this._equipment.serializeForArma(),
    null, 
    null, 
    [], 
    this._objectives,
    []
  ];
};