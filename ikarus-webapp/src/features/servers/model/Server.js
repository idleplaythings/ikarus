Server = function Server(args) {
  this._id = args._id;
  this.name = args.name;
  this.host = args.host;
  this.port = args.port;
  this.password = args.password;
  this.status = args.status || Server.STATUS_DOWN;
  this.playerIds = args.playerIds || [];
  this.nextStatus = args.nextStatus;
}

Server.STATUS_IDLE = 'idle';
Server.STATUS_PLAYING = 'playing';
Server.STATUS_WAITING = 'waiting';
Server.STATUS_DOWN = 'down';

Server.MAX_PLAYERS = 50;
Server.TIME_WAIT_FOR_NEWSQUADS = 2; //minutes
Server.MIN_SQUADS_TO_START = 2;
Server.MIN_SQUADS_TO_ABORT = 1;
Server.TIME_MAX_MISSION_LENGTH = 75; //minutes
Server.TIME_AVERAGE_MISSION_LENGTH = 60; //minutes

Server.prototype.setNewGameId = function () {
  collections.ServerCollection.update({
    _id: this._id
  }, {
    $set: {gameId: Random.id()}
  });
};

Server.prototype.removeGameId = function () {
  collections.ServerCollection.update({
    _id: this._id
  }, {
    $set: {gameId: null}
  });
};

Server.prototype.getGameId = function () {
  return get(this.getDoc(), 'gameId') || null;
};

Server.prototype.canReinforce = function (squad) {
  return this.isPlaying() && this.canFit(squad) && this.getPlayTimeElapsed() < (25*60);
},

Server.prototype.canReinforceWithoutSquad = function () {
  return this.isPlaying() && ! this.isFull() && this.getPlayTimeElapsed() < (35*60);
},

Server.prototype.getTimeRemainingToApproximateGameEnd = function () {
  if (! this.isPlaying()) {
    return undefined;
  }

  return this.getStatusChanged()
    .add(Server.TIME_AVERAGE_MISSION_LENGTH, 'minutes')
    .diff(moment(), 'seconds');
};

Server.prototype.getSquadsRemainingToStart = function () {
  if (! this.isIdle()) {
    return undefined;
  }

  return this.getSquadsToStart() - this.getSquadsInGame().length;
};

Server.prototype.getStartTime = function () {
  if (! this.isWaiting()) {
    return undefined;
  }

  return this.getStatusChanged().add(this.getWaitingTime(), 'minutes');
};

Server.prototype.getPlayTimeElapsed = function () {
  if (! this.isPlaying()) {
    return undefined;
  }

  return moment().diff(this.getStatusChanged(), 'seconds');
};

Server.prototype.getStartTimeLeft = function () {
  if (! this.isWaiting()) {
    return undefined;
  }

  return this.getStartTime().diff(moment(), 'seconds');
};


Server.prototype.getSquadsToAbort = function() {
  var min = get(this.getDoc(), 'squadsToAbort');
  return min !== null ? min : Server.MIN_SQUADS_TO_ABORT;
};

Server.prototype.getSquadsToStart = function() {
  var min = get(this.getDoc(), 'squadsToStart');
  return min !== null ? min : Server.MIN_SQUADS_TO_START;
};

Server.prototype.getWaitingTime = function() {
  var min = get(this.getDoc(), 'waitingTime');
  return min !== null ? min : Server.TIME_WAIT_FOR_NEWSQUADS;
};

Server.prototype.getMaxPlayers = function() {
  var min = get(this.getDoc(), 'maxPlayers');
  return min !== null ? min : Server.MAX_PLAYERS;
};

Server.prototype.updateSettings = function(settings) {
  collections.ServerCollection.update({
    _id: this._id
  }, {
    $set: settings
  });
};

Server.prototype.stillTimeToJoin = function() {
  var startingTime = this.getStartTime();
  if (! startingTime) {
    return false;
  }

  return startingTime.isAfter(moment());
};

Server.prototype.getAmountOfPlayers = function () {
  if (this.isWaiting()) {
    return this.getAmountOfSignedUpPlayers();
  } else {
    return this.getPlayerIds().length;
  }
};

Server.prototype.canFit = function(squad) {
  var players = this.getAmountOfPlayers();

  return players + squad.getSteamIds().length <= this.getMaxPlayers();
};

Server.prototype.isFull = function() {
  return this.getAmountOfPlayers() >= this.getMaxPlayers();
};

Server.prototype.hasSquadsFromSameCompany = function (squad) {
  var companyId = squad.getCompanyId();
  return this.getSquadsInGame().some(function (squadInGame) {
    return companyId == squadInGame.getCompanyId();
  });
}

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

