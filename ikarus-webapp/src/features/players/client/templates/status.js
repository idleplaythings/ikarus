Template.players_status.helpers({
  player: function() {
    return Player.getCurrent();
  },
  company: function() {
    return Player.getCurrent().getCompany();
  },
  invites: function() {
    var player = Player.getCurrent();

    if (!player) {
      return null;
    }

    return player.getInvites();
  }
});

Template.players_status.events({
  'click .login': function (event, template) {
    Meteor.loginWithSteam();
  },
  'click .logout': function (event, template) {
    Meteor.logout();
  },
  'click .js-create-company': function(event, template) {
    var name = prompt('Name of the company?');

    // @todo does not belong here
    if (name.length < 5) {
      alert ("Squad name must be atleast 5 characters");
      return;
    }

    Meteor.call(
      'createCompany',
      name,
      function (error, result) {
        if (error) {
          alert(error)
        }
      }
    );
  },
  'click .js-join-company' : function(event, template) {
    var player = Player.getCurrent();
    var companyId = jQuery(event.target).attr("data-companyId");

    Meteor.call(
      'joinCompany',
      player.getSteamId(),
      companyId,
      function (error, result) {
        if (error) {
          alert(error)
        }
      }
    );
  },
});
