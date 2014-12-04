GameServerRepository = (function(){
  'use strict';

  function GameServerRepository(serverCollection){
    this._serverCollection = serverCollection;
  }

  GameServerRepository.prototype.getServerById = function(id){
    return docToGameServer.call(this, this._serverCollection.findOne({_id: id}));
  };

  GameServerRepository.prototype.getServerByName = function(name){
    return docToGameServer.call(this, this._serverCollection.findOne({name: name}));
  };

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