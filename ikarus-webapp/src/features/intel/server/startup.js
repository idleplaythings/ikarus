Meteor.startup(function() {
  var advanceTimeAndWeather = function() {
    Intel.getCurrent().advanceMissionIntel();
    Meteor.setTimeout(advanceTimeAndWeather, 1800000);
  };

  advanceTimeAndWeather();
});