Server.prototype.getHost = function() {
  return get(this.getDoc(), 'host');
}

Server.prototype.getPort = function() {
  return get(this.getDoc(), 'port');
}

Server.prototype.getPassword = function() {
  return get(this.getDoc(), 'password');
}

Server.prototype.markDead = function (player) {
  collections.ServerCollection.update({
    _id: this._id
  }, {
    $addToSet: {
      deadSteamIds: player.getSteamId()
    }
  });
};

Server.prototype.isDead = function (player) {
  return this.getDeadSteamIds().filter(function (id) {
    return player.getSteamId() === id;
  }).pop();
};

Server.prototype.resetDead = function () {
  collections.ServerCollection.update({
    _id: this._id
  }, {
    $set: {
      deadSteamIds: []
    }
  });
};

Server.prototype.getDeadSteamIds = function () {
  return get(this.getDoc(), 'deadSteamIds') || [];
};

Server.prototype.getJoinUrl = function() {
  var params = [
    '-usebe',
    '-world=empty',
    '-nolauncher',
    '-nosplash',
    '-mod=@ikarus',
    '-connect=' + this.getHost(),
    '-port=' + this.getPort(),
    '-password=' + this.getPassword()
  ];

  return 'steam://run/107410//' + params.join('%20');
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

Server.prototype.markStatusChange = function() {
  var time = moment().toString();
  collections.ServerCollection.update({
    _id: this._id
  }, {
    $set: {
      statusChanged: time
    }
  });
}

Server.prototype.getStatusChanged = function() {
  var time = get(this.getDoc(), 'statusChanged') || null;
  //console.log(time);
  //console.log("should construct a moment from that reliably");
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

  this.markStatusChange();
  this.resetDead();
}

Server.prototype.updateDetails = function(details) {
  collections.ServerCollection.update({
    _id: this._id
  }, {
    $set: _(details).pick('host', 'port', 'password')
  });
}

Server.prototype.getSquadsInGame = function() {
  var ids = get(this.getDoc(), 'inGame') || [];
  return ids.map(Squad.getById);
}

Server.prototype.updateAmountOfSignedUpPlayers = function() {
  if (! this.isWaiting()) {
    this.setAmountOfSignedUpPlayers(0);
  } else {
    var players = 0;
    this.getSquadsInGame().forEach(function(inGameSquad) {
      if (inGameSquad) {
        players += inGameSquad.getSteamIds().length;
      }
    });

    this.setAmountOfSignedUpPlayers(players);
  }
};

Server.prototype.getAmountOfSignedUpPlayers = function() {
  return get(this.getDoc(), 'signedUpPlayers') || 0;
};

Server.prototype.setAmountOfSignedUpPlayers = function(amount) {
  collections.ServerCollection.update({
    _id: this._id
  }, {
    $set: {
      signedUpPlayers: amount
    }
  });
};

Server.prototype.addSquadToGame = function(squad) {
  collections.ServerCollection.update({
    _id: this._id
  }, {
    $addToSet: {
      inGame: squad._id
    }
  });

  this.updateAmountOfSignedUpPlayers();
};

Server.prototype.removeSquadFromGame = function(squad) {
  collections.ServerCollection.update({
    _id: this._id
  }, {
    $pull: {
      inGame: squad._id
    }
  });

  this.updateAmountOfSignedUpPlayers();
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

Server.prototype.authenticateOrError = function() {
  var user = Meteor.user();
  if (! user || user.serverId !== this._id) {
    throw new Meteor.Error(401, 'Unauthorized server access');
  }

  return true;
}

Server.create = function(name, password) {

  var server = Server.fromDoc({ _id: collections.ServerCollection.insert(
    {name:name})
  });

  var user = Meteor.users.findOne({'username': name});
  var userId = null;

  if (! user) {
    userId = Accounts.createUser({
      username: name,
      password: password
    });
  } else {
    userId = user._id;
  }

  Meteor.users.update({_id: userId}, {$set: {serverId: server._id}});

  return server;
};

Server.getAll = function() {
  return collections.ServerCollection.find().fetch().map(Server.fromDoc);
};

Server.getAllWaiting = function() {
  return collections.ServerCollection.find({status: Server.STATUS_WAITING}).fetch().map(Server.fromDoc);
};

Server.getAllPlaying = function() {
  return collections.ServerCollection.find({status: Server.STATUS_PLAYING}).fetch().map(Server.fromDoc);
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
