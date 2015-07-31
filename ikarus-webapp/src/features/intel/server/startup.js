Meteor.startup(function() {
  var advanceTimeAndWeather = function() {
    Intel.getCurrent().advanceTime();
    Intel.getCurrent().changeWeather();
    Meteor.setTimeout(advanceTimeAndWeather, 1800000);
  };

  advanceTimeAndWeather();
});
