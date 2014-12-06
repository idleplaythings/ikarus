Squad = function Squad(args) {
  if (!args) {
    args = {};
  }

  this._id = args._id;
  this.serverId = args.serverId;
  this.companyId = args.companyId;
  this.playerIds = args.playerIds || [];
  this.startingLocation = args.startingLocation || {x: 10000, y:10000};
  this.objectives = args.objectives;
  this.squadId = args.squadId;
  this.locked = args.locked || false;
}

Squad.prototype.serialize = function() {
  return {
    serverId: this.serverId,
    companyId: this.companyId,
    playerIds: this.playerIds,
    startingLocation: this.startingLocation,
    objectives: this.objectives,
    squadId: this.squadId,
    locked: this.locked
  };
};

Squad.prototype.isLocked = function() {
  return this.locked;
}

Squad.prototype.isEmpty = function(){
  return this.playerIds.length === 0;
};

Squad.prototype.addPlayer = function(player) {
  if (this.playerIds.indexOf(player.steamId) !== -1) {
    return;
  }

  this.playerIds.push(player.steamId);
};

Squad.prototype.removePlayer = function(player){
  this.playerIds = this.playerIds.filter(function(steamId){
    return steamId !== player.steamId;
  });
};
