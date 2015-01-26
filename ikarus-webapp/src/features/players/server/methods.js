
Meteor.methods({
  playerConnected: function(serverName, playerUid){
    var server = Server.getByName(serverName);
    server.authenticateOrError();
    return dic.get('GameController').playerConnected(serverName, playerUid);
  },

  playerDisconnected: function(serverName, playerUid){
    var server = Server.getByName(serverName);
    server.authenticateOrError();
    dic.get('GameController').playerDisconnected(serverName, playerUid);
  }
});