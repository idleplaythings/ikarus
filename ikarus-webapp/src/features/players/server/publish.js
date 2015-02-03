Meteor.publish('UserData', function () {
  if (this.userId) {
    return Meteor.users.find({
      _id: this.userId
    }, {
      fields: {
        'services.steam': 1,
        'invites': 1,
        'companyId': 1,
        'steamId': 1,
        'uniform': 1,
        'vest': 1,
        'headgear': 1
      }
    });
  } else {
    this.ready();
    return;
  }
});

Meteor.publish('SearchPlayers', function(searchString) {

  var reg = new RegExp(searchString, 'i');

  return Meteor.users.find(
    {
      'services.steam.username': reg
    },
    {
      fields: {
        'services.steam': 1,
        'companyId': 1,
        'invites': 1
      },
      limit: 20
    });
});