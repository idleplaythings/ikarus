Player = function Player(args) {
  this._id = args._id;
}

Player.prototype.getInvite = function(company) {
  return this.getInvites().filter(function(invite) {
    return invite.companyId === company._id;
  }).reduce(function(prev, current) {
    return prev ? prev : current;
  }, null);
};

gettersAndSetters(
  Player.prototype,
  ['Headgear', 'Uniform', 'Vest'],
  Meteor.users
);

Player.prototype.getGear = function() {

  function getClassesFromList(name, list) {
    var entry = list.filter(function(entry) {
      return entry.name == name;
    }).pop();

    return entry ? entry.classes : null;
  };

  return {
    steamId: this.getSteamId(),
    headgear: getClassesFromList(this.getHeadgear(), appearance.headgear),
    vest: getClassesFromList(this.getVest(), appearance.vests),
    uniform: getClassesFromList(this.getUniform(), appearance.uniforms)
  };
};

Player.prototype.addKill = function() {
  Meteor.users.update({ _id: this._id }, { $inc: { kills: 1 }});
};

Player.prototype.addDeath = function() {
  Meteor.users.update({ _id: this._id }, { $inc: { deaths: 1 }});
};

Player.prototype.getKills = function() {
  return get(this.getDoc(), 'kills') || 0;
};

Player.prototype.getDeaths = function() {
  return get(this.getDoc(), 'deaths') || 0;
};

Player.prototype.getKDRatio = function() {
  var deaths = this.getDeaths();
  if (deaths === 0) {
    deaths = 1;
  }

  return this.getKills() / deaths;
};

Player.prototype.isAdmin = function() {
  return get(this.getDoc(), 'admin');
};

Player.prototype.isReady = function() {
  return this.getSquad().isPlayerReady(this);
};

Player.prototype.setReady = function(ready) {
  var method = ready ? 'setPlayerReady' : 'unsetPlayerReady';
  this.getSquad()[method](this);
};

Player.prototype.hasInvite = function(company) {
  return Boolean(this.getInvite(company));
};

Player.prototype.getAvatarUrl = function() {
  return get(this.getDoc(), 'services.steam.avatar.small');
}

Player.prototype.getSteamId = function() {
  return get(this.getDoc(), 'services.steam.id');
}

Player.prototype.getLastNotificationTime = function() {
  var time = get(this.getDoc(), 'lastNotification');
  return time ? moment(time) : null;
}

Player.prototype.updateLastNotificationTime = function(oldTime) {
  var time = moment().valueOf();
  if (! oldTime) {
    return Meteor.users.update({ _id: this._id }, { $set: { lastNotification: time }});
  }

  return Meteor.users.update({ _id: this._id, lastNotification: oldTime.valueOf() }, { $set: { lastNotification: time }});
}

Player.prototype.getInvites = function() {
  return get(this.getDoc(), 'invites') || [];
}

Player.prototype.getName = function() {
  return get(this.getDoc(), 'services.steam.username');
}

Player.prototype.getCompanyId = function() {
  return get(this.getDoc(), 'companyId');
}

Player.prototype.getCompany = function() {
  return Company.getById(this.getCompanyId());
}

Player.prototype.getCompanyRank = function() {
  var company = this.getCompany();
  if (! company) {
    return null;
  }

  if (company.isOwner(this)) {
    return "Owner";
  }

  if (company.isOfficer(this)) {
    return "Officer";
  }

  return "Soldier";
}

Player.prototype.getSquad = function() {
  return Squad.getByPlayer(this);
}

Player.prototype.getDoc = function() {
  return Meteor.users.findOne({ _id: this._id });
}

Player.prototype.setCompanyId = function(companyId) {
  Meteor.users.update({ _id: this._id }, { $set: { companyId: companyId }});
}

Player.prototype.addInvite = function(invite) {
  Meteor.users.update({ _id: this._id }, { $addToSet: { invites: invite }});
};

Player.prototype.removeInvites = function() {
  Meteor.users.update({ _id: this._id }, { $set: { invites: [] }});
};

Player.prototype.isMemberOf = function(company) {
  return company.getPlayerIds().indexOf(this.getSteamId()) !== -1;
};

Player.prototype.canJoinASquad = function(squad) {
  var playingOnAServer = Server.getAllByPlayer(this).some(function(server) {
    return server.isPlaying() &&
      moment.duration(moment().diff(server.getStatusChanged())).asMinutes() < Server.TIME_MAX_MISSION_LENGTH;
  });

  return !playingOnAServer && !this.getSquad();
};

Player.prototype.isCurrent = function() {
  return this._id === Player.getCurrent()._id;
};

Player.getByMeteorId = function(id) {
  return Player.fromDoc(Meteor.users.findOne({ _id: id }));
}

Player.getById = function(playerId) {
  if (! playerId) {
    return null;
  }
  return Player.fromDoc(Meteor.users.findOne({ 'services.steam.id': playerId }));
}

Player.getByIds = function(playerIds) {
  return Meteor.users.find({ 'services.steam.id': { $in: playerIds }}).fetch().map(Player.fromDoc);
}

Player.getByName = function(name) {
  return Player.fromDoc(Meteor.users.findOne({ 'services.steam.username': name }));
};

Player.getByCompany = function(company) {
  return Meteor.users.find({ companyId: company._id }).fetch().map(Player.fromDoc);
}

Player.getAllByIds = function(playerIds) {
  return Meteor.users.find({ 'services.steam.id': { $in: playerIds }}).fetch().map(Player.fromDoc);
};

Player.getCurrent = function() {
  return Player.fromDoc(Meteor.user());
};

Player.getAll = function() {
  return Meteor.users.find({}).fetch().map(Player.fromDoc);
};

Player.getByPartialName = function(searchString) {
  var reg = new RegExp(searchString, 'i');

  return Meteor.users.find({
    'services.steam.username': reg
  }).fetch().map(Player.fromDoc);
};

Player.fromDoc = function(doc) {
  if (Boolean(doc) === false) {
    return null;
  }

  return new Player(doc);
};
