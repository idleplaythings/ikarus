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

Player.prototype.isAdmin = function() {
  return get(this.getDoc(), 'admin');
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

Player.prototype.getInvites = function() {
  return get(this.getDoc(), 'invites') || [];
}

Player.prototype.getName = function() {
  return get(this.getDoc(), 'services.steam.username');
}

Player.prototype.getCompany = function() {
  return Company.getById(get(this.getDoc(), 'companyId'));
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
}

Player.prototype.isMemberOf = function(company) {
  return company.getPlayerIds().indexOf(this.getSteamId()) !== -1;
};

Player.getByMeteorId = function(id) {
  return Player.fromDoc(Meteor.users.findOne({ _id: id }));
}

Player.getById = function(playerId) {
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

Player.fromDoc = function(doc) {
  if (Boolean(doc) === false) {
    return null;
  }

  return new Player(doc);
};
