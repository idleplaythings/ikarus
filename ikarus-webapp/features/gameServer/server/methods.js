Meteor.methods({
  'registerGameServer': function(name) {
    var repo = dic.get('GameServerRepository');

    var server = repo.getByName(name);

    if (!server) {
      repo.create(name);
    }
  },

  'updateServerStatus': function(name, status) {
    var repo = dic.get('GameServerRepository');

    var server = repo.getByName(name);

    if (! server){
      throw new Meteor.Error(404, "server not found");
    }

    if (status == GameServer.STATUS_IDLE){
      dic.get('SquadRepository').removeSquadsFromServer(server);
    }

    if (status === GameServer.STATUS_PLAYING) {
      dic.get('SquadRepository').lockSquadsOnServer(server);
    }

    return serverService.updateStatus(server, status);
  }
});