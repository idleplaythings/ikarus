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
      collections.InventoryCollection.find(),
      collections.ServerQueueCollection.find()
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

    testingSetServerStatus: function(serverName, status) {
      collections.ServerCollection.update(
        {name: serverName},
        {$set:{
          status: status,
          statusChanged: moment().toString()
        }}
      );
    },

    testingEvaluateSquads: function() {
      dic.get('ServerQueueService').process();
    },

    testingLoginAsServer: function(serverName) {
      var server = Server.getByName(serverName);
      var user = Meteor.users.findOne({serverId: server._id})
      this.setUserId(user._id);
    },

    'testingRegisterServer': function(name) {
      var server = Server.getByName(name);

      if (!server) {
        Server.create(name, 'salakala');
      }
    },

    testingSetMaxSquadMembers: function(max) {
      max = parseInt(max, 10);
      Squad.MAX_MEMBERS = max;
    },

    testingSetMinTeamsToAbort: function(min) {
      min = parseInt(min, 10);
      Server.MIN_SQUADS_TO_ABORT = min;
    },

    testingSetMaxPlayersPerServer: function (max) {
      max = parseInt(max, 10);
      Server.MAX_PLAYERS = max;
    },

    testingSetMinSquadsToStartGame: function(min) {
      min = parseInt(min, 10);
      Server.MIN_SQUADS_TO_START = min;
    },

    testingSetMinTimeToStartGame: function(min) {
      min = parseInt(min, 10);
      Server.TIME_WAIT_FOR_NEWSQUADS = min;
    },

    testingCheckServeIsReadyToAbort: function() {
      dic.get('ServerQueueService').checkServerIsReadyToAbort();
    },

    testingCheckServerForGameStart: function() {
      dic.get('ServerQueueService').checkServerIsReadyToStart();
    },

    testingCheckSquadDeadlines: function() {
      dic.get('ServerQueueService').process();
    },

    testingElapseServerWaitingTime : function (serverId) {
      var time = new moment(0).toString();
      collections.ServerCollection.update(
        {
          _id: serverId
        },
        {
          $set: {statusChanged: time}
        }
      )
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

    testing_createTestUser: function(name, steamId, id) {

      var insert = {
        testing: true,
        services: {
          steam: {
            id: steamId,
            username: name
          }
        }
      }

      if (id) {
        insert._id = id;
      }

      Meteor.users.insert(insert);
    },
    testing_createCompany: function(name) {
      Company.create().setName(name);
    },
    testing_removeFixtures: function() {
      Meteor.users.remove({ testing: true });
      Meteor.users.remove({ serverId: {$ne: null} });
      collections.CompanyCollection.remove({});
      collections.SquadCollection.remove({});
      collections.InventoryCollection.remove({});
      collections.ServerCollection.remove({});
      collections.ServerQueueCollection.update({}, {$set: {queue: []}}, {multi: true});
      Server.MAX_PLAYERS = 60;
      Squad.MAX_MEMBERS = 12;
      Server.TIME_WAIT_FOR_NEWSQUADS = 2;
      Server.MIN_SQUADS_TO_START = 1;
      Server.MIN_SQUADS_TO_ABORT = 0;
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

      servers.forEach(function (name) {
        var server = Server.create(name, 'salakala');
        server.updateDetails({
          host: 'ikarus1.tunk.io',
          port: '1234',
          password: 'puuppa'
        });
      });
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
