Player = function Player(args) {
  this._id = args._id;
  this.steamId = args.services ? args.services.steam.id : null;
  this.name = args.services ? args.services.steam.username : null;
}