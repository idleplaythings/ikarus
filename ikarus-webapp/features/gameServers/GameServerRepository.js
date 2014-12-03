GameServerRepository = (function(){
  'use strict';

  function GameServerRepository(serverCollection){
    this._serverCollection = serverCollection;
  }

  GameServerRepository.prototype.getServerByName = function(name) {
    var serverData = this._serverCollection.findOne({ name: name });

    if (serverData) {
      return new GameServer(serverData);
    }

    return null;
  }

  GameServerRepository.prototype.createServer = function(name) {
    this._serverCollection.insert({ name: name });
  };

  GameServerRepository.prototype.getServers = function() {
    return this._serverCollection.find().fetch().map(docToGameServer);
  };

  GameServerRepository.prototype.setStatus = function(serverId, status) {
    this._serverCollection.update(
      {_id: serverId},
      {$set: {status: status}}
    );
  };

  GameServerRepository.prototype.clearPlayers = function(serverId, uid) {
    this._serverCollection.update(
      {_id: serverId},
      {$set: {players: []}}
    );
  };

  GameServerRepository.prototype.removePlayer = function(serverId, uid) {
    this._serverCollection.update(
      {_id: serverId},
      {$pull: {status: status}}
    );
  };

  GameServerRepository.prototype.addPlayer = function(serverId, uid) {
    this._serverCollection.update(
      {_id: serverId},
      {$addToSet: {players: uid}}
    );
  };

  var docToGameServer = function(doc) {
    if (! doc){
      return null;
    }

    return new GameServer(doc);
  };
  return GameServerRepository;
})();