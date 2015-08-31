Meteor.startup(function(){
  if (get(Meteor, 'settings.public.mode') !== 'dev' && Meteor.isServer) {
    dic.get('ServerQueueService').start();
  }
});

ServerQueueService = function ServerQueueService(
    queueSquadService,
    serverFinder,
    combatLogFactory
  ){
  this._started = false;
  this._loopDelay = 1000;
  this._serverFinder = serverFinder;
  this._combatLogFactory = combatLogFactory;

  this._serverStatusUpdates = [];

  this._queueSquadService = queueSquadService;
}

ServerQueueService.prototype.reinforceServer = function(squad, server) {
  if (! server.canReinforce(squad)) {
    return;
  }

  MissionEquipmentGameEvent.create(
    server.getGameId(),
    squad.getCompany()._id,
    squad.getInventory().serialize().items
  );

  this._addSquadToGame(squad, server);
};

ServerQueueService.prototype.start = function() {
  if (this._started) {
    throw new Error('Can not start ServerQueueService twice');
  }

  this.loop();
};

ServerQueueService.prototype.process = function() {
  this._queueSquadService.evaluateSquads();
  this.processStatusUpdates();
  this.checkServerIsReadyToAbort();
  this.checkServerIsReadyToStart();
  this.queueStatusChanged();
};

ServerQueueService.prototype.loop = function() {
  this.process();
  Meteor.setTimeout(this.loop.bind(this), this._loopDelay);
};

ServerQueueService.prototype.joinSquad = function(squad, player) {
  this._queueSquadService.joinSquad(squad, player);
};

ServerQueueService.prototype.leaveSquad = function(squad, player) {
  this._queueSquadService.leaveSquad(squad, player);
};

ServerQueueService.prototype.updateServerStatus = function(server, status) {
  this._serverStatusUpdates.push({server: server, status:status});
};

ServerQueueService.prototype.processStatusUpdates = function() {

  var statusUpdate = this._serverStatusUpdates.shift();
  while(statusUpdate) {
    this.changeServerStatus(statusUpdate.server, statusUpdate.status)
    statusUpdate = this._serverStatusUpdates.shift();
  }
}

ServerQueueService.prototype.changeServerStatus = function (server, status) {
  if (status == Server.STATUS_IDLE || status == Server.STATUS_DOWN){

    if (server.getStatus() == Server.STATUS_WAITING) {
      server.getSquadsInGame().forEach(function(squad) {
        if (! squad) {
          return;
        }

        var company = Company.getBySquad(squad);

        if (company) {
          Inventory.returnItems(company, squad);
        }
      })
    }

    if (server.getStatus() == Server.STATUS_PLAYING) {
      GameEndGameEvent.create(server.getGameId());
      server.getSquadsInGame().forEach(function (squad) {
        try{
          this._combatLogFactory.createForGameAndCompany(
            server.getGameId(), squad.getCompanyId()
          );
        } catch (e) {
          console.log("Error in combat log factory");
          console.log(e, e.stack);
        }

      }, this);
    }

    var players = Player.getAllByIds(server.playerIds);

    server.removePlayers();
    Squad.getAllByServer(server).forEach(function(squad) {
      squad.remove();
    });

    Inventory.removeByServer(server);
    server.removeAllSquadsFromGame();
    server.setAmountOfSignedUpPlayers(0);
    server.updateStatus(status);
  }
};

ServerQueueService.prototype.checkServerIsReadyToAbort = function () {
  Server.getAllWaiting().forEach(function(server){
    if (server.isWaiting() && server.getSquadsInGame().length <= server.getSquadsToAbort()) {
      server.updateStatus(Server.STATUS_DOWN);

      var squads = server.getSquadsInGame();
      var queue = ServerQueue.getByRegion('EU');

      squads.reverse().forEach(function(squad) {
        var company = Company.getBySquad(squad);

        if (! company) {
          return;
        }

        squad.setConnectionDeadline(null);
        squad.setServerId(null);
        queue.addToQueue(squad);
        squad.getInventory().setServerId(null);
      });

      server.removeAllSquadsFromGame();
    }
  }, this);
};

ServerQueueService.prototype.checkServerIsReadyToStart = function () {
  Server.getAllWaiting().forEach(function(server){

    if (server.stillTimeToJoin()) {
      return;
    }

    var squadsInGame = server.getSquadsInGame();
    var steamIdsOnServer = server.getPlayerIds();

    if (squadsInGame.length === 0 || steamIdsOnServer.length === 0) {
      return;
    }

    var readyToStart = squadsInGame.every(function(squad) {

      if ( ! squad.isBeforeDeadline()) {
        return true;
      }

      var steamIdsOnSquad = squad.getSteamIds();

      return steamIdsOnSquad.every(function(steamId) {
        var inGame = steamIdsOnServer.indexOf(steamId) !== -1;
        return inGame;
      });
    });


    if (readyToStart) {
      squadsInGame.forEach(function(squad) {
        squad.setConnectionDeadline(null);
      });

      if (server.getStatus() == Server.STATUS_WAITING) {
        server.getSquadsInGame().forEach(function (squad) {
          MissionEquipmentGameEvent.create(
            server.getGameId(),
            squad.getCompany()._id,
            squad.getInventory().serialize().items
          );

          squad.setRenown(squad.getCompany().getRenown());
        });
        server.updateStatus(Server.STATUS_PLAYING);
        GameStartedGameEvent.create(server.getGameId());

      }
    }
  }, this);
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
  if (server.isIdle() && queue.getLengthOfUniqueCompanies() >= server.getSquadsToStart()) {
    server.updateStatus(Server.STATUS_WAITING);
    server.setNewGameId();
    GameWaitingGameEvent.create(server.getGameId());
  }
};

ServerQueueService.prototype._checkNeedsToMoveQueue = function(server) {
  if (server.isWaiting()){

    var queue = ServerQueue.getByRegion('EU');
    var toRemoveFromQueue = [];
    queue.getQueue().forEach(function(squad){
      if (this._serverFinder.canHaveSquad(squad, server)) {
        toRemoveFromQueue.push(squad);
        this._addSquadToGame(squad, server);
      }
    }, this);

    toRemoveFromQueue.forEach(function(squad) {
      queue.removeSquadFromQueue(squad);
    })
  }
};

ServerQueueService.prototype.enterQueue = function(squad) {
  this._queueSquadService.joinQueue(squad);
};

ServerQueueService.prototype.leaveQueue = function(squad) {
  this._queueSquadService.leaveQueue(squad);
};

ServerQueueService.prototype._findServerForSquad = function(squad) {
  return this._serverFinder.findServer(squad);
};

ServerQueueService.prototype._addSquadToGame = function(squad, server) {
  server.addSquadToGame(squad);
  squad.setServerId(server._id);
  squad.getInventory().setServerId(server._id);
  squad.setConnectionDeadline(new moment().add(5, 'minutes'));
};
