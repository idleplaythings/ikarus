
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
  },

  playerKilled: function (serverName, victimUid, killerUid, killerWeapon, position) {
    var server = Server.getByName(serverName);
    server.authenticateOrError();

    if (server.getStatus() != Server.STATUS_PLAYING) {
      return;
    }

    var gameId = server.getGameId();
    var victim = Player.getById(victimUid);
    var victimCompany = Company.getByPlayer(victim);
    var killer = Player.getById(killerUid);
    var killerCompany = Company.getByPlayer(killer);

    if (! gameId || ! victim || ! victimCompany) {
      return;
    }

    PlayerDeathGameEvent.create(gameId, victimCompany._id, position, victimUid, killerUid, killerWeapon);

    if (killer && killerCompany) {
      PlayerDeathGameEvent.create(gameId, killerCompany._id, position, victimUid, killerUid, killerWeapon);
    }
  },

  setPlayerReady: function(ready) {
    var player = Player.getCurrent();
    player.setReady(ready);
  }
});