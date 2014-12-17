Template.squads_status.helpers({
  squad: function() {
    var player = dic.get('PlayerRepository').getCurrent();

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