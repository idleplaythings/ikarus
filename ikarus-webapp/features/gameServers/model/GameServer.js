GameServer = function GameServer(args) {
  this._id = args._id;
  this.name = args.name;
  this.status = args.status || GameServer.STATUS_IDLE;
  this.players = args.players || [];
}

GameServer.STATUS_IDLE = 'idle';

GameServer.prototype.getName = function() {
  return this.name;
}

GameServer.prototype.getStatus = function() {
  return this.status;
}

GameServer.prototype.getPlayers = function() {
  return this.players;
}

GameServer.prototype.playerCount = function() {
  if (this.players) {
    return this.players.length;
  }

  return 0;
};
