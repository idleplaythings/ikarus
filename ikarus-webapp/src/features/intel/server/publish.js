Meteor.publish('Intel', function () {
  // Monitors need access to full intel to see what weather is changing to
  if (get(Meteor.user(), 'serverId')) {
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
