Meteor.methods({
  'registerServer': function(name) {
    var server = Server.getByName(name);
    console.log(name);
    if (!server) {
      Server.create(name);
    }
  },

  'updateServerStatus': function(name, status) {
    var server = Server.getByName(name);

    if (! server){
      throw new Meteor.Error(404, "server not found");
    }

    console.log("update server status",name,  status);

    if (status == Server.STATUS_IDLE){
      var players = Player.getAllByIds(server.playerIds);

      server.removePlayers();
      Squad.getAllByServer(server).forEach(function(squad) {
        Inventory.returnItems(Company.getById(squad.getCompanyId()), squad);
        squad.remove();
        Inventory.removeByServer(server);
      })
    }

    server.updateStatus(status);
  }
});