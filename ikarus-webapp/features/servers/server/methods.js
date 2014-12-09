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
      var players = dic.get('PlayerRepository').getAllByIds(server.playerIds);

      server.removePlayers();
      dic.get('SquadRepository').removeSquadsFromServer(server);
      players.forEach(function(player){
        var company = dic.get('CompanyRepository').getByPlayer(player);

        if ( ! company)
          return;

        dic.get('InventoryRepository').returnItems(company, player);
      });

      dic.get('InventoryRepository').removeByServer(server);
    }

    if (status === Server.STATUS_PLAYING) {
      dic.get('SquadRepository').lockSquadsOnServer(server);
      dic.get('InventoryRepository').lockByServer(server);
    }

    server.updateStatus(status);
    repo.persist(server);
  }
});