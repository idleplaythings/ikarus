Meteor.methods({
  shouldNotify: function() {
    var player = Player.getCurrent();

    if (! player) {
      return false;
    }

    if (player && Server.getAllByPlayer(player).length > 0) {
      return false;
    }

    var squad = Squad.getCurrent();
    if (squad) {
      var server = Server.getByInGameSquad(squad);
      if (server && server.isWaiting()) {
        return false;
      }
    }

    var lastNotification = player.getLastNotificationTime();
    var notificationExpiration = null;

    if (lastNotification) {
      notificationExpiration = lastNotification.clone();
      notificationExpiration.add(5, 'seconds');
    }

    if (notificationExpiration !== null && (notificationExpiration.isAfter(moment()) || notificationExpiration.isSame(moment()))) {
      return false;
    }

    //This updates the time to now only if time is lastNotification
    //If lastNotification has changed, then other fiber has already notfied during this method call.
    var result = player.updateLastNotificationTime(lastNotification);

    return Boolean(result);
  }
});