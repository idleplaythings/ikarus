Template.companies_list.created = function () {
  Meteor.subscribe('Companies');
};


Template.companies_list.helpers({
  companies: function() {
    return Company.getAll();
  },
});