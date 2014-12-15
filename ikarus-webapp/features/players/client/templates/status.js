Template.players_status.helpers({
  player: function() {
    var player = dic.get('PlayerRepository').getCurrent();

    if (!player) {
      return null;
    }

    return player;
  }
});
