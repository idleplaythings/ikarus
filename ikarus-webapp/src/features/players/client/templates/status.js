Template.players_status.helpers({
  player: function() {
    return Player.getCurrent();
  },
  company: function() {
    return Player.getCurrent().getCompany();
  }
});

Template.players_status.events({
  'click .login': function (event, template) {
    Meteor.loginWithSteam();
  },
  'click .logout': function (event, template) {
    Meteor.logout();
  }
});

