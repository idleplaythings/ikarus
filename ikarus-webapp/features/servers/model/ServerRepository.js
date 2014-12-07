ServerRepository = function ServerRepository(serverCollection){
  this._serverCollection = serverCollection;
}

ServerRepository.prototype.create = function(name) {
  this.persist(new Server({ name: name }));
};

ServerRepository.prototype.getAll = function() {
  return this._serverCollection.find().fetch().map(this._fromDoc);
};

ServerRepository.prototype.getById = function(id) {
  return this._fromDoc(this._serverCollection.findOne({ _id: id }));
};

ServerRepository.prototype.getByName = function(name) {
  return this._fromDoc(this._serverCollection.findOne({ name: name }));
};

ServerRepository.prototype.persist = function(server) {
  this._serverCollection.update(
    { name: server.name },
    this._serialize(server),
    { upsert: true }
  );
};

ServerRepository.prototype._serialize = function(server) {
  return {
    name: server.name,
    playerIds: server.playerIds,
    status: server.status
  };
};

ServerRepository.prototype._fromDoc = function(doc) {
  if (Boolean(doc) === false) {
    return null;
  }

  return new Server(doc);
}
