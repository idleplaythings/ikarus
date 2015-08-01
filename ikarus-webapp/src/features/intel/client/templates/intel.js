Template.intel_intel.helpers({
  currentWeatherType: function() {
    return Intel.getCurrent().getCurrentWeather().type;
  },
  forecastWeatherType: function() {
    return Intel.getCurrent().getForecastWeather().type;
  },
  currentWindSpeed: function() {
    return Intel.getCurrent().getCurrentWeather().wind.windSpeed + 'm/s';
  },
  noChangeInWeather: function() {
    return Intel.getCurrent().getCurrentWeather().type === Intel.getCurrent().getForecastWeather().type;
  },
  currentMissionDateTimeType: function() {
    return Intel.getCurrent().getCurrentMissionDateTime().type;
  }
});
