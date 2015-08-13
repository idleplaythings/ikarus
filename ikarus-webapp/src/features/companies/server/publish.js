Meteor.publish('MyCompanyAndSquads', function() {
  if (! this.userId){
    this.ready();
    return;
  }

  var user = Meteor.users.findOne({_id: this.userId});
  var steamId = user.services.steam.id;

  return [
    collections.CompanyCollection.find({}),
    collections.SquadCollection.find({squadId: user.squadId}),
    collections.InventoryCollection.find({companyId: user.companyId}),
    Meteor.users.find(
      {companyId: user.companyId},
      {
        fields: {
          'companyId': 1,
          'profile.name': 1,
          'services.steam.id': 1,
          'services.steam.avatar': 1,
          'services.steam.username': 1,
          'ready': 1,
          'admin': 1
        }
      }
    )
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

  if (! company) {
    this.ready();
    return;
  }

  var playerIds = company.getPlayerIds();

  return [
    collections.CompanyCollection.find(
      { _id: companyId },
      {fields: {
        name: 1,
        playerIds: 1
      }}
    ),
    Meteor.users.find(
      {companyId: companyId},
      {
        fields: {
          'companyId': 1,
          'profile.name': 1,
          'services.steam.id': 1,
          'services.steam.avatar': 1,
          'services.steam.username': 1,
          'kills': 1,
          'deaths': 1
        }
      }
    ),
    collections.InventoryCollection.find(
      {companyId: companyId},
      {
        fields: {
          'items.IKRS_renown': 1,
          'companyId': 1,
          'type': 1
        }
      }
    )
  ];
});

Meteor.publish('Companies', function() {
  return collections.CompanyCollection.find(
    {},
    {
      fields: {
        name: 1,
        playerIds: 1
      }
    }
  );
});
