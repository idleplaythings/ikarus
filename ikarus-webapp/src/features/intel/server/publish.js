Meteor.publish('Intel', function () {
  return collections.IntelCollection.find(
    {},
    {
      fields: {
        nextWeather: 0
      }
    }
  );
});
