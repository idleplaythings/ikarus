
InventorySquadMember = function InventorySquadMember(args){
  Inventory.call(this, args);
  this.type = 'InventorySquadMember';
  this.steamId = args.steamId;
  this.serverId = args.serverId;
}

InventorySquadMember.prototype = Object.create(Inventory.prototype);

InventorySquadMember.prototype.serialize = function(){
  var serialized = Inventory.prototype.serialize.call(this);
  serialized.serverId = this.serverId;
  serialized.steamId = this.steamId;
  return serialized;
};


