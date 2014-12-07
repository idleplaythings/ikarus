SquadMember = function(args){
  this._id = args._id;
  this.serverId = args.serverId;
  this.steamId = args.steamId;
  this.inventory = args.inventory || new Inventory();
}

SquadMember.prototype.serialize = function(){
  return {
    serverId: this.serverId,
    steamId: this.steamId,
    inventory: this.inventory.serialize()
  }
};