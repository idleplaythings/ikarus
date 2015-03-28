Template.companies_list.onCreated(function () {
  Meteor.subscribe('Companies');
});

Template.companies_list.helpers({
  companies: function() {
    return Company.getAll();
  },
});