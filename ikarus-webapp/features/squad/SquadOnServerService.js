SquadOnServerService = (function(){
  'use strict';

  function SquadOnServerService(squadOnServerRepository) {
    this._squadOnServerRepository = squadOnServerRepository;
  }

  SquadOnServerService.prototype.createSquadOnServer = function(server, squad){
    return new SquadOnServer({
      serverId: args.server._id,
      squadId: args.squad_id
    })
  };

  SquadOnServerService.prototype.getSquadOnServer = function(server, squad){
    return docToSquadOnServer.call(
      this, this._squadOnServerRepository.getSquadOnServer(server._id, squad._id)
    );
  };

  SquadOnServerService.prototype.save = function(squadOnServer){
    return this._squadOnServerRepository.save(squadOnServer);
  };

  var docToSquadOnServer = function(doc){
    if (! doc){
      return null;
    }

    return new SquadOnServer(doc);
  };

  return SquadOnServerService;
})();