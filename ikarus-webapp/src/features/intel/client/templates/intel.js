Template.intel_intel.helpers({
  currentWeather: function() {
    return Intel.getCurrent().getCurrentWeather().type;
  },
  forecastWeather: function() {
    return Intel.getCurrent().getForecastWeather().type;
  },
  nextWeather: function() {
    return Intel.getCurrent().getNextWeather().type;
  },
  currentDateTime: function() {
    var dateTime = Intel.getCurrent().getCurrentDateTime();

    return dateTime.type;
  },
  currentWindSpeed: function() {
    var currentWeather = Intel.getCurrent().getCurrentWeather();

    return currentWeather.wind.strength + 'm/s';
  },
  noChangeInWeather: function() {
    return Intel.getCurrent().getCurrentWeather().type === Intel.getCurrent().getForecastWeather().type;
  }
})