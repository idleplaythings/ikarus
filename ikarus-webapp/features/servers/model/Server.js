Server = function Server(args) {
  this._id = args._id;
  this.name = args.name;
  this.status = args.status || Server.STATUS_IDLE;
  this.playerIds = args.playerIds || [];
}

Server.STATUS_IDLE = 'idle';
Server.STATUS_PLAYING = 'playing';

Server.prototype.addPlayer = function(player) {
  if (this.playerIds.indexOf(player.steamId) !== -1) {
    return;
  }
  this.playerIds.push(player.steamId);
}

Server.prototype.removePlayer = function(player) {
  this.playerIds = this.playerIds.filter(function(steamId) {
    return steamId !== player.steamId;
  });
}

Server.prototype.playerCount = function() {
  if (this.playerIds) {
    return this.playerIds.length;
  }

  return 0;
};
