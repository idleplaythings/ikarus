Template.home.onCreated(function() {
  this.subscribe('MySquad');
  this.subscribe('Users');
});

Template.home.helpers({
  playerListContext: function() {
    return {
      getPlayers: function() {
        return Player.getAll();
      }
    }
  }
});
