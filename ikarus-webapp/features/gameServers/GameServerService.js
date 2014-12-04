GameServerService = (function(){
  'use strict';

  function GameServerService(serverRepository){
    this._serverRepository = serverRepository;
  };

  GameServerService.prototype.registerServer = function(name) {
    var gameServer = this._serverRepository.getServerByName(name);

    if (gameServer) {
      return gameServer;
    }

    this._serverRepository.createServer(name);
    return this._serverRepository.getServerByName(name);
  }

  GameServerService.prototype.receiveStatusUpdate = function(serverId, payload) {
    if (payload.serverStatus) {
      updateServerStatus.call(this, serverId, payload.serverStatus);
    }

    if (payload.playerStatus) {
      updatePlayerStatus.call(this, serverId, payload.playerStatus);
    }
    console.log(arguments);
  };

  GameServerService.prototype.playerConnected = function(server, player) {
    this._serverRepository.addPlayer(server._id, player.steamId);
  };

  GameServerService.prototype.playerDisconnected = function(server, player) {
    this._serverRepository.removePlayer(server._id, player.steamId);
  };

  GameServerService.prototype.getServerById = function(id) {
    this._serverRepository.getServerById(id);
  };

  GameServerService.prototype.getServerByName = function(name) {
    this._serverRepository.getServerByName(name);
  };

  var updateServerStatus = function(serverId, status) {

    if (status == 'idle') {
      this._serverRepository.setStatus(serverId, 'idle');
      this._serverRepository.clearPlayers(serverId);
    }

    if (status == 'waiting') {
      this._serverRepository.setStatus(serverId, 'waiting');
    }

    if (status == 'playing') {
      this._serverRepository.setStatus(serverId, 'playing');
    }

    if (status == 'playing') {
      this._serverRepository.setStatus(serverId, 'down');
    }
  };

  return GameServerService;
})();