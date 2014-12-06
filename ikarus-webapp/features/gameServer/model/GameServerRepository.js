GameServerRepository = function GameServerRepository(serverCollection){
  this._serverCollection = serverCollection;
}

GameServerRepository.prototype.create = function(name) {
  this.persist(new GameServer({ name: name }));
};

GameServerRepository.prototype.getAll = function() {
  return this._serverCollection.find().fetch().map(this._fromDoc);
};

GameServerRepository.prototype.getByName = function(name) {
  return this._fromDoc(this._serverCollection.findOne({ name: name }));
}

GameServerRepository.prototype.persist = function(gameServer) {
  this._serverCollection.update(
    { name: gameServer.getName() },
    this._serialize(gameServer),
    { upsert: true }
  );
}

GameServerRepository.prototype._serialize = function(gameServer) {
  return {
    name: gameServer.getName(),
    playerIds: gameServer.getPlayerIds(),
    status: gameServer.getStatus()
  };
}

GameServerRepository.prototype._fromDoc = function(doc) {
  if (Boolean(doc) === false) {
    return null;
  }

  return new GameServer(doc);
}
