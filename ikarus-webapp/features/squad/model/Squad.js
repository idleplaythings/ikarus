Squad = function Squad(args) {
  this._id = args._id;
  this.serverId = args.serverId;
  this.members = args.members || [];
  this.missionItems = new SquadMissionItems(args.missionItems);
  this.startingLocation = args.startingLocation || {x: 10000, y:10000};
  this.objectives = args.objectives;
  this.squadId = args.squadId;
  this.locked = args.locked || false;
}

Squad.prototype.addPlayer = function(player) {
  if (this.members.indexOf(player.getSteamId()) !== -1)
    return;

  this.members.push(player.steamId);
};

Squad.prototype.removePlayer = function(player){
  this.members = this.members.filter(function(steamId){
    return steamId !== player.steamId;
  });
};

Squad.prototype.isEmpty = function(){
  return this.members.length === 0;
};

Squad.prototype.serialize = function(){
  return {
    serverId: this.serverId,
    members: this.members,
    missionItems: this.missionItems.serialize(),
    startingLocation: this.startingLocation,
    objectives: this.objectives,
    squadId: this.squadId,
    locked: this.locked
  };
};
