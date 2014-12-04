SquadService = (function(){
  'use strict';

  function SquadService(userService, squadRepository){
    this._userService = userService;
    this._squadRepository = squadRepository;
  }

  SquadService.prototype.getSquadForCurrentUser = function(){
    var user = this._userService.getCurrentUser();

    if (! user){
      return;
    }

    var squad = this.getSquadByMember(user.steamId);
    return squad;
  };

  SquadService.prototype.createSquad = function(name){
    var user = this._userService.getCurrentUser();

    if (this.getSquadByName(name)){
      return;
    }

    if (! user){
      return;
    }

    var squad = new Squad({
      name: name,
      members: [user]
    });

    this._squadRepository.save(squad);
    return squad;
  };

  SquadService.prototype.getSquadById = function(id){
    return setMembers.call(this, this._squadRepository.getSquadById(id));
  };

  SquadService.prototype.getSquadByName = function(name){
    return setMembers.call(this, this._squadRepository.getSquadByName(name));
  };

  SquadService.prototype.getSquadByMember = function(playerId){
    return setMembers.call(this, this._squadRepository.getSquadByMember(playerId));
  };

  var setMembers = function(squad){

    if (! squad) {
      return squad;
    }

    squad.members = squad.members.map(function(uid){
      return this._userService.getUserById(uid);
    }, this);

    return squad;
  }

  return SquadService;
})();