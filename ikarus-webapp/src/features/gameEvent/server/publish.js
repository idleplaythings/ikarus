Meteor.publish('MyCompanyGameEventsForGame', function(companyId, gameId) {
  if (! this.userId){
    this.ready();
    return;
  }

  var player = Player.getByMeteorId(this.userId);
  var company = Company.getByPlayer(player);

  if (! company || company._id !== companyId) {
    this.ready();
    return;
  }

  return collections.GameEventCollection.find({
    $or: [{c: companyId}, {c: null}],
    g: gameId
  });
});