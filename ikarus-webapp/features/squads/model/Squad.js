Squad = function Squad(args) {
  if (!args) {
    args = {};
  }

  this._id = args._id;
  this.serverId = args.serverId;
  this.companyId = args.companyId;
  this.playerIds = args.playerIds || [];
  this.missionItems = new SquadMissionItems(args.missionItems);
  this.startingLocation = args.startingLocation || {x: 10000, y:10000};
  this.objectives = args.objectives;
  this.squadId = args.squadId;
  this.locked = args.locked || false;
}

Squad.prototype.getId = function() {
  return this._id;
}

Squad.prototype.getServerId = function() {
  return this.serverId;
}

Squad.prototype.getCompanyId = function() {
  return this.companyId;
}

Squad.prototype.getPlayerIds = function() {
  return this.playerIds;
}

Squad.prototype.isLocked = function() {
  return this.locked;
}

Squad.prototype.isEmpty = function(){
  return this.playerIds.length === 0;
};

Squad.prototype.addPlayer = function(player) {
  if (this.playerIds.indexOf(player.getSteamId()) !== -1) {
    return;
  }

  this.playerIds.push(player.getSteamId());
};

Squad.prototype.removePlayer = function(player){
  this.playerIds = this.playerIds.filter(function(steamId){
    return steamId !== player.getSteamId();
  });
};
