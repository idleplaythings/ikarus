Meteor.publish('Intel', function () {
  // Monitors need access to full intel to see what weather is changing to
  var user = Meteor.users.findOne({_id: this.userId});
  if (get(user, 'serverId')) {
    return collections.IntelCollection.find({});
  }

  return collections.IntelCollection.find(
    {},
    {
      fields: {
        nextWeather: 0
      }
    }
  );
});
