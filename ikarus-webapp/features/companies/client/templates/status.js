Template.companies_status.helpers({
  companyName: function() {
    var player = Player.getCurrent();

    if (!player) {
      return null;
    }

    var company = player.getCompany();

    if (!company) {
      return null;
    }

    return company.getName();
  },
  company: function() {
    var player = Player.getCurrent();

    if (!player) {
      return null;
    }

    var company = player.getCompany();

    if (!company) {
      return null;
    }

    return company;
  },
  players: function() {
    var player = Player.getCurrent();

    if (!player) {
      return null;
    }

    var company = player.getCompany();

    if (!company) {
      return null;
    }

    return company.getPlayers();
  },
  invites: function() {
    var player = Player.getCurrent();

    if (!player) {
      return null;
    }

    return player.invites;
  }
});

Template.companies_status.events({
  'click .js-rename-company': function(event, template) {
    var newName = prompt('New name?');
    console.log('rename to', newName);
  },
  'click .js-leave-company': function(event, template) {
    if (confirm('Are you sure?')) {
      var player = Player.getCurrent();
      var company = player.getCompany();

      Meteor.call('leaveCompany', player.getSteamId(), company._id);
    }
  },
  'click .js-create-company': function(event, template) {
    var name = template.find('.js-company-name').value.trim();

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
  'click .js-join-company' : function(event, template) {
    var player = Player.getCurrent();
    var companyId = jQuery(event.target).attr("data-companyId");

    Meteor.call(
      'joinCompany',
      player.getSteamId(),
      companyId,
      function(error, result){
        console.log(error, result);
      }
    );
  },
'click .js-invite-to-company': function(event, template) {
    var player = dic.get('PlayerRepository').getCurrent();
    var company = dic.get('CompanyRepository').getByPlayer(player);

    var name = prompt("Player's Steam name?");

    Meteor.call(
      'inviteToCompany',
      name,
      company._id,
      function(error, result){
        if (error){
          alert(error.message);
        } else {
          alert(name + " invited to your company");
        }
      }
    );
  }
});

