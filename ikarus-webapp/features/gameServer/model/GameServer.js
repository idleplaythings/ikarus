GameServer = function GameServer(args) {
  this._id = args._id;
  this.name = args.name;
  this.status = args.status || GameServer.STATUS_IDLE;
  this.playerIds = args.playerIds || [];
}

GameServer.STATUS_IDLE = 'idle';
GameServer.STATUS_PLAYING = 'playing';

GameServer.prototype.getId = function() {
  return this._id;
}

GameServer.prototype.getName = function() {
  return this.name;
}

GameServer.prototype.getStatus = function() {
  return this.status;
}

GameServer.prototype.getPlayerIds = function() {
  return this.playerIds;
}

GameServer.prototype.addPlayer = function(player) {
  if (this.playerIds.indexOf(player.getSteamId()) !== -1) {
    return;
  }
  this.playerIds.push(player.getSteamId());
}

GameServer.prototype.removePlayer = function(player) {
  this.playerIds = this.playerIds.filter(function(steamId) {
    return steamId !== player.getSteamId();
  });
}

GameServer.prototype.playerCount = function() {
  if (this.playerIds) {
    return this.playerIds.length;
  }

  return 0;
};
