if (process.env.ENV === 'dev' && Meteor.isServer) {
  Meteor.publish('testing', function() {
    return [
      collections.CompanyCollection.find(),

      Meteor.users.find({}, {
        'services.steam': 1,
        'invites': 1,
        'companyId': 1,
        'steamId': 1
      }),
      collections.ServerCollection.find(),
      collections.SquadCollection.find(),
      collections.InventoryCollection.find()
    ];
  });

  Meteor.methods({
    testing_createTestUser: function(name, steamId, password) {
      var userId = Accounts.createUser({
        username: name,
        password: password
      });

      Meteor.users.update({
        _id: userId
      }, {
        $set: {
          testing: true,
          'services.steam': {
            id: steamId,
            username: name
          }
        }
      });
    },
    testing_createCompany: function(name) {
      Company.create().setName(name);
    },
    testing_removeFixtures: function() {
      Meteor.users.remove({ testing: true });
      collections.CompanyCollection.remove({ name: "Manatee Men" });
    },
    testing_addPlayerToCompany: function(playerName, companyName) {
      var player = Player.getByName(playerName);
      var company = Company.getByName(companyName);
      company.addPlayer(player);
    }
  });
}
