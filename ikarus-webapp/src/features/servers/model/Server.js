Server = function Server(args) {
  this._id = args._id;
  this.name = args.name;
  this.status = args.status || Server.STATUS_DOWN;
  this.playerIds = args.playerIds || [];
}

Server.STATUS_IDLE = 'idle';
Server.STATUS_PLAYING = 'playing';
Server.STATUS_WAITING = 'waiting';
Server.STATUS_DOWN = 'down';

Server.prototype.getName = function() {
  return get(this.getDoc(), 'name');
}

Server.prototype.setName = function(name) {
  collections.ServerCollection.update({
    _id: this._id
  }, {
    $set: {
      name: name
    }
  });
}

Server.prototype.getStatus = function() {
  return get(this.getDoc(), 'status');
}

Server.prototype.updateStatus = function(status) {
  if (status !== Server.STATUS_IDLE &&
    status !== Server.STATUS_DOWN &&
    status !== Server.STATUS_WAITING &&
    status !== Server.STATUS_PLAYING){
    throw new Error("Unknown status: '" + status + "'" );
  }

  collections.ServerCollection.update({
    _id: this._id
  }, {
    $set: {
      status: status
    }
  });
}

Server.prototype.getPlayerIds = function() {
  return get(this.getDoc(), 'playerIds') || [];
}

Server.prototype.addPlayer = function(player) {
  collections.ServerCollection.update({
    _id: this._id
  }, {
    $addToSet: {
      playerIds: player.getSteamId()
    }
  });
};

Server.prototype.removePlayer = function(player) {
  collections.ServerCollection.update({
    _id: this._id
  }, {
    $pull: {
      playerIds: player.getSteamId()
    }
  });
};

Server.prototype.removePlayers = function() {
  collections.ServerCollection.update({
    _id: this._id
  }, {
    $set: {
      playerIds: []
    }
  });
}

Server.prototype.playerCount = function() {
  return this.getPlayerIds().length;
};

Server.prototype.serialize = function() {
  return {
    name: this.name,
    playerIds: this.playerIds,
    status: this.status
  };
};

Server.prototype.getDoc = function() {
  return collections.ServerCollection.findOne({ _id: this._id });
}

Server.create = function(name) {
  return Server.fromDoc({ _id: collections.ServerCollection.insert(
      {name:name})
  });
};

Server.getAll = function() {
  return collections.ServerCollection.find().fetch().map(Server.fromDoc);
};

Server.getById = function(id) {
  return Server.fromDoc(collections.ServerCollection.findOne({ _id: id }));
};

Server.getByName = function(name) {
  return Server.fromDoc(collections.ServerCollection.findOne({ name: name }));
};

Server.getAllByPlayer = function(player) {
  return collections.ServerCollection.find({ playerIds: { $in: [ player.getSteamId() ] }}).fetch().map(Server.fromDoc);
};

Server.fromDoc = function(doc) {
  if (Boolean(doc) === false) {
    return null;
  }

  return new Server(doc);
};
