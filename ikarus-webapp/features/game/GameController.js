GameController = function GameController(
  playerRepository,
  gameServerService,
  companyService,
  squadOnServerService
){
  this._playerRepository = playerRepository;
  this._gameServerService = gameServerService;
  this._companyService = companyService;
  this._squadOnServerService = squadOnServerService;
}

GameController.prototype.playerConnected = function(serverName, playerUid) {
  var server = this._gameServerService.getServerByName(serverName);
  var player = this._playerRepository.getById(playerUid);

  if (! server){
    throw new Error("Server not found");
  }

  if (! player) {
    return;
  }

  this._gameServerService.playerConnected(server, player);

  var squad = this._companyService.getByMember(player.steamId);

  if (! squad){
    return;
  }

  var squadOnServer = this._squadOnServerService.getSquadOnServer(
    server, squad
  );

  if (! squadOnServer){
    squadOnServer = this._squadOnServerService.createSquadOnServer(
      server, squad
    );
  }

  squadOnServer.addPlayer(player);
  this._squadOnServerService.save(squadOnServer);

};

GameController.prototype.playerDisconnected = function(serverName, playerUid){
  var server = this._gameServerService.getServerByName(serverName);
  var player = this._playerRepository.getById(playerUid);

  if (! server){
    throw new Error("Server not found");
  }

  if (! player) {
    return;
  }

  this._gameServerService.playerDisconnected(server, player);

  var squad = this._companyService.getByMember(player.steamId);

  if (! squad){
    return;
  }

  var squadOnServer = this._squadOnServerService.getSquadOnServer(
    server, squad
  );

  if (! squadOnServer){
    return;
  }

  squadOnServer.removePlayer(player);
  this._squadOnServerService.save(squadOnServer);
};

