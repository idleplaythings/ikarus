
Meteor.methods({
  playerConnected: function(serverId, playerUid){
    dic.get('GameController').playerConnected(serverId, playerUid);
  },

  playerDisconnected: function(serverId, playerUid){
    dic.get('GameController').playerConnected(serverId, playerUid);
  }
});