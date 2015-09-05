
timeAndWeather_setWeather = {
  private ["_weather", "_overcast", "_fog", "_rain", "_lightnings", "_eastWind", "_northWind", "_waves"];

  _weather = _this select 0;
  _overcast = parseNumber (_weather select 0);
  _fog = parseNumber (_weather select 1);
  _rain = parseNumber (_weather select 2);
  _lightnings = parseNumber (_weather select 3);
  _eastWind = parseNumber (_weather select 4);
  _northWind = parseNumber (_weather select 5);
  _waves = parseNumber (_weather select 6);

  diag_log "FOG IS " + (str _fog);
  systemChat (str _fog);
  skiptime -24;
  86400 setOvercast _overcast;
  //86400 setFog _fog;
  86400 setFog 0;
  86400 setRain _rain;
  86400 setLightnings _lightnings;
  skipTime 24; 
  0 = [] spawn {
    sleep 0.1;

    simulWeatherSync;
  };

  // Third parameter makes wind constant if set true.
  setWind [_eastWind, _northWind, false];

  0 setWaves _waves;
};

timeAndWeather_setNextWeather = {
  private ["_weather", "_overcast", "_fog", "_rain", "_lightnings", "_eastWind", "_northWind", "_waves"];

  _weather = _this select 0;
  diag_log ("WEATHER " + (str _weather));
  systemChat ("WEATHER " + (str _weather));
  _overcast = parseNumber (_weather select 0);
  _fog = parseNumber (_weather select 1);
  _rain = parseNumber (_weather select 2);
  _lightnings = parseNumber (_weather select 3);
  _eastWind = parseNumber (_weather select 4);
  _northWind = parseNumber (_weather select 5);
  _waves = parseNumber (_weather select 6);

  600 setOvercast _overcast;
  //600 setFog _fog;
  diag_log ("FORECAST FOG IS " + (str _fog));
  systemChat ("FORECAST FOG IS " + (str _fog));
  600 setFog 0;
  600 setRain _rain;
  600 setLightnings _lightnings;

  // Third parameter makes wind constant if set true.
  setWind [_eastWind, _northWind, false];

  3600 setWaves _waves;
};

timeAndWeather_setDateTime = {
  private [ "_year", "_month", "_day", "_hour", "_minute" ];

  _dateTime = _this select 0;
  _year = parseNumber (_dateTime select 0);
  _month = parseNumber (_dateTime select 1);
  _day = parseNumber (_dateTime select 2);
  _hour = parseNumber (_dateTime select 3);
  _minute = parseNumber (_dateTime select 4);

  setDate [_year, _month, _day, _hour, _minute];
};
