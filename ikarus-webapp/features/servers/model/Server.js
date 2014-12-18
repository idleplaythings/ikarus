Server = function Server(args) {
  this._id = args._id;
  this.name = args.name;
  this.status = args.status || Server.STATUS_DOWN;
  this.playerIds = args.playerIds || [];
}

Server.STATUS_IDLE = 'idle';
Server.STATUS_PLAYING = 'playing';
Server.STATUS_WAITING = 'waiting';
Server.STATUS_DOWN = 'down';

Server.prototype.updateStatus = function(status) {

  if (status !== Server.STATUS_IDLE &&
    status !== Server.STATUS_DOWN &&
    status !== Server.STATUS_WAITING &&
    status !== Server.STATUS_PLAYING){
    throw new Error("Unknown status: '"+status+"'" );
  }

  this.status = status;
}

Server.prototype.removePlayers = function(player) {
  this.playerIds = [];
}

Server.prototype.addPlayer = function(player) {
  if (this.playerIds.indexOf(player.getSteamId()) !== -1) {
    return;
  }
  this.playerIds.push(player.getSteamId());
}

Server.prototype.removePlayer = function(player) {
  this.playerIds = this.playerIds.filter(function(steamId) {
    return steamId !== player.getSteamId();
  });
}

Server.prototype.playerCount = function() {
  if (this.playerIds) {
    return this.playerIds.length;
  }

  return 0;
};

Server.prototype.serialize = function() {
  return {
    name: this.name,
    playerIds: this.playerIds,
    status: this.status
  };
};
