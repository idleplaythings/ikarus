Meteor.methods({
  'changeStartingLocation': function(squadId, location) {
    var player = Player.getCurrent();
    var squad = Squad.getByPlayer(player);

    if (!squad || squad._id !== squadId) {
      throw new Meteor.Error(404, 'Squad on server not found');
    }

    if (squad.isLocked()) {
      return;
    }

    squad.setStartingLocation(location);
  },

  'lockSquads' : function(serverName) {
    var server = Server.getByName(serverName);

    if (! server) {
      throw new Meteor.Error(404, 'Server not found');
    }

    dic.get('InventoryRepository').lockByServer(server);
    Squad.getAllByServer(server).map(function(squad) { squad.lock(); });
  }

});
