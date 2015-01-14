Meteor.methods({
  'lockSquads' : function(serverName) {
    var server = Server.getByName(serverName);

    if (! server) {
      throw new Meteor.Error(404, 'Server not found');
    }

    Inventory.lockByServer(server);
    Squad.getAllByServer(server).map(function(squad) { squad.lock(); });
  }

});
