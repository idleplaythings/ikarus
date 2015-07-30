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

  return collections.GameEventCollection.find({c: companyId, g: gameId});
});

Meteor.publish('MyCompanyGameEnds', function(companyId, limit) {
  if (! this.userId){
    this.ready();
    return;
  }

  if (! limit) {
    limit = 5;
  }

  var player = Player.getByMeteorId(this.userId);
  var company = Company.getByPlayer(player);

  if (! company || company._id !== companyId) {
    this.ready();
    return;
  }

  return collections.GameEventCollection.find(
    {c: companyId, t: GameEndGameEvent.TYPE},
    {limit: limit}
  );
});