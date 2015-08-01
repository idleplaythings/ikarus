Wind = function(windSpeed, easterly, northerly) {
  this.windSpeed = windSpeed;
  this.easterly = easterly;
  this.northerly = northerly;
}

Wind.CALM = 0.3;
Wind.BREEZE = 4;
Wind.MODERATE = 13;
Wind.STRONG = 20;
Wind.STORM = 25;

Wind.prototype.getWaveIntensity = function() {
  if (this.windSpeed < 2) {
    return 0.2;
  }

  if (this.windSpeed < 8) {
    return 0.4;
  }

  if (this.windSpeed < 12) {
    return 0.6;
  }

  if (this.windSpeed < 18) {
    return 0.8;
  }

  return 1.0;
};

Wind.random = function(min, max) {
  var windSpeed = (min + Math.random() * (max - min)).toPrecision(2);
  var randomDirection = Math.random() * (Math.PI * 2);
  var easterlyComponent = (windSpeed * Math.sin(randomDirection)).toPrecision(2);
  var northerlyComponent = (windSpeed * Math.cos(randomDirection)).toPrecision(2);

  return new Wind(windSpeed, easterlyComponent, northerlyComponent);
};