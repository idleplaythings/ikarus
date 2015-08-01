Template.intel_intel.helpers({
  currentWeather: function() {
    return Intel.getCurrent().getCurrentWeather().type;
  },
  forecastWeather: function() {
    return Intel.getCurrent().getForecastWeather().type;
  },
  currentWindSpeed: function() {
    var currentWeather = Intel.getCurrent().getCurrentWeather();

    return currentWeather.wind.windSpeed + 'm/s';
  },
  noChangeInWeather: function() {
    return Intel.getCurrent().getCurrentWeather().type === Intel.getCurrent().getForecastWeather().type;
  },
  currentDateTime: function() {
    var dateTime = Intel.getCurrent().getCurrentDateTime();

    return dateTime.type;
  }
});
