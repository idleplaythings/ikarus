GameController = function GameController(
  playerRepository,
  serverRepository,
  companyRepository,
  squadRepository,
  squadMemberRepository
){
  this._playerRepository = playerRepository;
  this._serverRepository = serverRepository;
  this._companyRepository = companyRepository;
  this._squadRepository = squadRepository;
  this._squadMemberRepository = squadMemberRepository;
}

GameController.prototype.playerConnected = function(serverName, playerUid) {
  var player = this._getPlayer(playerUid);
  var server = this._getServer(serverName);

  this._disconnectPlayerFromServers(player);
  this._connect(player, server);
};

GameController.prototype.playerDisconnected = function(serverName, playerUid) {
  var player = this._getPlayer(playerUid);
  var server = this._getServer(serverName);

  this._disconnect(player, server);
};

GameController.prototype._disconnectPlayerFromServers = function(player) {
  this._serverRepository.getAllByPlayer(player).map(function(server) {
    this._disconnect(player, server);
  }.bind(this));
};

GameController.prototype._connect = function(player, server) {
  var company = this._getCompany(player);
  var squad = this._initOrGetSquad(server, company);

  server.addPlayer(player);
  this._serverRepository.persist(server);

  squad.addPlayer(player);
  this._squadMemberRepository.createOnServerForPlayer(server, player);
  this._squadRepository.persist(squad);
};

GameController.prototype._disconnect = function(player, server) {
  var company = this._getCompany(player);
  var squad = this._initOrGetSquad(server, company);

  server.removePlayer(player);
  this._serverRepository.persist(server);

  squad.removePlayer(player);
  this._squadRepository.persist(squad);
  this._squadMemberRepository.remove(player);
};

GameController.prototype._getServer = function(serverName) {
  return this._serverRepository.getByName(serverName) || this._notFound('Server');
};

GameController.prototype._getPlayer = function(playerUid) {
  return this._playerRepository.getById(playerUid) || this._notFound('Player');
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
  throw new Error(what + ' not found');
};

