Meteor.methods({
  'registerServer': function(name) {
    var repo = dic.get('ServerRepository');

    var server = repo.getByName(name);

    if (!server) {
      repo.create(name);
    }
  },

  'updateServerStatus': function(name, status) {
    var repo = dic.get('ServerRepository');

    var server = repo.getByName(name);

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
    repo.persist(server);
  }
});