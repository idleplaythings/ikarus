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

  var updatePlayerStatus = function(serverId, payload) {
    var uid = payload.uid;
    var status = payload.status;

    if (status == 'disconnected') {
      this._serverRepository.removePlayer(serverId, uid);
    }

    if (status == 'connected') {
      this._serverRepository.addPlayer(serverId, uid);
    }
  };

  return GameServerService;
})();