
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

Weather.prototype.change = function(missionDateTime) {
  return this.forecast(missionDateTime);
};

Weather.prototype.forecast = function(missionDateTime) {
  var forecast = this.getForecast(missionDateTime);

  var randomValue = Math.random();
  var nextWeather = null;

  // Normalise next weather weights
  var totalWeight = forecast.reduce(function(prev, current) {
    return prev + current.weight;
  }, 0);

  forecast.reduce(function(prev, current) {
    var probability = current.weight / totalWeight;

    if (!nextWeather && randomValue <= prev + probability) {
      nextWeather = current.weather;
    }

    return prev + probability;
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

ClearWeather.prototype.getForecast = function(missionDateTime) {
  if (dark(missionDateTime)) {
    return [
      { weather: FoggyWeather,  weight: 10 }
    ];
  }

  return [
    { weather: ClearWeather,  weight: 60 },
    { weather: CloudyWeather, weight: 20 },
    { weather: RainyWeather,  weight: 5 },
    { weather: StormyWeather, weight: 5 },
    { weather: FoggyWeather,  weight: 10 }
  ];
};

CloudyWeather = function(args) {
  this.type = 'Cloudy';
  Weather.call(this, args);
}

CloudyWeather.prototype = Object.create(Weather.prototype);

CloudyWeather.prototype.init = function() {
  this.overcast = (0.3 + Math.random() * 0.3).toPrecision(2);
  this.fog = (Math.random() * 0.6).toPrecision(2);
  this.rain = '0.0';
  this.lightnings = '0.0';
  this.wind = Wind.random(Wind.CALM, Wind.STRONG);
  this.waves = this.wind.getWaveIntensity();
};

CloudyWeather.prototype.getForecast = function(missionDateTime) {
  if (dark(missionDateTime)) {
    return [
      { weather: FoggyWeather,  weight: 10 }
    ];
  }

  return [
    { weather: ClearWeather,  weight: 5 },
    { weather: CloudyWeather, weight: 50 },
    { weather: RainyWeather,  weight: 40 },
    { weather: StormyWeather, weight: 5 },
    { weather: FoggyWeather,  weight: 0 }
  ];
};

RainyWeather = function(args) {
  this.type = 'Rainy';
  Weather.call(this, args);
}

RainyWeather.prototype = Object.create(Weather.prototype);

RainyWeather.prototype.init = function() {
  this.overcast = (0.8 + Math.random() * 0.2).toPrecision(2);
  this.fog = (0.2 + Math.random() * 0.5).toPrecision(2);
  this.rain = (0.7 + Math.random() * 0.2).toPrecision(2);
  this.lightnings = '0.0';
  this.wind = Wind.random(Wind.BREEZE, Wind.STRONG);
  this.waves = this.wind.getWaveIntensity();
};

RainyWeather.prototype.getForecast = function(missionDateTime) {
  if (dark(missionDateTime)) {
    return [
      { weather: FoggyWeather,  weight: 10 }
    ];
  }

  return [
    { weather: ClearWeather,  weight: 40 },
    { weather: CloudyWeather, weight: 10 },
    { weather: RainyWeather,  weight: 30 },
    { weather: StormyWeather, weight: 20 },
    { weather: FoggyWeather,  weight: 0 }
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

StormyWeather.prototype.getForecast = function(missionDateTime) {
  if (dark(missionDateTime)) {
    return [
      { weather: FoggyWeather,  weight: 10 }
    ];
  }

  return [
    { weather: ClearWeather,  weight: 50 },
    { weather: CloudyWeather, weight: 10 },
    { weather: RainyWeather,  weight: 0 },
    { weather: StormyWeather, weight: 40 },
    { weather: FoggyWeather,  weight: 0 }
  ];
};

FoggyWeather = function(args) {
  this.type = 'Foggy';
  Weather.call(this, args);
}

FoggyWeather.prototype = Object.create(Weather.prototype);

FoggyWeather.prototype.init = function() {
  this.overcast = (0.3 + Math.random() * 0.3).toPrecision(2);
  this.fog = (0.7 + Math.random() * 0.3).toPrecision(2);
  this.rain = '0.0';
  this.lightnings = '0.0';
  this.wind = Wind.random(0, Wind.CALM);
  this.waves = this.wind.getWaveIntensity();
};

FoggyWeather.prototype.getForecast = function(missionDateTime) {
  if (dark(missionDateTime)) {
    return [
      { weather: FoggyWeather,  weight: 10 }
    ];
  }

  return [
    { weather: ClearWeather,  weight: 70 },
    { weather: CloudyWeather, weight: 0 },
    { weather: RainyWeather,  weight: 0 },
    { weather: StormyWeather, weight: 0 },
    { weather: FoggyWeather,  weight: 30 }
  ];
};

function dark(missionDateTime) {
  return missionDateTime instanceof Evening ||
         missionDateTime instanceof Night;
}