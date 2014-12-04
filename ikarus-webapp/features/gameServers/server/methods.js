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

    if (status == "idle"){
      dic.get('SquadOnServerService').removeSquadsFrom(server);
    }

    if (status == "playing"){
      dic.get('SquadOnServerService').lockSquadsOn(server);
    }

    return serverService.updateStatus(server, status);
  }
});