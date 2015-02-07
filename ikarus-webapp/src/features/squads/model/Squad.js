var namespace = this;

Squad = function Squad(args) {
  this._id = args._id;
  this.serverId = args.serverId;
}

Squad.MAX_MEMBERS = 12;

Squad.prototype.getName = function() {
  var player = this.getPlayers()[0];

  return player ? player.getName() + "'s" : '';
};

Squad.prototype.getPlayers = function() {
  var players = this.getSteamIds().map(Player.getById);
  return players;
};

Squad.prototype.addPlayerGear = function(player) {

  var gear = player.getGear();

  collections.SquadCollection.update({
    _id: this._id
  }, {
    $addToSet: {
      gear: gear
    }
  });
};

Squad.prototype.removePlayerGear = function(player) {
  collections.SquadCollection.update({
    _id: this._id
  }, {
    $pull: {
      gear: {gear: {playerId: player._id}}
    }
  });
};

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
  this.unsetPlayerReady(player);
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

Squad.prototype.getServer = function() {
  var serverId = this.getServerId();
  return Server.getById(serverId);
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
  var server = this.getServer();
  return server && (server.isPlaying() || server.isWaiting());
}

Squad.prototype.setPlayerReady = function(player) {
  collections.SquadCollection.update({
    _id: this._id
  }, {
    $addToSet: {
      readySteamIds: player.getSteamId()
    }
  });
};

Squad.prototype.unsetPlayerReady = function(player){
  collections.SquadCollection.update({
    _id: this._id
  }, {
    $pull: {
      readySteamIds: player.getSteamId()
    }
  });
};

Squad.prototype.getReadySteamIds = function() {
  return get(this.getDoc(), 'readySteamIds') || [];
};

Squad.prototype.isPlayerReady = function(player) {
  return this.getReadySteamIds().indexOf(player.getSteamId()) !== -1;
};

Squad.prototype.allPlayersAreReady = function() {
  var steamIds = this.getSteamIds();
  var readySteamIds = this.getReadySteamIds();
  var unreadySteamIds = _.difference(steamIds, readySteamIds);
  return unreadySteamIds.length === 0;
};

Squad.prototype.startQueuing = function() {
  collections.SquadCollection.update({
    _id: this._id
  }, {
    $set: {
      queuing: true
    }
  });
}

Squad.prototype.getInventory = function() {
  return Inventory.getBySquad(this);
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

Squad.prototype.getConnectionDeadline = function() {
  var time = get(this.getDoc(), 'connectionDeadline') || null;
  return time ? moment(time) : null;
}

Squad.prototype.setConnectionDeadline = function(time) {
  time = time ? time.toString() : time;
  collections.SquadCollection.update({
    _id: this._id
  }, {
    $set: {
      connectionDeadline: time
    }
  });
}

Squad.prototype.isBeforeDeadline = function(time) {
  var time = this.getConnectionDeadline();
  return time ? this.getConnectionDeadline().isAfter(moment()) : false;
}

Squad.prototype.exists = function() {
  return Boolean(this.getDoc());
}

Squad.prototype.getDoc = function() {
  return collections.SquadCollection.findOne({ _id: this._id });
}

Squad.prototype.remove = function() {
  collections.SquadCollection.remove({ _id: this._id });
}

Squad.prototype.getAmountOfMembers = function() {
  return this.getSteamIds().length;
}

Squad.prototype.getMaxMembers = function() {
  return Squad.MAX_MEMBERS;
}

Squad.prototype.remove = function() {
  collections.SquadCollection.remove({ _id: this._id });
}

Squad.prototype.isJoinable = function() {
  return ! this.isLocked() &&
    this.getSteamIds().length < Squad.MAX_MEMBERS &&
    !this.serverId;
}

Squad.getAll = function(company) {
  return collections.SquadCollection.find().fetch().map(Squad.fromDoc);
}

Squad.getAllOnDeadline = function(company) {
  return collections.SquadCollection.find({connectionDeadline:{$ne:null}})
    .fetch().map(Squad.fromDoc);
}

Squad.getByCompany = function(company) {
  return collections.SquadCollection.find({companyId: company._id})
    .fetch().map(Squad.fromDoc);
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
