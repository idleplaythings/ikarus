Meteor.publish('MySquad', function() {
  if (! this.userId){
    this.ready();
    return;
  }

  var user = Meteor.users.findOne({_id: this.userId});
  var steamId = user.services.steam.id;

  return [
    // collections.CompanyCollection.find({playerIds: {$in: [steamId]}}),
    collections.CompanyCollection.find({}),
    collections.SquadCollection.find({squadId: user.squadId}),
    collections.InventoryCollection.find({companyId: user.companyId})
  ];
});

Meteor.publish('SquadInventory', function(squadId) {
  if (! this.userId){
    this.ready();
    return;
  }

  var player = Player.getByMeteorId(this.userId);
  var squad = Squad.getByPlayer(player);

  if (! squad) {
    this.ready();
    return;
  }

  return [
    collections.InventoryCollection.find({squadId: squad._id})
  ];
});

Meteor.publish('CompanyArmory', function(companyId) {
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

  return [
    collections.InventoryCollection.find({companyId: company._id})
  ];
});

Meteor.publish('Company', function(companyId) {
  var company = Company.getById(companyId);
  var playerIds = company.getPlayerIds();

  return [
    collections.CompanyCollection.find({ _id: companyId }),
    Meteor.users.find({ 'services.steam.id': { $in: playerIds } })
  ];
});
