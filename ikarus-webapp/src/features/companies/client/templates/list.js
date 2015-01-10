Template.companies_list.created = function () {
  Tracker.autorun(function () {
    Meteor.subscribe('Companies');
  });
};


Template.companies_list.helpers({
  companies: function() {
    return Company.getAll();
  },
});

Template.companies_list.events({
  'click .js-request-invite': function(event, template) {
    Meteor.call(
      'inviteToCompany',
      Player.getCurrent().getName(),
      jQuery(event.target).data('companyId'),
      function(error, result) {
        console.log(error, result);
      }
    );
  }
})