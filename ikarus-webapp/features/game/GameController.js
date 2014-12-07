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
  var server = this._serverRepository.getByName(serverName);
  var player = this._playerRepository.getById(playerUid);

  if (! server){
    throw new Error("Server not found");
  }

  if (! player) {
    throw new Error("Player not found");
  }

  server.addPlayer(player);
  this._serverRepository.persist(server);

  var company = this._companyRepository.getByPlayer(player);

  if (! company) {
    throw new Error("Company not found");
  }

  this.removePlayerFromOtherServer(player, server);

  var squad = this._squadRepository.getSquadByServerAndCompany(server, company);

  if (! squad) {
    squad = this._squadRepository.createOnServerForCompany(server, company);
  }

  squad.addPlayer(player);
  this._squadMemberRepository.createOnServerForPlayer(server, player);

  this._squadRepository.persist(squad);

};

GameController.prototype.playerDisconnected = function(serverName, playerUid) {
  var server = this._serverRepository.getByName(serverName);
  var player = this._playerRepository.getById(playerUid);

  if (! server){
    throw new Error("Server not found");
  }

  if (! player) {
    throw new Error("Player not found");
  }

  server.removePlayer(player);
  this._serverRepository.persist(server);

  var company = this._companyRepository.getByPlayer(player);

  if (! company) {
    throw new Error("Company not found");
  }

  var squad = this._squadRepository.getSquadByServerAndCompany(server, company);

  if (! squad) {
    throw new Error("Squad not found");
  }

  squad.removePlayer(player);
  this._squadRepository.persist(squad);
  this._squadMemberRepository.remove(player);
};

GameController.prototype.removePlayerFromOtherServer = function(){
  //TODO: implement
};

