ServerFinder = function ServerFinder (){}

ServerFinder.prototype.findServer = function (squad) {
  var servers = Server.getAllWaiting();

  return servers.filter(function(server){
    return this.canHaveSquad(squad, server);
  }.bind(this)).pop();
};

ServerFinder.prototype.findNonFullWaitingServer = function (squad) {
  var servers = Server.getAllWaiting();

  return servers.filter(function(server){
    return ! server.isFull() && server.stillTimeToJoin();
  }.bind(this)).pop();
};

ServerFinder.prototype.canHaveSquad = function (squad, server) {
  return server.canFit(squad) &&
    server.stillTimeToJoin() &&
    ! server.hasSquadsFromSameCompany(squad);
};

ServerFinder.prototype.getReinforceableServers = function (squad) {
  return Server.getAllPlaying().filter(function(server) {
    return squad ? server.canReinforce(squad) : server.canReinforceWithoutSquad();
  });
};

ServerFinder.prototype.getNextServer = function (squad) {

  if (squad) {
    var server = Server.getByInGameSquad(squad);

    if (server) {
      return server;
    }

    var serverThatCanBeJoinedNow = this.findServer(squad);
    if (serverThatCanBeJoinedNow) {
      return serverThatCanBeJoinedNow;
    }
  } else {
    var nonFullServer = this.findNonFullWaitingServer();
    if (nonFullServer) {
      return nonFullServer;
    }
  }

  var reinforceable = this.getReinforceableServers(squad);

  if (reinforceable.length > 0) {
    return reinforceable.pop();
  };

  var servers = Server.getAll().filter(function(server){
    return ! server.isDown();
  });

  return servers.sort(function(serverA, serverB) {
    var serverASquadsNeeded = serverA.getSquadsRemainingToStart();
    var serverBSquadsNeeded = serverB.getSquadsRemainingToStart();

    //Server idle
    if (serverASquadsNeeded && (! serverBSquadsNeeded || serverASquadsNeeded < serverBSquadsNeeded)) {
      return 1;
    }

    if (serverBSquadsNeeded && (! serverASquadsNeeded || serverBSquadsNeeded < serverASquadsNeeded)) {
      return -1;
    }

    //Server playing

    var serverAGameEnds = serverA.getTimeRemainingToApproximateGameEnd();
    var serverBGameEnds = serverB.getTimeRemainingToApproximateGameEnd();

    if (serverAGameEnds && (! serverBGameEnds || serverAGameEnds < serverBGameEnds)) {
      return 1;
    }

    if (serverBGameEnds && (! serverAGameEnds || serverBGameEnds < serverAGameEnds)) {
      return -1;
    }


   return 0;
  }).pop();
};