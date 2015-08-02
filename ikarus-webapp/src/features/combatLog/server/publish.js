Meteor.publish('combatLogHeaders', function(limit) {
  if (! this.userId){
    this.ready();
    return;
  }

  if (! limit) {
    limit = 5;
  }

  var player = Player.getByMeteorId(this.userId);
  var company = Company.getByPlayer(player);

  if (! player || ! company) {
    this.ready();
    return;
  }

  var companyId = company._id;

  return collections.CombatLogCollection.find({
      companyId: companyId
    },
    {
      sort: {gameEnded: -1},
      limit: limit,
      fields: {
        'gameEnded': 1,
        'playersInGame': 1
      }
    }
  );
});

Meteor.publish('latestCombatLog', function() {
  if (! this.userId){
    this.ready();
    return;
  }

  var player = Player.getByMeteorId(this.userId);
  var company = Company.getByPlayer(player);

  if (! player || ! company) {
    this.ready();
    return;
  }

  var companyId = company._id;

  return collections.CombatLogCollection.find(
    {companyId: companyId},
    {sort: {gameEnded: -1}, limit: 1}
  );
});

Meteor.publish('combatLogById', function(id) {
  if (! this.userId){
    this.ready();
    return;
  }

  var player = Player.getByMeteorId(this.userId);
  var company = Company.getByPlayer(player);

  if (! player || ! company) {
    this.ready();
    return;
  }

  var companyId = company._id;

  return collections.CombatLogCollection.find({
      companyId: companyId,
      _id: id
    }
  );
});