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

    if (status == Server.STATUS_IDLE){
      var players = Player.getAllByIds(server.playerIds);

      server.removePlayers();
      Squad.getAllByServer(server).map(function(squad) { squad.remove(); });
      players.forEach(function(player){
        var company = player.getCompany();

        if ( ! company)
          return;

        dic.get('InventoryRepository').returnItems(company, player);
      });

      dic.get('InventoryRepository').removeByServer(server);
    }

    server.updateStatus(status);
  }
});