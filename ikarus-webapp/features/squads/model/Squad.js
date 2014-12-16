Squad = function Squad(args) {
  if (!args) {
    args = {};
  }

  this._id = args._id;
  this.serverId = args.serverId;
  this.companyId = args.companyId;
  this.steamIds = args.steamIds || [];
  this.startingLocation = args.startingLocation || {x: 10000, y:10000};
  this.objectives = args.objectives;
  this.locked = args.locked || false;
}

Squad.prototype.serialize = function() {
  return {
    serverId: this.serverId,
    companyId: this.companyId,
    steamIds: this.steamIds,
    startingLocation: this.startingLocation,
    objectives: this.objectives,
    locked: this.locked
  };
};

Squad.prototype.isLocked = function() {
  return this.locked;
}

Squad.prototype.isEmpty = function(){
  return this.steamIds.length === 0;
};

Squad.prototype.addPlayer = function(player) {
  if (this.steamIds.indexOf(player.steamId) !== -1) {
    return;
  }

  this.steamIds.push(player.steamId);
};

Squad.prototype.removePlayer = function(player){
  this.steamIds = this.steamIds.filter(function(steamId){
    return steamId !== player.steamId;
  });
};

Squad.prototype.getStartingLocation = function() {
  return get(this.getDoc(), 'startingLocation') || { x: 10000, y: 10000 };
}

Squad.prototype.getSteamIds = function() {
  return get(this.getDoc(), 'steamIds') || [];
}

Squad.prototype.isLocked = function() {
  return get(this.getDoc(), 'locked') || false;
}

Squad.prototype.getObjectives = function() {
  return get(this.getDoc(), 'objectives');
}

Squad.prototype.getDoc = function() {
  return collections.SquadCollection.findOne({ _id: this._id });
}

Squad.getByPlayer = function(player) {
  return dic.get('SquadRepository').getByPlayer(player);
}




SquadRepository =  function SquadRepository(squadCollection) {
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

SquadRepository.prototype.remove = function() {
  collections.SquadCollection.remove({_id: this._id});
};

Squad.fromDoc = function(doc) {
  if (Boolean(doc) === false) {
    return null;
  }

  return new Squad(doc);
};
