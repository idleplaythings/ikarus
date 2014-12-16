GameController = function GameController(
  serverRepository,
  companyRepository,
  squadRepository,
  inventoryRepostiory
){
  this._serverRepository = serverRepository;
  this._companyRepository = companyRepository;
  this._squadRepository = squadRepository;
  this._inventoryRepostiory = inventoryRepostiory;
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
  this._serverRepository.getAllByPlayer(player).map(function(server) {
    this._disconnectPlayerFromServer(player, server);
  }.bind(this));
};

GameController.prototype._connectPlayerToServer = function(player, server) {
  var company = this._getCompany(player);
  var squad = this._initOrGetSquad(server, company);

  this._serverRepository.addPlayer(server, player);

  this._inventoryRepostiory.createOnServerForPlayer(server, player);
  this._squadRepository.addPlayer(squad, player);
};

GameController.prototype._disconnectPlayerFromServer = function(player, server) {
  var company = this._getCompany(player);
  var squad = this._getSquad(server, company);

  server.removePlayer(player);
  this._serverRepository.persist(server);

  if (squad) {
    squad.removePlayer(player);
    this._squadRepository.persist(squad);
  }

  this._inventoryRepostiory.returnItems(company, player);
  this._inventoryRepostiory.removeByPlayer(player);
};

GameController.prototype._getServer = function(serverName) {
  return this._serverRepository.getByName(serverName) || this._notFound('Server');
};

GameController.prototype._getPlayer = function(playerUid) {
  return Player.getById(playerUid) || this._notFound('Player');
};

GameController.prototype._getCompany = function(player) {
  return this._companyRepository.getByPlayer(player) || this._notFound('Company');
};

GameController.prototype._initOrGetSquad = function(server, company) {
  return this._getSquad(server, company) || this._initSquad(server, company);
};

GameController.prototype._getSquad = function(server, company) {
  return this._squadRepository.getSquadByServerAndCompany(server, company);
}

GameController.prototype._initSquad = function(server, company) {
  return this._squadRepository.createOnServerForCompany(server, company);
};

GameController.prototype._notFound = function(what) {
  console.log(what + "not found (GameController)");
  console.trace();
  throw new Error(what + ' not found');
};

