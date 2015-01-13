var namespace = this;

Squad = function Squad(args) {
  this._id = args._id;
}

Squad.prototype.addPlayer = function(player) {
  collections.SquadCollection.update({
    _id: this._id
  }, {
    $addToSet: {
      steamIds: player.getSteamId()
    }
  });
};

Squad.prototype.removePlayer = function(player){
  collections.SquadCollection.update({
    _id: this._id
  }, {
    $pull: {
      steamIds: player.getSteamId()
    }
  });
};

Squad.prototype.getStartingLocation = function() {
  return get(this.getDoc(), 'startingLocation') || { x: 10000, y: 10000 };
}

Squad.prototype.setStartingLocation = function(company) {
  collections.SquadCollection.update({
    _id: this._id
  }, {
    $set: {
      startingLocation: company.getHideout()
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

Squad.prototype.getCompany = function() {
  return Company.getBySquad(this);
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

Squad.prototype.evaluateObjective = function(){
  if (this.isLocked()) {
    return;
  }

  var objective = this.getObjective();
  if ( ! objective.validate(this) ) {
    this.setObjective(objective.defaultsTo)
  }
};

Squad.prototype.setObjective = function(objective){
  collections.SquadCollection.update({
    _id: this._id
  }, {
    $set: {
      objective: objective.name
    }
  });
};

Squad.prototype.getObjective = function(){
  var name = get(this.getDoc(), 'objective') || 'Supply';
  return new namespace['Objective' + name];
};

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
      locked: Boolean(locked)
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

Squad.create = function() {
  return Squad.fromDoc({ _id: collections.SquadCollection.insert({}) });
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

Squad.getCurrent = function() {
  var player = Player.getCurrent();

  if (player) {
    return player.getSquad();
  }

  return null;
}

Squad.fromDoc = function(doc) {
  if (Boolean(doc) === false) {
    return null;
  }

  return new Squad(doc);
};
