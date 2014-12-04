Meteor.methods({
  'registerGameServer': function(name) {
    return dic.get('GameServerService').registerServer(name);
  },

  'updateServerStatus': function(name, status) {
    var serverService = dic.get('GameServerService');
    var server = serverService.getServerByName(name);

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