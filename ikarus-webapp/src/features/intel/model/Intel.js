Intel = function Intel(args) {
  this._id = args._id || undefined;
}

Intel.prototype.getCurrentMissionDateTime = function() {
  return MissionDateTime.fromDoc(get(this.getDoc(), 'dateTime'));
};

Intel.prototype.getCurrentWeather = function() {
  return Weather.fromDoc(get(this.getDoc(), 'currentWeather'));
};

Intel.prototype.getForecastWeather = function() {
  return Weather.fromDoc(get(this.getDoc(), 'forecast'));
};

Intel.prototype.getNextWeather = function() {
  return Weather.fromDoc(get(this.getDoc(), 'nextWeather'));
};

Intel.prototype.getDoc = function() {
  return collections.IntelCollection.findOne({ _id: this._id });
};

Intel.prototype.setCurrentWeather = function(currentWeather) {
  collections.IntelCollection.update({ _id: this._id }, { $set: { currentWeather: currentWeather }});
};

Intel.prototype.setNextWeather = function(nextWeather) {
  collections.IntelCollection.update({ _id: this._id }, { $set: { nextWeather: nextWeather }});
};

Intel.prototype.setForecast = function(forecast) {
  collections.IntelCollection.update({ _id: this._id }, { $set: { forecast: forecast }});
};

Intel.prototype.setMissionDateTime = function(dateTime) {
  collections.IntelCollection.update({ _id: this._id }, { $set: { dateTime: dateTime }});
};

Intel.prototype.changeWeather = function() {
  var currentWeather = this.getNextWeather();
  this.setCurrentWeather(currentWeather);

  var nextWeather = currentWeather.change();
  this.setNextWeather(nextWeather);

  var forecast = currentWeather.forecast();
  this.setForecast(forecast);
};

Intel.prototype.advanceTime = function() {
  var currentMissionDateTime = this.getCurrentMissionDateTime();
  var newMissionDateTime = currentMissionDateTime.advance();

  this.setMissionDateTime(newMissionDateTime);
};

Intel.getCurrent = function() {
  var doc = collections.IntelCollection.findOne();

  if (!doc) {
    var intel = Intel.fromDoc({ _id: collections.IntelCollection.insert({}) });
    var weather = Weather.getRandom();

    intel.setCurrentWeather(weather);
    intel.setForecast(weather.forecast());
    intel.setNextWeather(weather.change());

    var time = MissionDateTime.getRandom();
    intel.setMissionDateTime(time);

    return intel;
  }

  return Intel.fromDoc(doc);
}

Intel.fromDoc = function(doc) {
  return new Intel(doc);
}
