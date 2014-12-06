Company = function Company(args) {
  this._id = args._id || undefined;
  this.name = args.name;
  this.playerIds = args.playerIds || [];
}

Company.prototype.addPlayer = function(player) {
  if (this.playerIds.indexOf(player.steamId) !== -1) {
    return;
  }

  this.playerIds.push(player.steamId);
};

Company.prototype.removePlayer = function(player) {
  this.playerIds = this.playerIds.filter(function(steamId) {
    return steamId !== player.steamId;
  });
};
