PlayerRepository = function PlayerRepository() {

}

PlayerRepository.prototype.updatePlayerSquadId = function(user, squadId) {
  Meteor.users.update({_id: user._id}, {$set: {squadId: squadId}});
};

PlayerRepository.prototype.getById = function(playerId) {
  return this._fromDoc(Meteor.users.findOne({ 'services.steam.id': playerId }));
};

PlayerRepository.prototype.getCurrent = function() {
  return this._fromDoc(Meteor.user());
};

PlayerRepository.prototype.getByCompany = function(company) {
  return Meteor.users.find({ companyId: company.getId() }).fetch();
}

PlayerRepository.prototype._fromDoc = function(doc) {
  if (Boolean(doc) === false) {
    return null;
  }

  return new Player(doc);
};
