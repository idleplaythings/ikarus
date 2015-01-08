GameController = function GameController(
  inventoryRepostiory
){

}

GameController.prototype.playerConnected = function(serverName, playerUid) {
  console.log("connect playerUid", playerUid);
  var player = this._getPlayer(playerUid);
  var server = this._getServer(serverName);

  this._disconnectPlayerFromServers(player);
  this._connectPlayerToServer(player, server);
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
  var company = this._getCompany(player);
  var squad = this._initOrGetSquad(server, company);
  squad.addPlayer(player);
  server.addPlayer(player);
};

GameController.prototype._disconnectPlayerFromServer = function(player, server) {
  var company = this._getCompany(player);
  var squad = this._getSquad(server, company);

  server.removePlayer(player);

  if (squad) {
    squad.removePlayer(player);
  }

  if (squad.isEmpty() && ! squad.isLocked()){
    Inventory.returnItems(company, squad);
    Inventory.removeBySquad(squad);
    squad.remove();
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

GameController.prototype._initOrGetSquad = function(server, company) {
  return this._getSquad(server, company) || this._initSquad(server, company);
};

GameController.prototype._getSquad = function(server, company) {
  return Squad.getAllByServer(server)
    .filter(function(squad) {
      return squad.getCompanyId() === company._id
    })
    .reduce(function(prev, current) {
      return current ? current : prev;
    }, null);
}

GameController.prototype._initSquad = function(server, company) {
  var squad = Squad.create();
  squad.setCompanyId(company._id);
  squad.setServerId(server._id);
  Inventory.createForSquadOnServer(squad, server);
  return squad;
};

GameController.prototype._notFound = function(what) {
  console.log(what + "not found (GameController)");
  console.trace();
  throw new Error(what + ' not found');
};

