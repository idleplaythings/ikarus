SquadOnServerRepository = (function(){
  'use strict';

  function SquadOnServerRepository(squadOnServerCollection) {
    this._squadOnServerCollection = squadOnServerCollection;
  }

  SquadOnServerRepository.prototype.getSquadOnServer = function(serverId, squadId){
    return this._squadOnServerCollection.findOne(
      {$and: [{serverId: serverId}, {squadId: squadId}]}
    );
  };

  SquadOnServerRepository.prototype.save = function(squadOnServer){

    var exsisting = this.getSquadOnServer(squadOnServer.serverId, squadOnServer.squadId);

    if (exsisting) {
      this._squadOnServerCollection.update({_id: exsisting._id}, squadOnServer.serialize());
    } else {
      this._squadOnServerCollection.insert(squadOnServer.serialize());
    }
  };

  return SquadOnServerRepository;
})();