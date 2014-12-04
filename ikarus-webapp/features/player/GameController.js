GameController = (function(){
  'use strict';

  function GameController(
    userService,
    gameServerService,
    squadService,
    squadOnServerService
  ){
    this._userService = userService;
    this._gameServerService = gameServerService;
    this._squadService = squadService;
    this._squadOnServerService = squadOnServerService;
  }

  GameController.prototype.playerConnected = function(serverId, playerUid){
    var server = this._gameServerService.getServerById(serverId);
    var player = this._userService.getUserById(playerUid);

    if (! server){
      throw new Error("Server not found");
    }

    if (! player) {
      return;
    }

    this._gameServerService.playerConnected(server, player);

    var squad = this._squadService.getSquadByMember(player.steamId);
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

  GameController.prototype.playerDisconnected = function(serverId, playerUid){
    var server = this._gameServerService.getServerById(serverId);
    var player = this._userService.getUserById(playerUid);

    if (! server){
      throw new Error("Server not found");
    }

    if (! player) {
      return;
    }

    this._gameServerService.playerDisconnected(server, player);

    var squad = this._squadService.getSquadByMember(player.steamId);
    var squadOnServer = this._squadOnServerService.getSquadOnServer(
      server, squad
    );

    if (! squadOnServer){
      return;
    }

    squadOnServer.removePlayer(player);
    this._squadOnServerService.save(squadOnServer);
  };

  return GameController;
})();