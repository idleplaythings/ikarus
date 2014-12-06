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
      dic.get('SquadRepository').removeSquadsFromServer(server);
    }

    if (status === Server.STATUS_PLAYING) {
      dic.get('SquadRepository').lockSquadsOnServer(server);
    }

    return serverService.updateStatus(server, status);
  }
});