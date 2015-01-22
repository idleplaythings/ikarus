Meteor.startup(function(){
  if (get(Meteor, 'settings.public.mode') !== 'dev' && Meteor.isServer) {
    dic.get('ServerQueueService').start();
  }
});

ServerQueueService = function ServerQueueService(){
  this._started = false;
  this._loopDelay = 1000;
  this._minSquadsToStart = 1;
  this._waitingTime = 2; //minutes
}

ServerQueueService.prototype.start = function() {
  if (this._started) {
    throw new Error('Can not start ServerQueueService twice');
  }

  this.loop();
};

ServerQueueService.prototype.loop = function() {

  this.checkSquadDeadlines();
  this.checkServerIsReadyToStart();

  Meteor.setTimeout(this.loop.bind(this), this._loopDelay);
};

ServerQueueService.prototype.checkServerIsReadyToStart = function () {
  Server.getAllWaiting().forEach(function(server){

    console.log("server waiting times", this._waitingTime);
    console.log(server.getWaitingStarted().add(this._waitingTime, 'minutes').toString());
    console.log(moment().toString());
    if (server.getWaitingStarted().add(this._waitingTime, 'minutes').isAfter(moment())) {
      return;
    }

    var squadsInGame = server.getSquadsInGame();
    var steamIdsOnServer = server.getPlayerIds();

    if (squadsInGame.length === 0 || steamIdsOnServer.length === 0) {
      return;
    }

    var readyToStart = squadsInGame.every(function(squad) {

      var steamIdsOnSquad = squad.getSteamIds();

      return steamIdsOnSquad.every(function(steamId) {
        var inGame = steamIdsOnServer.indexOf(steamId) !== -1;
        console.log(steamId, "is in game on server:", inGame, server.getName());
        return inGame;
      });
    })

    if (readyToStart) {
      server.updateStatus(Server.STATUS_PLAYING)
      squadsInGame.forEach(function(squad) {
        squad.setConnectionDeadline(null);
      });
    }
  }, this);
};

ServerQueueService.prototype.checkSquadDeadlines = function () {
  Squad.getAllOnDeadline().forEach(function(squad) {
    if ( ! squad.isOnDeadline()) {
      var server = squad.getServer();
      var steamIdsOnSquad = squad.getSteamIds();
      var steamIdsOnServer = server.getPlayerIds();

      steamIdsOnSquad.filter(function(steamId) {
        return steamIdsOnServer.indexOf(steamId) === -1;
      }).forEach(function(steamId) {
        squad.removePlayer(Player.getById(steamId));
      });

      if (squad.isEmpty()) {
        server.removeSquadFromGame(squad);
        Inventory.removeBySquad(squad);
        squad.remove();
      }
    };
  });
};

ServerQueueService.prototype.serverStatusChanged = function(server) {
  this._checkNeedsNewStatus(server);
  this._checkNeedsToMoveQueue(server);
};

ServerQueueService.prototype.queueStatusChanged = function(server) {
  Server.getAll().forEach(function (server) {
    this.serverStatusChanged(server);
  }, this);
};

ServerQueueService.prototype._checkNeedsNewStatus = function(server) {
  var queue = ServerQueue.getByRegion('EU');
  if (server.isIdle() && queue.getLength() >= this._minSquadsToStart) {
    server.updateStatus(Server.STATUS_WAITING);
  }
};

ServerQueueService.prototype._checkNeedsToMoveQueue = function(server) {
  if (server.isWaiting()){
    var queue = ServerQueue.getByRegion('EU');
    while(queue.getLength() > 0) {
      var squad = queue.shiftFromQueue();
      this._addSquadToGame(squad, server);
    }
  }
};

ServerQueueService.prototype.enterQueue = function(squad) {
  var server = this._findServerForSquad(squad);
  if (server.isWaiting()) {
    this._addSquadToGame(squad, server);
  } else {
    var queue = ServerQueue.getByRegion('EU');
    queue.addToQueue(squad);
    this.queueStatusChanged();
  }
};

ServerQueueService.prototype.leaveQueue = function(squad) {
  var queue = ServerQueue.getByRegion('EU');
  queue.removeSquadFromQueue(squad);
};

ServerQueueService.prototype._findServerForSquad = function(squad) {
  return Server.getAll().pop();
};

ServerQueueService.prototype._addSquadToGame = function(squad, server) {
  server.addSquadToGame(squad);
  squad.setServerId(server._id);
  squad.getInventory().setServerId(server._id);
  squad.setConnectionDeadline(new moment().add(5, 'minutes'));
};

