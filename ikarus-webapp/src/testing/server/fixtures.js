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

  Meteor.startup(function(){
    ItemDefinitions.push(new ItemLoot({
      name:'test-loot',
      armaClass: 'test-loot',
      loot: {
        'CUP_srifle_LeeEnfield': 1,
        'CUP_10x_303_M': 5,
      }
    }));
  });

  Meteor.methods({
    testing_addToArmory: function(companyId, amount, armaclass){
      var set = {};
      set["items."+armaclass] = parseInt(amount, 10);

      collections.InventoryCollection.update(
        {
          companyId: companyId
        },
        {
          $set: set
        }
      )
    },

    testing_addToInventory: function(squadId, amount, armaclass){

      var set = {};
      set["items."+armaclass] = parseInt(amount, 10);

      collections.InventoryCollection.update(
        {
          squadId: squadId
        },
        {
          $set: set
        }
      )
    },

    testing_login: function(name) {
      var id = Meteor.users.findOne({'services.steam.username': name})._id;
      this.setUserId(id);
    },

    testing_createTestUser: function(name, steamId) {
      Meteor.users.insert({
        testing: true,
        services: {
          steam: {
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
      collections.CompanyCollection.remove({});
      collections.SquadCollection.remove({});
      collections.InventoryCollection.remove({});
      collections.ServerCollection.remove({});

      Meteor.users.remove({'services.steam.username': 'John Doe'});
      Meteor.users.remove({'services.steam.username': 'Jane Doe'});
    },
    testing_addPlayerToCompany: function(playerName, companyName) {
      var player = Player.getByName(playerName);
      var company = Company.getByName(companyName);
      company.addPlayer(player);
    }
  });
}
