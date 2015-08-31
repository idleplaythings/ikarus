Template.players_company.helpers({
  invites: function() {
    var player = Player.getCurrent();

    if (!player) {
        return null;
    }

    return player.getInvites();
  }
});

Template.players_company.events({
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
            alert(error);
        }
        template.subscribe('MyCompanyAndSquads');
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
          alert(error);
        }
        template.subscribe('MyCompanyAndSquads');
      }
    );
  }
});
