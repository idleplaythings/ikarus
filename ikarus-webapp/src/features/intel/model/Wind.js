Wind = function(strength, easterly, northerly) {
  this.strength = strength;
  this.easterly = easterly;
  this.northerly = northerly;
}

Wind.CALM = 0.3;
Wind.BREEZE = 4;
Wind.MODERATE = 13;
Wind.STRONG = 20;
Wind.STORM = 25;

Wind.prototype.getWaveIntensity = function() {
  if (this.strength < 2) {
    return 0.2;
  }

  if (this.strength < 8) {
    return 0.4;
  }

  if (this.strength < 12) {
    return 0.6;
  }

  if (this.strength < 18) {
    return 0.8;
  }

  return 1.0;
}

Wind.random = function(min, max) {
  var strength = (min + Math.random() * (max - min)).toPrecision(2);
  var randomDirection = Math.random() * (Math.PI * 2);
  var easterlyComponent = (strength * Math.sin(randomDirection)).toPrecision(2);
  var northerlyComponent = (strength * Math.cos(randomDirection)).toPrecision(2);

  return new Wind(strength, easterlyComponent, northerlyComponent);
};