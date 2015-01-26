Meteor.startup(function(){
  if (get(Meteor, 'settings.public.mode') !== 'dev' && Meteor.isServer) {
    dic.get('ServerQueueService').start();
  }
});

ServerQueueService = function ServerQueueService(){
  this._started = false;
  this._loopDelay = 1000;
  this._serverFinder = new ServerFinder();

  this._serverStatusUpdates = [];
}

ServerQueueService.prototype.start = function() {
  if (this._started) {
    throw new Error('Can not start ServerQueueService twice');
  }

  this.loop();
};

ServerQueueService.prototype.loop = function() {

  this.processStatusUpdates();
  this.checkSquadDeadlines();
  this.checkServerIsReadyToAbort();
  this.checkServerIsReadyToStart();
  this.queueStatusChanged();

  Meteor.setTimeout(this.loop.bind(this), this._loopDelay);
};

ServerQueueService.prototype.updateServerStatus = function(server, status) {
  this._serverStatusUpdates.push({server: server, status:status});
}

ServerQueueService.prototype.processStatusUpdates = function() {

  var statusUpdate = this._serverStatusUpdates.shift();
  while(statusUpdate) {
    console.log("status updatoore");
    this.changeServerStatus(statusUpdate.server, statusUpdate.status)
    statusUpdate = this._serverStatusUpdates.shift();
  }
}

ServerQueueService.prototype.changeServerStatus = function(server, status) {
  if (status == Server.STATUS_IDLE || status == Server.STATUS_DOWN){

    if (server.getStatus() == Server.STATUS_WAITING) {
      server.getSquadsInGame().forEach(function(squad) {
        if (! squad) {
          return;
        }

        var company = Company.getBySquad(squad);
        Inventory.returnItems(company, squad);
      })
    }

    var players = Player.getAllByIds(server.playerIds);

    server.removePlayers();
    Squad.getAllByServer(server).forEach(function(squad) {
      squad.remove();
    })

    Inventory.removeByServer(server);
    server.removeAllSquadsFromGame();

    server.updateStatus(status);
  }
};

ServerQueueService.prototype.checkServerIsReadyToAbort = function () {
  Server.getAllWaiting().forEach(function(server){
    if (server.isWaiting() && server.getSquadsInGame().length <= Server.MIN_SQUADS_TO_ABORT) {
      server.updateStatus(Server.STATUS_DOWN);

      var squads = server.getSquadsInGame();
      var queue = ServerQueue.getByRegion('EU');

      squads.reverse().forEach(function(squad) {
        squad.setConnectionDeadline(null);
        squad.setServerId(null);
        queue.addToQueue(squad);
      });

      server.removeAllSquadsFromGame();
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
      try {
        var steamIdsOnSquad = squad.getSteamIds();

        return steamIdsOnSquad.every(function(steamId) {
          var inGame = steamIdsOnServer.indexOf(steamId) !== -1;
          return inGame;
        });
      } catch (e) {
        console.log(e.message, e.stack);

        server.removeSquadFromGame(squad);
        Inventory.removeBySquad(squad);
        squad.remove();
        return false;
      }
    });


    if (readyToStart) {
      try {
        squadsInGame.forEach(function(squad) {
          squad.setConnectionDeadline(null);
        });

        if (server.getStatus() == Server.STATUS_WAITING) {
          server.updateStatus(Server.STATUS_PLAYING)
        }
      } catch (e) {
        console.log(e.message, e.stack);

        server.removeSquadFromGame(squad);
        Inventory.removeBySquad(squad);
        squad.remove();
      }
    }
  }, this);
};

ServerQueueService.prototype.checkSquadDeadlines = function () {
  Squad.getAllOnDeadline().forEach(function(squad) {
    try {
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
      }
    } catch (e) {
      console.log(e.message, e.stack);
      if (squad.serverId) {
        var server = Server.getById(squad.serverId);
        if (server) {
          server.removeSquadFromGame(squad);
        }
      }
      Inventory.removeBySquad(squad);
      squad.remove();
    }
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

    var queue = ServerQueue.getByRegion('EU');
    queue.getQueue().forEach(function(squad){
      try {
        if (this._serverFinder.canHaveSquad(squad, server)) {
          queue.removeSquadFromQueue(squad);
          this._addSquadToGame(squad, server);
        }
      } catch (e) {
        console.log(e.message, e.stack);
        queue.removeSquadFromQueue(squad);
        Inventory.removeBySquad(squad);
        squad.remove();
      }
    }, this);
  }
};

ServerQueueService.prototype.enterQueue = function(squad) {
  if (ServerQueue.getBySquad(Squad.getCurrent())) {
    return;
  }

  var server = this._findServerForSquad(squad);
  if (server) {
    this._addSquadToGame(squad, server);
  } else {
    var queue = ServerQueue.getByRegion('EU');
    queue.addToQueue(squad);
  }
};

ServerQueueService.prototype.leaveQueue = function(squad) {
  var queue = ServerQueue.getByRegion('EU');
  queue.removeSquadFromQueue(squad);
};

ServerQueueService.prototype._findServerForSquad = function(squad) {
  return this._serverFinder.findServer(squad);
};

ServerQueueService.prototype._addSquadToGame = function(squad, server) {
  try {
    server.addSquadToGame(squad);
    squad.setServerId(server._id);
    squad.getInventory().setServerId(server._id);
    squad.setConnectionDeadline(new moment().add(5, 'minutes'));
  } catch (e) {
    console.log(e.message, e.stack);
    server.removeSquadFromGame(squad);
    Inventory.removeBySquad(squad);
    squad.remove();
  }
};
