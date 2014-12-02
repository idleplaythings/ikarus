GameServerRepository = (function(){
  'use strict';

  function GameServerRepository(serverCollection){
    this._serverCollection = serverCollection;
  }

  GameServerRepository.prototype.setStatus = function(serverId, status){
    this._serverCollection.update(
      {_id: serverId},
      {$set: {status: status}}
    );
  };

  GameServerRepository.prototype.clearPlayers = function(serverId, uid){
    this._serverCollection.update(
      {_id: serverId},
      {$set: {players: []}}
    );
  };

  GameServerRepository.prototype.removePlayer = function(serverId, uid){
    this._serverCollection.update(
      {_id: serverId},
      {$pull: {status: status}}
    );
  };

  GameServerRepository.prototype.addPlayer = function(serverId, uid){
    this._serverCollection.update(
      {_id: serverId},
      {$addToSet: {players: uid}}
    );
  };
  return GameServerRepository;
})();