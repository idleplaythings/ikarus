Meteor.startup(function(){
  if (get(Meteor, 'settings.public.mode') !== 'dev' && Meteor.isServer) {
    dic.get('ServerQueueService').start();
  }
});

ServerQueueService = function ServerQueueService(){
  this._started = false;
  this._loopDelay = 1000;
}

ServerQueueService.prototype.start = function() {
  if (this._started) {
    throw new Error('Can not start ServerQueueService twice');
  }

  this.loop();
};

ServerQueueService.prototype.loop = function() {

  this.checkSquadDeadlines();
  this.checkServerIsReadyToAbort();
  this.checkServerIsReadyToStart();

  Meteor.setTimeout(this.loop.bind(this), this._loopDelay);
};


ServerQueueService.prototype.checkServerIsReadyToAbort = function () {
  Server.getAllWaiting().forEach(function(server){
    if (server.isWaiting() && server.getSquadsInGame().length <= Server.MIN_SQUADS_TO_ABORT) {
      server.updateStatus(Server.STATUS_IDLE);

      var squads = server.getSquadsInGame();
      var queue = ServerQueue.getByRegion('EU');

      squads.reverse().forEach(function(squad) {
        squad.setConnectionDeadline(null);
        squad.setServerId(null);
        queue.addToQueue(squad);
      });

      server.removeAllSquadsFromGame();
      this.queueStatusChanged();
    }
  }, this);
};

ServerQueueService.prototype.checkServerIsReadyToStart = function () {
  Server.getAllWaiting().forEach(function(server){

    if (server.getStatusChanged().add(Server.TIME_WAIT_FOR_NEWSQUADS, 'minutes').isAfter(moment())) {
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
  if (server.isIdle() && queue.getLength() >= Server.MIN_SQUADS_TO_START) {
    server.updateStatus(Server.STATUS_WAITING);
  }
};

ServerQueueService.prototype._checkNeedsToMoveQueue = function(server) {
  if (server.isWaiting()){

    if (server.getStatusChanged().add(Server.TIME_WAIT_FOR_NEWSQUADS, 'minutes').isBefore(moment())) {
      return;
    }

    var queue = ServerQueue.getByRegion('EU');
    queue.getQueue().forEach(function(squad){
      if (server.canFit(squad)) {
        queue.removeSquadFromQueue(squad);
        this._addSquadToGame(squad, server);
      }
    }, this);
  }
};

ServerQueueService.prototype.enterQueue = function(squad) {
  var server = this._findServerForSquad(squad);
  if (server) {
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
  return new ServerFinder().findServer(squad);
};

ServerQueueService.prototype._addSquadToGame = function(squad, server) {
  server.addSquadToGame(squad);
  squad.setServerId(server._id);
  squad.getInventory().setServerId(server._id);
  squad.setConnectionDeadline(new moment().add(5, 'minutes'));
};
