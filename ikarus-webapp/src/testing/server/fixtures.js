if (process.env.ENV === 'dev' && Meteor.isServer) {
  Meteor.publish('testing', function() {
    return [
      collections.ServerCollection.find(),
      collections.CompanyCollection.find(),
      collections.SquadCollection.find(),
      collections.SquadMemberCollection.find(),
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
          testAccount: true,
          'services.steam': {
            id: steamId,
            username: name
          }
        }
      });
    },
    testing_removeTestUsers: function() {
      Meteor.users.remove({ testAccount: true });
    }
  });
}
