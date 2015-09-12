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
      collections.ServerQueueCollection.find(),
      collections.GameEventCollection.find(),
      collections.CombatLogCollection.find()
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

      if (ItemDefinitions[i].armaClass == 'IKRS_loot_valuables') {
        ItemDefinitions[i].loot = {'money': 50};
      }

      if (ItemDefinitions[i].armaClass == 'IKRS_guard_survive_reward') {
        ItemDefinitions[i].loot = {'money': 50};
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

    testingSetGameId: function (name) {
      var server = Server.getByName(name);
      server.setNewGameId();
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

    testingElapseServerStatusChanged : function (serverId) {
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
        },
        admin: true
      };

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
      collections.CombatLogCollection.remove({});
      collections.GameEventCollection.remove({});
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

    testing_createCombatLogForCurrentCompany: function() {
      var currentCompany = Company.getCurrent();

      if (! currentCompany) {
        return;
      }

      var companyId = currentCompany._id;
      var gameId = Random.id();
      var player = Player.getCurrent();
      var victim = Player.getByName("Innocent-Victim");
      var lootItems = {
        'optic_Holosight_smg': 1,
        'optic_Aco_smg': 1,
        'optic_ACO_grn_smg': 1,
        'muzzle_snds_acp': 1,
        'muzzle_snds_L': 2,
        'IKRS_renown': 34,
        'B_AssaultPack_khk': 3
      };

      var smgItems = {
        'Binocular':  4,
        'ItemGPS': 2,
        'SMG_02_F': 1,
        'SMG_01_F': 2,
        '30Rnd_9x21_Mag': 5,
        '30Rnd_45ACP_Mag_SMG_01': 6,
      };

      var equipment = {
        'Binocular':  6,
        'ItemGPS': 2,
        'SMG_02_F': 2,
        'SMG_01_F': 1,
        'B_Heli_Light_01_F': 1
      };

      GameWaitingGameEvent.create(gameId);
      PlayerJoinedGameEvent.create(gameId, companyId, player.getSteamId());
      GameStartedGameEvent.create(gameId);
      MissionEquipmentGameEvent.create(gameId, companyId, equipment);
      PlayerDeathGameEvent.create(gameId, companyId, {x: 100, y:1}, victim.getSteamId(), player.getSteamId(), 'hlc_rifle_rpk74n');
      PlayerDeathGameEvent.create(gameId, companyId, {x: 8900, y:900}, player.getSteamId(), null, null);

      for (var i=0;i<5;i++) {
        MissionLootGameEvent.create(gameId, companyId, 'IKRS_loot_smg_weapons', smgItems);
      }

      MissionLootGameEvent.create(gameId, companyId, 'IKRS_guard_kill_reward', {"IKRS_renown": 50});


      MissionLootGameEvent.create(gameId, companyId, null, lootItems);
      MissionLootGameEvent.create(
        gameId,
        companyId,
        null,
        {"IKRS_renown": -500}
      );
      RaidGameEvent.create(gameId, companyId, companyId, victim.getCompany()._id, 250);
      GameEndGameEvent.create(gameId);
      dic.get('CombatLogFactory').createForGameAndCompany(gameId, companyId);


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
      companies.forEach(function(companyName) {
        var company = Company.create(companyName);
      });

      var players = 20 + Math.floor(Math.random() * 10);

      for (var i=0; i<players; i++) {
        var steamId = getSteamId();
        insertTestUser(getRandom(firstNames) + ' ' + getRandom(lastNames), steamId);

        if (Math.random() > 0.2) {
          Company.getByName(getRandom(companies)).addPlayer(Player.getById(steamId))
        }
      }

      var users = Meteor.users.find({ testing: null }).fetch().forEach(function(user) {
        var player = Player.getByName(get(user, 'services.steam.username'));
        Company.getByName(getRandom(companies)).addPlayer(player);
      });

      insertTestUser("Panthallas", 123, "123");
      insertTestUser("Innocent-Victim", 321, "000");

      var manateeWarriors = Company.create("Manatee-Warriors");
      manateeWarriors.addPlayer(Player.getById(123));

      var bystanders = Company.create("Bystanders");
      bystanders.addPlayer(Player.getById(321));

      Company.getAll().forEach(function (company){
        dic.get('LootController').addStartingLoot(company);
        dic.get('LootController').receiveLootForCompany(
          null,
          company,
          [
            'IKRS_loot_smg_weapons',
            'IKRS_loot_warsaw_old',
            'IKRS_loot_warsaw_standard',
            'IKRS_loot_warsaw_ammo',
            'IKRS_loot_nato_standard',
            'IKRS_loot_nato_ammo',
            'IKRS_loot_nato_modern',
            'BAF_Offroad_D',
            'C_Van_01_transport_F',
            'IKRS_test_renown',
            'C_Heli_light_01_ion_F',
            'IKRS_underdog_reward_lvl3',
            'B_Mortar_01_support_F',
            'B_Mortar_01_weapon_F'
          ],
          new ObjectiveSupply()
        );
      });



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

function insertTestUser(name, steamId, id) {

  var user = {
    testing: true,
    services: {
      steam: {
        id: steamId,
        username: name
      }
    }
  };

  if (id) {
    user._id = id;
  }

  Meteor.users.insert(user);
}

function getSteamId() {
  return Math.floor(Math.random() * 1000000).toString();
}

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
