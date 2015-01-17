Server = function Server(args) {
  this._id = args._id;
  this.name = args.name;
  this.status = args.status || Server.STATUS_DOWN;
  this.playerIds = args.playerIds || [];
  this.nextStatus = args.nextStatus;
}

Server.STATUS_IDLE = 'idle';
Server.STATUS_PLAYING = 'playing';
Server.STATUS_WAITING = 'waiting';
Server.STATUS_DOWN = 'down';

Server.prototype.isWaiting = function() {
  return get(this.getDoc(), 'status') == Server.STATUS_WAITING;
}

Server.prototype.isIdle = function() {
  return get(this.getDoc(), 'status') == Server.STATUS_IDLE;
}

Server.prototype.isDown = function() {
  return get(this.getDoc(), 'status') == Server.STATUS_DOWN;
}

Server.prototype.isPlaying = function() {
  return get(this.getDoc(), 'status') == Server.STATUS_PLAYING;
}

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

Server.prototype.getNextStatus = function() {
  return get(this.getDoc(), 'nextStatus');
}

Server.prototype.startWaiting = function() {
  var time = moment().toString();
  console.log("waiting started", time);
  collections.ServerCollection.update({
    _id: this._id
  }, {
    $set: {
      waitingStarted: time
    }
  });
}

Server.prototype.getWaitingStarted = function() {
  var time = get(this.getDoc(), 'waitingStarted') || null;
  return time ? moment(time) : null;
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

  if (status == Server.STATUS_WAITING) {
    this.startWaiting();
  }
}

Server.prototype.getSquadsInGame = function() {
  var ids = get(this.getDoc(), 'inGame') || [];
  return ids.map(Squad.getById);
}

Server.prototype.addSquadToGame = function(squad) {
  collections.ServerCollection.update({
    _id: this._id
  }, {
    $addToSet: {
      inGame: squad._id
    }
  });
};

Server.prototype.removeSquadFromGame = function(squad) {
  collections.ServerCollection.update({
    _id: this._id
  }, {
    $pull: {
      inGame: squad._id
    }
  });
};

Server.prototype.removeAllSquadsFromGame = function() {
  collections.ServerCollection.update({
    _id: this._id
  }, {
    $set: {
      inGame: []
    }
  });
};

Server.prototype.removeSquadFromQueue = function(squad) {
  collections.ServerCollection.update({
    _id: this._id
  }, {
    $pull: {
      queue: squad._id
    }
  });
};

Server.prototype.shiftFromQueue = function() {
  var squad = this.getQueue().shift();
  collections.ServerCollection.update({
    _id: this._id
  }, {
    $pull: {
      queue: squad._id
    }
  });

  return squad;
}

Server.prototype.getQueue = function() {
  var ids = get(this.getDoc(), 'queue') || [];
  return ids.map(Squad.getById);
}

Server.prototype.addToQueue = function(squad) {
  collections.ServerCollection.update({
    _id: this._id
  }, {
    $addToSet: {
      queue: squad._id
    }
  });
};

Server.prototype.getPlayerIds = function() {
  return get(this.getDoc(), 'playerIds') || [];
}

Server.prototype.getPlayers = function() {
  return Player.getByIds(this.getPlayerIds());
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

Server.prototype.companyCount = function() {
  var companies = {};
  this.getPlayers().forEach(function(player) {
    companies[player.getCompany().getName()] = 1;
  });

  return Object.keys(companies).length;
}

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

Server.getAllWaiting = function() {
  return collections.ServerCollection.find({status: Server.STATUS_WAITING}).fetch().map(Server.fromDoc);
};

Server.getByQueuingSquad = function(squad) {
  return Server.fromDoc(collections.ServerCollection.findOne({ queue: {$in: [squad._id]} }));
};

Server.getByInGameSquad = function(squad) {
  return Server.fromDoc(collections.ServerCollection.findOne({ inGame: {$in: [squad._id]} }));
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
