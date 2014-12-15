Player = function Player(args) {
  this._id = args._id;
  this.steamId = args.services ? args.services.steam.id : null;
  this.name = args.services ? args.services.steam.username : null;
  this.invites = args.invites || [];
}

Player.prototype.getInvite = function(company){
  return this.invites.indexOf(company._id) > -1;
};

Player.prototype.hasInvite = function(company){
  return Boolean(this.getInvite(company));
};

Player.prototype.getAvatarUrl = function() {
  var user = this._getUser();

  if (!user || !user.services) {
    return null;
  }

  return user.services.steam.avatar.small;
}

Player.prototype.getSteamId = function() {
  var user = this._getUser();

  if (!user || !user.services) {
    return null;
  }

  return user.services.steam.id;
}

Player.prototype.getName = function() {
  var user = this._getUser();

  if (!user) {
    return null;
  }

  return user.name;
}

Player.prototype.getCompany = function() {
  var companyId = this._getUser().companyId;
  return Company.getById(companyId);
}

Player.prototype.getSquad = function() {
  return Squad.getByPlayer(this);
}

Player.prototype._getUser = function() {
  return Meteor.users.findOne({ _id: this._id });
}

Player.prototype.setCompanyId = function(companyId) {
  Meteor.users.update({ _id: this._id }, { $set: { companyId: companyId }});
}

Player.getById = function(playerId) {
  return dic.get('PlayerRepository').getById(playerId);
}
