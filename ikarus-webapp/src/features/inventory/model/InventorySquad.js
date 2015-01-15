
InventorySquad = function InventorySquad(args){
  Inventory.call(this, args);
  this.type = 'InventorySquad';
  this.squadId = args.squadId;
  this.serverId = args.serverId;
  this.locked = args.locked || false;
}

InventorySquad.prototype = Object.create(Inventory.prototype);

InventorySquad.prototype.isLocked = function() {
  var squad = this.getSquad();
  return squad && squad.isLocked();
};

InventorySquad.prototype.getSquad = function() {
  return Squad.getById(this.squadId);
};

InventorySquad.prototype.setServerId = function(serverId) {
  this.serverId = serverId;
  collections.InventoryCollection.update(
    {_id: this._id},
    {$set: {serverId: serverId}}
  );
};

InventorySquad.prototype.serialize = function(){
  var serialized = Inventory.prototype.serialize.call(this);
  serialized.serverId = this.serverId;
  serialized.squadId = this.squadId;
  return serialized;
};


