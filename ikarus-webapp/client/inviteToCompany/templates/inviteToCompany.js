Template.inviteToCompany.events({
  'click #invite-to-company': function(event, template){
    var name = template.find('#invite-to-company-name').value;

    Meteor.call(
      'inviteToCompany',
      name,
      function(error, result){
        if (error){
          alert(error.message);
        } else {
          alert(name + " invited to your company");
        }
      }
    );
  }
})