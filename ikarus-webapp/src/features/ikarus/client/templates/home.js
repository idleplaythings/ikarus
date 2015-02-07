Template.home.created = function() {
  Meteor.subscribe('MySquad');
  Meteor.subscribe('Users');
};

Template.home.helpers({
  playerListContext: function() {
    return {
      getPlayers: function() {
        return Player.getAll();
      }
    }
  }
});
