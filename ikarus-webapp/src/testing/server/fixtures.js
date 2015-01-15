if (get(Meteor, 'settings.public.mode') === 'dev' && Meteor.isServer) {
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

    for (var i in ItemDefinitions) {
      if (ItemDefinitions[i].armaClass == 'IKRS_loot_common_RU_weapons') {
        ItemDefinitions[i].loot = {'CUP_arifle_AK74': 1};
      }
    }
  });

  Meteor.methods({

    testingCheckSquadDeadlines: function() {
      dic.get('ServerQueueService').checkSquadDeadlines();
    },

    testingElapseSquadTimeout : function (squadId) {
      var time = new moment(0).toString();
      collections.SquadCollection.update(
        {
          _id: squadId
        },
        {
          $set: {connectionDeadline: time}
        }
      )
    },

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
    },
    testing_addPlayerToCompany: function(playerName, companyName) {
      var player = Player.getByName(playerName);
      var company = Company.getByName(companyName);
      company.addPlayer(player);
    },
    testing_invitePlayerToCompany: function(playerName, companyName) {
      var player = Player.getByName(playerName)
      var company = Company.getByName(companyName);
      company.invite(player);
    },
    testing_createDataSet: function() {
      var companies = companyNames.filter(function() {
        return Math.random() > 0.2;
      });

      servers.forEach(Server.create);
      companies.forEach(Company.create);

      var players = 20 + Math.floor(Math.random() * 10);

      for (var i=0; i<players; i++) {
        var steamId = getSteamId();
        insertTestUser(getRandom(firstNames) + ' ' + getRandom(lastNames), steamId);

        if (Math.random() > 0.2) {
          Company.getByName(getRandom(companies)).addPlayer(Player.getById(steamId))

          if (Math.random() > 0.6) {
            Meteor.call('playerConnected', getRandom(servers), steamId);
          }
        }
      }

      var users = Meteor.users.find({ testing: null }).fetch().forEach(function(user) {
        var player = Player.getByName(get(user, 'services.steam.username'));
        Company.getByName(getRandom(companies)).addPlayer(player);

        if (Math.random() > 0.5) {
          Meteor.call('playerConnected', getRandom(servers), get(user, 'services.steam.id'));
        }
      })
    }
  });
}

var servers = [
  'Ikarus01',
  'Ikarus02'
];

var companyNames = [
  'Härmän Hurjat',
  'Strange Foreign People',
  'Placeholder Company',
  'Can\'t think of a name',
  'Myrmidons',
  'Some People',
  'Cows With Guns',
  'Creaa',
  'Manaattimiehet',
  'Aaargh',
];

var firstNames = [
  'Jane',
  'John',
  'May',
  'Papa',
  'Betty',
  'Richard'
];

var lastNames = [
  'Lee',
  'Oliver',
  'Doe',
  'Smith',
  'Kerry',
  'Clarkson'
];

function insertTestUser(name, steamId) {
  Meteor.users.insert({
    testing: true,
    services: {
      steam: {
        id: steamId,
        username: name
      }
    }
  });
}

function getSteamId() {
  return Math.floor(Math.random() * 1000000).toString();
}

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
