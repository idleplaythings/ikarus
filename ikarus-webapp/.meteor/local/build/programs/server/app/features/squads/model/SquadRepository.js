(function(){SquadRepository =  function SquadRepository(squadCollection) {
  this._squadCollection = squadCollection;
}

SquadRepository.prototype.getById = function(squadId) {
  return this._fromDoc(this._squadCollection.findOne({ _id: squadId }));
}

SquadRepository.prototype.getByPlayer = function(player) {
  var steamId = player.getSteamId();

  if (!steamId) {
    return null;
  }

  return this._fromDoc(
    this._squadCollection.findOne({
      steamIds: {$in: [ player.getSteamId() ]}
    })
  );
};

SquadRepository.prototype.createOnServerForCompany = function(server, company){
  this.persist(new Squad({
    serverId: server._id,
    companyId: company._id
  }));
  return this.getSquadByServerAndCompany(server, company);
};

SquadRepository.prototype.removeSquadsFromServer = function(server) {
  this._squadCollection.remove({ serverId: server._id });
};

SquadRepository.prototype.lockSquadsOnServer = function(server) {
  this._squadCollection.update({ serverId: server._id }, { $set: { locked: true }});
};

SquadRepository.prototype.getSquadByServerAndCompany = function(server, company) {
  var doc = this._squadCollection.findOne(
      {$and: [{serverId: server._id}, {companyId: company._id}]}
  );

  if (!doc) {
    return null;
  }

  return new Squad(doc);
};

SquadRepository.prototype.addPlayer = function(squad, player) {
  this._squadCollection.update(
    { _id: squad._id },
    {$push: {steamIds: player.steamId}}
  );
};

SquadRepository.prototype.persist = function(squad) {
  this._squadCollection.update(
    { _id: squad._id },
    squad.serialize(),
    { upsert: true }
  );
};

SquadRepository.prototype.remove = function(squad) {
  this._squadCollection.remove({_id: squad._id});
};

SquadRepository.prototype._fromDoc = function(doc) {
  if (Boolean(doc) === false) {
    return null;
  }

  return new Squad(doc);
};

})();
