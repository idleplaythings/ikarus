SquadMemberRepository =  function SquadMemberRepository(squadMemberCollection, inventoryFactory) {
  this._squadMemberCollection = squadMemberCollection;
  this._inventoryFactory = inventoryFactory;
}

SquadMemberRepository.prototype.getBySquadId = function(squadId) {
  return this._squadMemberCollection.find({ squadId: squadId }).fetch().map(this._deserialize.bind(this));
};

SquadMemberRepository.prototype.getByPlayerId = function(playerId) {
  return this._deserialize(this._squadMemberCollection.findOne(
    {playerId: playerId}
  ));
};

SquadMemberRepository.prototype.createOnServerForPlayer= function(server, player){
  this.persist(new SquadMember({
    serverId: server._id,
    playerId: player._id,
    steamId: player.steamId
  }));

  return this.getByPlayerId(player._id);
};

SquadMemberRepository.prototype.remove = function(player) {
  this._squadMemberCollection.remove({ playerId: player._id });
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
