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

Squad.prototype.addPlayer = function(player) {
  collections.SquadCollection.update({
    _id: this._id
  }, {
    $push: {
      steamIds: player.getSteamId()
    }
  });
};

Squad.prototype.removePlayer = function(player){
  collections.SquadCollection.update({
    _id: this._id
  }, {
    $pull: {
      playerIds: player.getSteamId()
    }
  });
};

Squad.prototype.getStartingLocation = function() {
  return get(this.getDoc(), 'startingLocation') || { x: 10000, y: 10000 };
}

Squad.prototype.setStartingLocation = function(startingLocation) {
  collections.SquadCollection.update({
    _id: this._id
  }, {
    $set: {
      startingLocation: startingLocation
    }
  });
}

Squad.prototype.getCompanyId = function() {
  return get(this.getDoc(), 'companyId');
}

Squad.prototype.setCompanyId = function(companyId) {
  collections.SquadCollection.update({
    _id: this._id
  }, {
    $set: {
      companyId: companyId
    }
  });
}

Squad.prototype.getServerId = function() {
  return get(this.getDoc(), 'serverId');
}

Squad.prototype.setServerId = function(serverId) {
  collections.SquadCollection.update({
    _id: this._id
  }, {
    $set: {
      serverId: serverId
    }
  });
}

Squad.prototype.getSteamIds = function() {
  return get(this.getDoc(), 'steamIds') || [];
}

Squad.prototype.isLocked = function() {
  return get(this.getDoc(), 'locked') || false;
}

Squad.prototype.setLocked = function(locked) {
  collections.SquadCollection.update({
    _id: this._id
  }, {
    $set: {
      locked: locked
    }
  });
}

Squad.prototype.lock = function() {
  this.setLocked(true);
}

Squad.prototype.unlock = function() {
  this.setLocked(false);
}

Squad.prototype.isEmpty = function() {
  return this.getSteamIds().length === 0;
}

Squad.prototype.getObjectives = function() {
  return get(this.getDoc(), 'objectives');
}

Squad.prototype.setObjectives = function(objectives) {
  collections.SquadCollection.update({
    _id: this._id
  }, {
    $set: {
      objectives: objectives
    }
  });
}

Squad.prototype.getDoc = function() {
  return collections.SquadCollection.findOne({ _id: this._id });
}

Squad.prototype.remove = function() {
  collections.SquadCollection.remove({ _id: this._id });
}

Squad.getById = function(squadId) {
  return Squad.fromDoc(collections.SquadCollection.findOne({ _id: squadId }));
}

Squad.getByPlayer = function(player) {
  return Squad.fromDoc(
    collections.SquadCollection.findOne({
      steamIds: {
        $in: [ player.getSteamId() ]
      }
    })
  );
}

Squad.getAllByServer = function(server) {
  return collections.SquadCollection.find({
    serverId: server._id
  }).fetch().map(Squad.fromDoc);
}

Squad.fromDoc = function(doc) {
  if (Boolean(doc) === false) {
    return null;
  }

  return new Squad(doc);
};
