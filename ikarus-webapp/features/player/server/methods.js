
Meteor.methods({
  playerConnected: function(serverId, playerUid){
    dic.get('GameService').playerConnected(serverId, playerUid);
  },

  playerDisconnected: function(serverId, playerUid){
    dic.get('GameService').playerConnected(serverId, playerUid);
  }
});