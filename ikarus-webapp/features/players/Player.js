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