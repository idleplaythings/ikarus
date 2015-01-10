Template.helpers({
  squad: function() {
    var player = Player.getCurrent();

    if (!player) {
      return null;
    }

    var squad = player.getSquad();

    if (!squad) {
      return null;
    }

    return squad;
  }
});