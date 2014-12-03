SquadRepository = (function(){
  'use strict';

  function SquadRepository(squadCollection) {
    this._squadCollection = squadCollection;
  }

  SquadRepository.prototype.save = function(squad){
    this._squadCollection.insert(squad.serialize());
  };

  SquadRepository.prototype.getSquadById = function(id){
    return docToSquad(this._squadCollection.findOne({_id: id}));
  };

  SquadRepository.prototype.getSquadByName = function(name){
    return docToSquad(this._squadCollection.findOne({name: name}));
  };

  SquadRepository.prototype.getSquadByMember = function(playerId){
    return docToSquad(this._squadCollection.findOne(
      {members: {$in: [playerId]}})
    );
  };

  var docToSquad = function(doc){
    if (! doc){
      return null;
    }

    return new Squad(doc);
  };

  return SquadRepository;
})();