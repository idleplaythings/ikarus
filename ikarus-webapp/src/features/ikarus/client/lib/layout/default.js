Template.ikarus_default.created = function() {
  Meteor.subscribe('MyCompanyAndSquads');
};

Template.ikarus_default.helpers({
  noSteamConfigured: function() {
    return Accounts.loginServiceConfiguration.find({ service: 'steam' }).count() === 0;
  }
});

Template.ikarus_default.events({
  'click .js-reset': function() {
    Meteor.call('testing_removeFixtures');
    Meteor.call('testing_createDataSet');
  }
})
