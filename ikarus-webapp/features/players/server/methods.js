
Meteor.methods({
  playerConnected: function(serverName, playerUid){
    dic.get('GameController').playerConnected(serverName, playerUid);
  },

  playerDisconnected: function(serverName, playerUid){
    dic.get('GameController').playerDisconnected(serverName, playerUid);
  }
});