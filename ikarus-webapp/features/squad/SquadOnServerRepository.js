SquadOnServerRepository = (function(){
  'use strict';

  function SquadOnServerRepository(squadOnServerCollection) {
    this._squadOnServerCollection = squadOnServerCollection;
  }

  SquadOnServerRepository.prototype.removeSquadsFrom = function(serverId){
    return this._squadOnServerCollection.remove(
      {serverId: serverId}
    );
  };

  SquadOnServerRepository.prototype.getAllOnServer = function(serverId){
    return this._squadOnServerCollection.find(
      {serverId: serverId}
    ).fetch();
  };

  SquadOnServerRepository.prototype.getSquadOnServerForPlayer = function(steamId){
    return this._squadOnServerCollection.findOne(
      {membersOnServer: {$in: [steamId]}}
    );
  };

  SquadOnServerRepository.prototype.getSquadOnServer = function(serverId, squadId){
    return this._squadOnServerCollection.findOne(
      {$and: [{serverId: serverId}, {squadId: squadId}]}
    );
  };

  SquadOnServerRepository.prototype.save = function(squadOnServer){

    if (squadOnServer.isEmpty()){
      this._squadOnServerCollection.remove({
        $and: [{serverId: squadOnServer.serverId}, {squadId: squadOnServer.squadId}]
      });
      return;
    }
    var exsisting = this.getSquadOnServer(squadOnServer.serverId, squadOnServer.squadId);

    if (exsisting) {
      this._squadOnServerCollection.update({_id: exsisting._id}, squadOnServer.serialize());
    } else {
      this._squadOnServerCollection.insert(squadOnServer.serialize());
    }
  };

  return SquadOnServerRepository;
})();