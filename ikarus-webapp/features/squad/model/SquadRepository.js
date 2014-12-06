SquadRepository =  function SquadRepository(squadCollection) {
  this._squadCollection = squadCollection;
}

SquadRepository.prototype.getById = function(squadId) {
  return this._fromDoc(this._squadCollection.findOne({ squadId: squadId }));
}

SquadRepository.prototype.getByPlayer = function(player) {
  return this._fromDoc(
    this._squadCollection.findOne({
      playerIds: {$in: [ player.getSteamId() ]}
    })
  );
};

SquadRepository.prototype.createOnServerForCompany = function(server, company){
  this.persist(new Squad({
    serverId: server.getId(),
    companyId: company.getId()
  }));
  return this.getSquadByServerAndCompany(server, company);
};

SquadRepository.prototype.removeSquadsFromServer = function(gameServer) {
  this._squadCollection.remove({ serverId: gameServer.getId() });
};

SquadRepository.prototype.lockSquadsOnServer = function(server) {
  this._squadCollection.update({ serverId: gameServer.getId() }, { $set: { locked: true }});
};

SquadRepository.prototype.getSquadByServerAndCompany = function(server, company) {
  var doc = this._squadCollection.findOne(
      {$and: [{serverId: server.getId()}, {companyId: company.getId()}]}
  );

  if (!doc) {
    return null;
  }

  return new Squad(doc);
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
    companyId: squad.companyId,
    playerIds: squad.getPlayerIds(),
    missionItems: squad.missionItems.serialize(),
    startingLocation: squad.startingLocation,
    objectives: squad.objectives,
    squadId: squad.squadId,
    locked: squad.locked
  };
};

SquadRepository.prototype._fromDoc = function(doc) {
  if (Boolean(doc) === false) {
    return null;
  }

  return new Squad(doc);
};
