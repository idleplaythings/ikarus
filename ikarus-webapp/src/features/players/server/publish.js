Meteor.publish('UserData', function() {
  if (this.userId) {
    return Meteor.users.find({
      _id: this.userId
    }, {
      fields: {
        'services.steam': 1,
        'invites': 1,
        'companyId': 1,
        'steamId': 1
      }
    });
  } else {
    this.ready();
    return;
  }
});