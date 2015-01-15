Meteor.startup(function(){
  if (get(Meteor, 'settings.public.mode') !== 'dev' && Meteor.isServer) {
    dic.get('ServerQueueService').start();
  }
});

var loopDelay = 1000;

ServerQueueService = function ServerQueueService(){
  this._started = false;
}

ServerQueueService.prototype.start = function() {
  if (this._started) {
    throw new Error('Can not start ServerQueueService twice');
  }

  this.loop();
};

ServerQueueService.prototype.loop = function() {

  this.checkSquadDeadlines();

  Meteor.setTimeout(this.loop.bind(this), loopDelay);
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

ServerQueueService.prototype.enterQueue = function(squad) {
  var server = this._findServerForSquad(squad);
  if (server.isWaiting()) {
    this._addSquadToGame(squad, server);
  } else {
    server.addToQueue(squad);
  }
};

ServerQueueService.prototype.leaveQueue = function(squad) {
  var server = Server.getByQueuingSquad(squad);
  if (server) {
    server.removeSquadFromQueue(squad);
  }
};

ServerQueueService.prototype._addNewSquadsToQueue = function() {
  Squads.getNewInQueue().forEach(this._findServerForSquad);
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

