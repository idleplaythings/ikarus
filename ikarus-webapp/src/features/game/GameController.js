GameController = function GameController(serverQueueService){
  this._serverQueueService = serverQueueService;
}

GameController.prototype.playerConnected = function(serverName, playerUid) {
  var player = this._getPlayer(playerUid);
  var server = this._getServer(serverName);

  return this._connectPlayerToServer(player, server);
};

GameController.prototype.playerDisconnected = function(serverName, playerUid) {
  var player = this._getPlayer(playerUid);
  var server = this._getServer(serverName);

  this._disconnectPlayerFromServer(player, server);

  var company = this._getCompany(player);
  if (company) {
    PlayerLeftGameEvent.create(server.getGameId(), company._id, player.getSteamId());
  }
};

GameController.prototype._connectPlayerToServer = function(player, server) {
  var squad = this._getSquad(player, server);

  if (! squad) {
    return false;
  }

  server.addPlayer(player);

  var company = this._getCompany(player);
  if (company) {
    PlayerJoinedGameEvent.create(server.getGameId(), company._id, player.getSteamId());
  }
  return true;
};

GameController.prototype._disconnectPlayerFromServer = function(player, server) {
  server.removePlayer(player);
  var squad = this._getSquad(player, server);

  if (squad && server.isPlaying()) {
    server.markDead(player);
    this._serverQueueService.leaveSquad(squad, player);
  }
};

GameController.prototype._getServer = function(serverName) {
  return Server.getByName(serverName) || this._notFound('Server');
};

GameController.prototype._getPlayer = function(playerUid) {
  return Player.getById(playerUid) || this._notFound('Player');
};

GameController.prototype._getCompany = function(player) {
  return player.getCompany() || this._notFound('Company');
};

GameController.prototype._getSquad = function(player, server) {
  var squad = Squad.getByPlayer(player);
  if (! squad || squad.getServerId() !== server._id) {
    return null;
  }

  return squad;
}

GameController.prototype._initSquad = function(server, company) {
  var squad = Squad.create();
  squad.setCompanyId(company._id);
  squad.setServerId(server._id);
  squad.setStartingLocation(company);
  Inventory.createForSquadOnServer(squad, server);
  return squad;
};

GameController.prototype._notFound = function(what) {
  console.log(what + "not found (GameController)");
  console.trace();
  throw new Error(what + ' not found');
};

