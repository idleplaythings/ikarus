SquadRepository =  function SquadRepository(squadCollection) {
  this._squadCollection = squadCollection;
}

SquadRepository.prototype.removeSquadsFrom = function(gameServer) {
  return this._squadCollection.remove({ serverId: gameServer.getId() });
};

SquadRepository.prototype.getAllOnServer = function(gameServer) {
  return this._squadCollection.find({ serverId: gameServer.getId() }).fetch();
};

SquadRepository.prototype.getSquadOnServerForPlayer = function(player) {
  return this._squadCollection.findOne({ members: {$in: [ player.getSteamId() ] }});
};

SquadRepository.prototype.getById = function(squadId) {
  return this._squadCollection.findOne({ squadId: squadId });
}

SquadRepository.prototype.getSquadOnServer = function(serverId, squadId){
  return this._squadCollection.findOne(
    {$and: [{serverId: serverId}, {squadId: squadId}]}
  );
};

SquadRepository.prototype.persist = function(squad) {
  this._squadCollection.update(
    { _id: squad.getId() },
    this._serialize(squad),
    { upsert: true }
  );
};

SquadRepository.prototype._serialize = function(squad) {
  return {
    serverId: squad.serverId,
    members: squad.members,
    missionItems: squad.missionItems.serialize(),
    startingLocation: squad.startingLocation,
    objectives: squad.objectives,
    squadId: squad.squadId,
    locked: squad.locked
  };
};

SquadRepository.prototype.save = function(squadOnServer){

  if (squadOnServer.isEmpty()){
    this._squadCollection.remove({
      $and: [{serverId: squadOnServer.serverId}, {squadId: squadOnServer.squadId}]
    });
    return;
  }
  var exsisting = this.getSquadOnServer(squadOnServer.serverId, squadOnServer.squadId);

  if (exsisting) {
    this._squadCollection.update({_id: exsisting._id}, squadOnServer.serialize());
  } else {
    this._squadCollection.insert(squadOnServer.serialize());
  }
};

SquadRepository.prototype.removeSquadsFrom = function(server){
  this._squadOnServerRepository.removeSquadsFrom(server._id);
};

SquadRepository.prototype.lockSquadsOn = function(server){
  this.getAllOnServer(server).forEach(function(squad){
    squad.locked = true;
    this.save(squad);
  }, this);
};

SquadRepository.prototype.createSquadOnServer = function(server, squad){
  return new SquadOnServer({
    serverId: server._id,
    squadId: squad._id
  });
};

SquadRepository.prototype.getAllOnServer = function(server, squad){
  return this._squadOnServerRepository.getAllOnServer(server._id).map(docToSquadOnServer);
};

SquadRepository.prototype.getSquadOnServer = function(server, squad){
  return docToSquadOnServer.call(
    this, this._squadOnServerRepository.getSquadOnServer(server._id, squad._id)
  );
};

SquadRepository.prototype.getByPlayer = function(player) {
  if (player === null) {
    return null;
  }

  this._fromDoc(
    this._squadCollection.findOne({
      members: {$in: [ player.getSteamId() ]}
    })
  );
};

SquadRepository.prototype.getForCurrentPlayer = function(){
  var user = this._playerRepository.getCurrent();

  if (! user){
    return null;
  }

  return docToSquadOnServer.call(
    this, this._squadOnServerRepository.getSquadOnServerForPlayer(user.steamId)
  );
};

SquadRepository.prototype.save = function(squadOnServer){
  return this._squadOnServerRepository.save(squadOnServer);
};

var docToSquadOnServer = function(doc){
  if (! doc){
    return null;
  }

  return new SquadOnServer(doc);
};

SquadRepository.prototype._fromDoc = function(doc) {
  if (Boolean(doc) === false) {
    return null;
  }

  return new Squad(doc);
};
