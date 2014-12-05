Template.playerStatus.helpers({
  company: function() {
    return dic.get('CompanyService').getForCurrentPlayer();
  },

  squad: function() {
    return dic.get('SquadOnServerService').getSquadOnServerForCurrentPlayer();
  },
});

Template.squadStatus.helpers({
  squad: function() {
    return dic.get('CompanyService').getForCurrentPlayer();
  },

  server: function() {
    return dic.get('GameServerService').getServerById(this.serverId);
  },
});

Template.createOrJoinCompany.helpers({
  invites: function() {
    return [];
  }
});

Template.createOrJoinCompany.events({
  'click #create-company': function(event, template) {
    var name = template.find('#create-company-name').value.trim();

    // @todo does not belong here
    if (name.length < 5) {
      alert ("Squad name must be atleast 5 characters");
      return;
    }

    Meteor.call(
      'createCompany',
      name,
      function(error, result){
        console.log(error, result);
      }
    );
  }
});
