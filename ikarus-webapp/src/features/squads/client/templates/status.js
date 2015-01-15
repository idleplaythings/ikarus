Template.squads_status.helpers({
  companyHasSquad: function () {
    return getCompanysSquads().length > 0;
  },

  companysSquads: function () {
    return getCompanysSquads();
  }
});

Template.squads_status.events({
  'click .createSquad' : function () {
    Meteor.call('createSquad');
  },
  'click .joinSquad' : function () {
    Meteor.call('joinSquad');
  },
});

function getCompanysSquads () {
  var company = Company.getCurrent();

  if (! company) {
    return [];
  }

  return Squad.getByCompany(company);
}