(function(){Squad = function Squad(args) {
  if (!args) {
    args = {};
  }

  this._id = args._id;
  this.serverId = args.serverId;
  this.companyId = args.companyId;
  this.steamIds = args.steamIds || [];
  this.startingLocation = args.startingLocation || {x: 10000, y:10000};
  this.objectives = args.objectives;
  this.locked = args.locked || false;
}

Squad.prototype.serialize = function() {
  return {
    serverId: this.serverId,
    companyId: this.companyId,
    steamIds: this.steamIds,
    startingLocation: this.startingLocation,
    objectives: this.objectives,
    locked: this.locked
  };
};

Squad.prototype.isLocked = function() {
  return this.locked;
}

Squad.prototype.isEmpty = function(){
  return this.steamIds.length === 0;
};

Squad.prototype.addPlayer = function(player) {
  if (this.steamIds.indexOf(player.steamId) !== -1) {
    return;
  }

  this.steamIds.push(player.steamId);
};

Squad.prototype.removePlayer = function(player){
  this.steamIds = this.steamIds.filter(function(steamId){
    return steamId !== player.steamId;
  });
};

Squad.getByPlayer = function(player) {
  return dic.get('SquadRepository').getByPlayer(player);
}

})();
