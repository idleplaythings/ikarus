GameController = function GameController(){}

GameController.prototype.playerConnected = function(serverName, playerUid) {
  console.log("connect playerUid", playerUid);
  var player = this._getPlayer(playerUid);
  var server = this._getServer(serverName);

  this._disconnectPlayerFromServers(player);
  return this._connectPlayerToServer(player, server);
};

GameController.prototype.playerDisconnected = function(serverName, playerUid) {
  console.log("disconnect playerUid", playerUid);
  var player = this._getPlayer(playerUid);
  var server = this._getServer(serverName);

  this._disconnectPlayerFromServer(player, server);
};

GameController.prototype._disconnectPlayerFromServers = function(player) {
  Server.getAllByPlayer(player).map(function(server) {
    this._disconnectPlayerFromServer(player, server);
  }.bind(this));
};

GameController.prototype._connectPlayerToServer = function(player, server) {
  var squad = this._getSquad(player, server);
  if (! squad) {
    return false;
  }

  server.addPlayer(player);
  return true;
};

GameController.prototype._disconnectPlayerFromServer = function(player, server) {
  server.removePlayer(player);
  var squad = this._getSquad(player, server);

  if (squad && server.isPlaying()) {
    squad.removePlayer(player);
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

