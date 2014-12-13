Template.playerStatus.helpers({
  company: function() {
    var player = dic.get('PlayerRepository').getCurrent();
    return dic.get('CompanyRepository').getByPlayer(player);
  },

  squad: function() {
    var player = dic.get('PlayerRepository').getCurrent();
    return dic.get('SquadRepository').getByPlayer(player);
  },
});

Template.squadStatus.helpers({
  squad: function() {
    var player = dic.get('PlayerRepository').getCurrent();
    return dic.get('SquadRepository').getByPlayer(player);
  },

  server: function() {
    return dic.get('ServerRepository').getById(this.serverId);
  },
});

Template.createOrJoinCompany.helpers({
  invites: function() {
    return dic.get('PlayerRepository').getCurrent().invites;
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
  },

  'click .join-company' : function(event, template) {
    var companyId = jQuery(event.target).attr("data-companyId");

    Meteor.call(
      'joinCompany',
      companyId,
      function(error, result){
        console.log(error, result);
      }
    );
  }
});
