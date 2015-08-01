
Weather = function Weather(args) {
  if (args) {
    this.overcast = args.overcast;
    this.fog = args.fog;
    this.rain = args.rain;
    this.lightnings = args.lightnings;
    this.wind = {
      windSpeed: args.wind.windSpeed,
      easterly: args.wind.easterly,
      northerly: args.wind.northerly
    };
    this.waves = args.waves;
  } else {
    this.init();
  }
}

Weather.prototype.change = function() {
  return this.forecast();
};

Weather.prototype.forecast = function() {
  var forecast = this.getForecast();

  var randomValue = Math.random();
  var nextWeather = null;

  forecast.reduce(function(prev, current) {
    if (!nextWeather && randomValue <= prev + current.probability) {
      nextWeather = current.weather;
    }

    return prev + current.probability;
  }, 0);

  return new nextWeather();
};

Weather.fromDoc = function(doc) {
  switch (doc.type) {
    case 'Clear':
      return new ClearWeather(doc);
    case 'Cloudy':
      return new CloudyWeather(doc);
    case 'Rainy':
      return new RainyWeather(doc);
    case 'Stormy':
      return new StormyWeather(doc);
    case 'Foggy':
      return new FoggyWeather(doc);
  }
};

Weather.getRandom = function() {
  var weathers = [ClearWeather, CloudyWeather, RainyWeather, StormyWeather, FoggyWeather];
  return new weathers[Math.floor(Math.random() * weathers.length)]();
};

ClearWeather = function(args) {
  this.type = 'Clear';
  Weather.call(this, args);
}

ClearWeather.prototype = Object.create(Weather.prototype);

ClearWeather.prototype.init = function() {
  this.overcast = (Math.random() * 0.2).toPrecision(1);
  this.fog = '0.0';
  this.rain = '0.0';
  this.lightnings = '0.0';
  this.wind = Wind.random(Wind.CALM, Wind.STRONG);
  this.waves = this.wind.getWaveIntensity();
};

ClearWeather.prototype.getForecast = function() {
  return [
    { weather: ClearWeather,  probability: 0.6 },
    { weather: CloudyWeather, probability: 0.2 },
    { weather: RainyWeather,  probability: 0.05 },
    { weather: StormyWeather, probability: 0.05 },
    { weather: FoggyWeather,  probability: 0.1 }
  ];
};

CloudyWeather = function(args) {
  this.type = 'Cloudy';
  Weather.call(this, args);
}

CloudyWeather.prototype = Object.create(Weather.prototype);

CloudyWeather.prototype.init = function() {
  this.overcast = (0.3 + Math.random() * 0.3).toPrecision(2);
  this.fog = (0.3 + Math.random() * 0.3).toPrecision(2);
  this.rain = '0.0';
  this.lightnings = '0.0';
  this.wind = Wind.random(Wind.CALM, Wind.STRONG);
  this.waves = this.wind.getWaveIntensity();
};

CloudyWeather.prototype.getForecast = function() {
  return [
    { weather: ClearWeather,  probability: 0.05 },
    { weather: CloudyWeather, probability: 0.5 },
    { weather: RainyWeather,  probability: 0.4 },
    { weather: StormyWeather, probability: 0.05 },
    { weather: FoggyWeather,  probability: 0.0 }
  ];
};

RainyWeather = function(args) {
  this.type = 'Rainy';
  Weather.call(this, args);
}

RainyWeather.prototype = Object.create(Weather.prototype);

RainyWeather.prototype.init = function() {
  this.overcast = (0.8 + Math.random() * 0.2).toPrecision(2);
  this.fog = (0.5 + Math.random() * 0.2).toPrecision(2);
  this.rain = (0.7 + Math.random() * 0.2).toPrecision(2);
  this.lightnings = '0.0';
  this.wind = Wind.random(Wind.BREEZE, Wind.STRONG);
  this.waves = this.wind.getWaveIntensity();
};

RainyWeather.prototype.getForecast = function() {
  return [
    { weather: ClearWeather,  probability: 0.4 },
    { weather: CloudyWeather, probability: 0.1 },
    { weather: RainyWeather,  probability: 0.3 },
    { weather: StormyWeather, probability: 0.2 },
    { weather: FoggyWeather,  probability: 0.0 }
  ];
};

StormyWeather = function(args) {
  this.type = 'Stormy';
  Weather.call(this, args);
}

StormyWeather.prototype = Object.create(Weather.prototype);

StormyWeather.prototype.init = function() {
  this.overcast = '1.0';
  this.fog = '0.5';
  this.rain = '1.0';
  this.lightnings = '1.0';
  this.wind = Wind.random(Wind.STRONG, Wind.STORM);
  this.waves = this.wind.getWaveIntensity();
};

StormyWeather.prototype.getForecast = function() {
  return [
    { weather: ClearWeather,  probability: 0.5 },
    { weather: CloudyWeather, probability: 0.1 },
    { weather: RainyWeather,  probability: 0.0 },
    { weather: StormyWeather, probability: 0.4 },
    { weather: FoggyWeather,  probability: 0.0 }
  ];
};

FoggyWeather = function(args) {
  this.type = 'Foggy';
  Weather.call(this, args);
}

FoggyWeather.prototype = Object.create(Weather.prototype);

FoggyWeather.prototype.init = function() {
  this.overcast = (0.3 + Math.random() * 0.3).toPrecision(2);
  this.fog = (0.7 + Math.random() * 0.2).toPrecision(2);
  this.rain = '0.0';
  this.lightnings = '0.0';
  this.wind = Wind.random(Wind.CALM, Wind.CALM);
  this.waves = this.wind.getWaveIntensity();
};

FoggyWeather.prototype.getForecast = function() {
  return [
    { weather: ClearWeather,  probability: 0.3 },
    { weather: CloudyWeather, probability: 0.0 },
    { weather: RainyWeather,  probability: 0.0 },
    { weather: StormyWeather, probability: 0.0 },
    { weather: FoggyWeather,  probability: 0.7 }
  ];
};
