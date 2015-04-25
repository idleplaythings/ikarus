Template.ikarus_default.onCreated(function() {
  this.subscribe('UserData');
  this.subscribe('MyCompanyAndSquads');
  this.subscribe('Servers');
});

Template.ikarus_default.helpers({
  noSteamConfigured: function() {
    return Accounts.loginServiceConfiguration.find({ service: 'steam' }).count() === 0;
  },

  gamesActive: function () {
    return Server.getAllPlaying().length;
  }
});

Template.ikarus_default.events({
  'click .js-reset': function() {
    Meteor.call('testing_removeFixtures');
    Meteor.call('testing_createDataSet');
  }
})
