Template.companies_status.created = function () {
  Meteor.subscribe('Users');
  Meteor.subscribe('Companies');
};

Template.companies_status.helpers({
  company: function () {
    return Company.getById(this.companyId);
  },
  ownCompany: function () {
    var player = Player.getCurrent();

    if (player) {
      var company = Company.getById(this.companyId);
      return player.isMemberOf(company);
    }

    return false;
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

      Meteor.call(
        'leaveCompany',
        player.getSteamId(),
        company._id,
        function (error, result) {
          if (error) {
            alert(error)
          }
        });
    }
  },
  'click .js-invite-to-company': function(event, template) {
    var player = Player.getCurrent();
    var company = Company.getByPlayer(player);

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

