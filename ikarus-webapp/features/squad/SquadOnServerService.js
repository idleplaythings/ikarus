SquadOnServerService = (function(){
  'use strict';

  function SquadOnServerService(squadOnServerRepository, userService) {
    this._squadOnServerRepository = squadOnServerRepository;
    this._userService = userService;
  }

  SquadOnServerService.prototype.removeSquadsFrom = function(server){
    this._squadOnServerRepository.removeSquadsFrom(server._id);
  };

  SquadOnServerService.prototype.lockSquadsOn = function(server){
    this.getAllOnServer(server).forEach(function(squad){
      squad.locked = true;
      this.save(squad);
    }, this);
  };

  SquadOnServerService.prototype.createSquadOnServer = function(server, squad){
    return new SquadOnServer({
      serverId: server._id,
      squadId: squad._id
    });
  };

  SquadOnServerService.prototype.getAllOnServer = function(server, squad){
    return this._squadOnServerRepository.getAllOnServer(server._id).map(docToSquadOnServer);
  };

  SquadOnServerService.prototype.getSquadOnServer = function(server, squad){
    return docToSquadOnServer.call(
      this, this._squadOnServerRepository.getSquadOnServer(server._id, squad._id)
    );
  };

  SquadOnServerService.prototype.getSquadOnServerForPlayer = function(player){
    return docToSquadOnServer.call(
      this, this._squadOnServerRepository.getSquadOnServerForPlayer(player.steamId)
    );
  };

  SquadOnServerService.prototype.getSquadOnServerForCurrentPlayer = function(){
    var user = this._userService.getCurrentUser();

    if (! user){
      return null;
    }

    return docToSquadOnServer.call(
      this, this._squadOnServerRepository.getSquadOnServerForPlayer(user.steamId)
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