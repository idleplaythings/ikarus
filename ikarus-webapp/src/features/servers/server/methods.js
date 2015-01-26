Meteor.methods({
  'updateServerDetails': function(name, details) {
    var server = Server.getByName(name);
    server.authenticateOrError();

    if (! server){
      throw new Meteor.Error(404, "server not found");
    }

    server.updateDetails(details);
  },

  'updateServerStatus': function(name, status) {
    var server = Server.getByName(name);
    server.authenticateOrError();

    if (! server){
      throw new Meteor.Error(404, "server not found");
    }

    console.log("update server status",name,  status);

    if (status == Server.STATUS_IDLE || status == Server.STATUS_DOWN){

      if (server.getStatus() == Server.STATUS_WAITING) {
        server.getSquadsInGame().forEach(function(squad) {
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
    }

    server.updateStatus(status);
    dic.get('ServerQueueService').serverStatusChanged(server);
  }
});