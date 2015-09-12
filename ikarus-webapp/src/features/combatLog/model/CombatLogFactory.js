CombatLogFactory = function CombatLogFactory(itemFactory) {
  this._itemFactory = itemFactory;
};

CombatLogFactory.prototype.createForGameAndCompany = function (gameId, companyId) {
  var waitingStarted = this.getTimestamp(GameWaitingGameEvent.getByGameId(gameId));
  var gameStarted = this.getTimestamp(GameStartedGameEvent.getByGameId(gameId));
  var gameEnded = this.getTimestamp(GameEndGameEvent.getByGameId(gameId));

  var playersInGame = this.getPlayerNamesAndUidsInGame(
    companyId,
    gameStarted,
    PlayerJoinedGameEvent.getByGameIdAndCompanyId(gameId, companyId),
    PlayerLeftGameEvent.getByGameIdAndCompanyId(gameId, companyId)
  );

  var events = [];

  var killsAndDeaths = this.getKillsAndDeaths(
    gameStarted,
    companyId,
    PlayerDeathGameEvent.getByGameIdAndCompanyId(gameId, companyId)
  );


  var casualties = killsAndDeaths.casualties;
  var kills = killsAndDeaths.kills;
  events = events.concat(killsAndDeaths.events);
  events = events.concat(this.getRaidEvents(companyId, RaidGameEvent.getByGameIdAndCompanyId(gameId, companyId)));

  var loot = this.getLoot(
    MissionLootGameEvent.getByGameIdAndCompanyId(gameId, companyId)
  );

  var equipment = this.getEquipment(
     MissionEquipmentGameEvent.getByGameIdAndCompanyId(gameId, companyId)
  );

  var log = new CombatLog({
    companyId: companyId,
    gameStarted: gameStarted,
    gameEnded: gameEnded,
    playersInGame: playersInGame,
    casualties: casualties,
    kills: kills,
    events: events,
    loot: loot,
    equipment: equipment
  });

  var id = collections.CombatLogCollection.insert(log.serialize());

  log._id = id;

  return log;
};

CombatLogFactory.prototype.getEquipment = function (missionEquipmentEvents) {

  var equipment = {};

  missionEquipmentEvents.forEach(function(loot){
    Object.keys(loot.itemClasses).forEach(function(armaClass){
      var amount = loot.itemClasses[armaClass];
      var item = this._itemFactory.createItemByArmaClass(armaClass);

      if (equipment[armaClass]) {
        equipment[armaClass] += amount;
      } else {
        equipment[armaClass] = amount;
      }
    }, this);
  }, this);

  return equipment;
};

CombatLogFactory.prototype.getLoot = function (missionLootEvents) {

  var totalLoot = {
    items: {},
    collections: []
  };

  missionLootEvents.forEach(function(loot){

    var lootObject = totalLoot.items;

    if (loot.parentItem) {
      lootObject = {
        parentItem: loot.parentItem,
        items: {}
      };
      totalLoot.collections.push(lootObject);
      lootObject = lootObject.items;
    }


    Object.keys(loot.itemClasses).forEach(function(armaClass){
      var amount = loot.itemClasses[armaClass];
      var item = this._itemFactory.createItemByArmaClass(armaClass);

      if (lootObject[armaClass]) {
        lootObject[armaClass] += amount;
      } else {
        lootObject[armaClass] = amount;
      }
    }, this);
  }, this);


  return totalLoot;
};

CombatLogFactory.prototype.getTimestamp = function (event) {
  if (! event) {
    return 0;
  }

  return event.timeStamp || 0;
};


CombatLogFactory.prototype.getRaidEvents = function (companyId, raidEvents) {
  return raidEvents.map(function (raidEvent) {
    var winner = Company.getById(raidEvent.winnerCompanyId);
    var loser = Company.getById(raidEvent.loserCompanyId);

    var header = "Raid victory";

    var winnerName = winner ? '<company id="'+winner._id+'">' + winner.getName() + '</company>' : "Unknown company";
    var loserName = loser ? '<company id="'+loser._id+'">' + loser.getName() + '</company>' : "Unknown company";

    var text = "<text>Your company won a raid against "+loserName+" and gained " +raidEvent.renown+ " points of renown.</text>";

    if (loser && loser._id == companyId) {
      header = "Raid defeat";
      text = "<text>Your company lost a raid against "+winnerName+" and lost " +raidEvent.renown+ " points of renown.</text>";
    }

    return {
      time: raidEvent.timeStamp,
      header: header,
      text: text
    }
  });
};


CombatLogFactory.prototype.getKillsAndDeaths = function (gameStarted, companyId, deaths) {

  var casualties = 0;
  var kills = 0;

  var events = deaths.map(function (death) {

    var victim = Player.getById(death.victim);
    var killer = Player.getById(death.killer);
    var weapon = this._itemFactory.createItemByArmaClass(death.weaponArmaClass);
    var header = "";
    var text = "";
    var time = death.timeStamp;

    var weaponText = "";

    if (weapon) {
      weaponText = " with <item armaClass='"+weapon.armaClass+"'>"+weapon.name+"</item>";
    }

    if (victim && victim.getCompany() && victim.getCompany()._id == companyId) {
      header = "Casualty";
      casualties++;
      if (killer && killer.getName()) {
        text = "<text><player uid='"+victim.getSteamId()+"'>"+victim.getName()+"</player> was killed by <player uid='"+killer.getSteamId()+"'>"+killer.getName()+"</player>"+weaponText+"</text>";
      } else {
        text = "<text><player uid='"+victim.getSteamId()+"'>"+victim.getName()+"</player> died of unknown cause</text>";
      }
    } else {
      header = "Kill";
      kills++;


      if (victim) {
        text = "<text><player uid='"+killer.getSteamId()+"'>"+killer.getName()+"</player> killed <player uid='"+victim.getSteamId()+"'>"+victim.getName()+"</player>"+weaponText+"</text>";
      } else {
        text = "<text><player uid='"+killer.getSteamId()+"'>"+killer.getName()+"</player> killed an unknown player.</text>";
      }
    }

    return {
      time: time,
      header: header,
      text: text
    };
  }, this);

  return {
    casualties: casualties,
    kills: kills,
    events: events
  }
};

CombatLogFactory.prototype.getPlayerNamesAndUidsInGame = function (companyId, started, joins, lefts) {

  var inGame = [];

  joins.forEach(function(join) {
    var uid = join.player;
    var player = Player.getById(uid);
    var playerEntry = {name: player.getName(), uid: uid};
    var leftBeforeStart = Boolean(lefts.filter(function (left) {
      return left.timeStamp < started;
    }).pop());

    if (player.getCompany()._id == companyId && ! leftBeforeStart && inGame.indexOf(playerEntry) == -1) {
      inGame.push(playerEntry);
    }
  });

  return inGame;
};