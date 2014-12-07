ServerRepository = function ServerRepository(serverCollection){
  this._serverCollection = serverCollection;
}

ServerRepository.prototype.create = function(name) {
  this.persist(new Server({ name: name }));
};

ServerRepository.prototype.getAll = function() {
  return this._serverCollection.find().fetch().map(this._deserialize);
};

ServerRepository.prototype.getById = function(id) {
  return this._deserialize(this._serverCollection.findOne({ _id: id }));
};

ServerRepository.prototype.getByName = function(name) {
  return this._deserialize(this._serverCollection.findOne({ name: name }));
};

ServerRepository.prototype.getAllByPlayer = function(player) {
  return this._serverCollection.find({ playerIds: { $in: [ player.steamId ] }}).fetch().map(this._deserialize.bind(this));
};

ServerRepository.prototype.persist = function(server) {
  this._serverCollection.update(
    { name: server.name },
    server.serialize(),
    { upsert: true }
  );
};

ServerRepository.prototype._deserialize = function(doc) {
  if (Boolean(doc) === false) {
    return null;
  }

  return new Server(doc);
};
