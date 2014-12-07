SquadMemberRepository =  function SquadMemberRepository(squadMemberCollection, inventoryFactory) {
  this._squadMemberCollection = squadMemberCollection;
  this._inventoryFactory = inventoryFactory;
}

SquadMemberRepository.prototype.getBySquadId = function(squadId) {
  return this._squadMemberCollection.find({ squadId: squadId }).fetch().map(this._deserialize.bind(this));
};

SquadMemberRepository.prototype.getBySteamId = function(steamId) {
  return this._deserialize(this._squadMemberCollection.findOne(
    {steamId: steamId}
  ));
};

SquadMemberRepository.prototype.createOnServerForPlayer = function(server, player){
  this.persist(new SquadMember({
    serverId: server._id,
    steamId: player.steamId
  }));

  return this.getBySteamId(player.steamId);
};

SquadMemberRepository.prototype.removeFromServer = function(server){
  this._squadMemberCollection.remove({ serverId: server._id });
};

SquadMemberRepository.prototype.remove = function(player) {
  this._squadMemberCollection.remove({ steamId: player.steamId });
};

SquadMemberRepository.prototype.persist = function(squadMember) {
  this._squadMemberCollection.update(
    { _id:  squadMember._id},
    squadMember.serialize(),
    { upsert: true }
  );
};

SquadMemberRepository.prototype._deserialize = function(doc) {
  if (Boolean(doc) === false) {
    return null;
  }

  doc.inventory = this._inventoryFactory.deserialize(doc.inventory);

  return new SquadMember(doc);
};
