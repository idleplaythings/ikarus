Company = function Company(args) {
  this._id = args._id || undefined;
  this.name = args.name;
  this.playerIds = args.playerIds || [];
}

Company.prototype.getId = function() {
  return this._id;
};

Company.prototype.getName = function() {
  return this.name;
}

Company.prototype.getPlayerIds = function() {
  return this.playerIds;
}

Company.prototype.addPlayer = function(player) {
  if (this.playerIds.indexOf(player.getSteamId()) !== -1) {
    return;
  }

  this.playerIds.push(player.getSteamId());
};

Company.prototype.removePlayer = function(player) {
  this.playerIds = this.playerIds.filter(function(steamId) {
    return steamId !== player.getSteamId();
  });
};
