
InventorySquad = function InventorySquad(args){
  Inventory.call(this, args);
  this.type = 'InventorySquad';
  this.squadId = args.squadId;
  this.serverId = args.serverId;
  this.locked = args.locked || false;
}

InventorySquad.prototype = Object.create(Inventory.prototype);

InventorySquad.prototype.serialize = function(){
  var serialized = Inventory.prototype.serialize.call(this);
  serialized.serverId = this.serverId;
  serialized.squadId = this.squadId;
  return serialized;
};


