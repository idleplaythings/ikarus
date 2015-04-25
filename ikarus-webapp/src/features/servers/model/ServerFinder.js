ServerFinder = function ServerFinder (){}

ServerFinder.prototype.findServer = function (squad) {
  var servers = Server.getAllWaiting();

  return servers.filter(function(server){
    return this.canHaveSquad(squad, server);
  }.bind(this)).pop();
};

ServerFinder.prototype.canHaveSquad = function (squad, server) {
  return server.canFit(squad) &&
    server.stillTimeToJoin() &&
    ! server.hasSquadsFromSameCompany(squad);
};

ServerFinder.prototype.getNextServer = function (squad) {

  var servers = Server.getAll().filter(function(server){
    return ! server.isDown();
  });

  return servers.sort(function(serverA, serverB) {
    var serverAStart = serverA.getStartTimeLeft();
    var serverBStart = serverB.getStartTimeLeft();
    var serverACanFitSquad = squad ? serverA.canFit(squad) : true;
    var serverBCanFitSquad = squad ? serverB.canFit(squad) : true;

    //Server waiting
    if (serverACanFitSquad && serverAStart && serverAStart > 0 && (! serverBStart || serverAStart < serverBStart)) {
      return 1;
    }

    if (serverBCanFitSquad && serverBStart && serverBStart > 0 && (! serverAStart || serverBStart < serverAStart)) {
      return -1;
    }

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