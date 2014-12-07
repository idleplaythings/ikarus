PlayerRepository = function PlayerRepository() {
  // @todo this repo depends on Meteor users collection, but it's not evident
}

PlayerRepository.prototype.updateCurrentCompanyId = function(company) {
  var user = this.getCurrent();

  if (! user)
    return;

  Meteor.users.update({_id: user._id}, {$set: {companyId: company._id}});
};

PlayerRepository.prototype.getById = function(playerId) {
  return this._fromDoc(Meteor.users.findOne({ 'services.steam.id': playerId }));
};

PlayerRepository.prototype.getCurrent = function() {
  return this._fromDoc(Meteor.user());
};

PlayerRepository.prototype.getByCompany = function(company) {
  return Meteor.users.find({ companyId: company._id }).fetch();
}

PlayerRepository.prototype._fromDoc = function(doc) {
  if (Boolean(doc) === false) {
    return null;
  }

  return new Player(doc);
};
