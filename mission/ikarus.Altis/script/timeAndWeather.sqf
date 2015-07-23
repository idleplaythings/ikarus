_dateTime = []; // year, month, day, hour, minute [int]
_weather = []; // overcast, fog, rain, lightnings [float 0.0-1.0]
_wind = []; // easterly, northerly, forced [m/s]

_clearMorning = {
  _dateTime = [2035, 4, 12, 5, 15];
  _weather = [0.0, 0.0, 0.0, 0.0];
  _wind = [random 3, random 3, false];
};

_foggyMorning = {
  _dateTime = [2035, 4, 12, 5, 40];
  _weather = [0.2, 0.4, 0.0, 0.0];
  _wind = [random 3, random 3, false];
};

_clearAfternoon = {
  _dateTime = [2035, 4, 12, 14, 10];
  _weather = [0.0, 0.0, 0.0, 0.0];
  _wind = [random 5, random 5, false];
};

_foggyAfternoon = {
  _dateTime = [2035, 4, 12, 14, 10];
  _weather = [0.7, 0.4, 0.0, 0.0];
  _wind = [random 5, random 5, false];
};

_clearEvening = {
  _dateTime = [2035, 4, 12, 17, 30];
  _weather = [0.0, 0.0, 0.0, 0.0];
  _wind = [random 5, random 5, false];
};

_foggyEvening = {
  _dateTime = [2035, 4, 12, 17, 30];
  _weather = [0.7, 0.4, 0.0, 0.0];
  _wind = [random 5, random 5, false];
};

_night = {
  _dateTime = [2035, 4, 12, 1, 15];
  _weather = [0.0, 0.4, 0.0, 0.0];
  _wind = [random 5, random 5, false];
};

_missionSetting = [
  _clearMorning,
  _clearMorning,
  _foggyMorning,
  _foggyMorning,
  _foggyMorning,
  _foggyMorning,
  _clearAfternoon,
  _clearAfternoon,
  _clearAfternoon,
  _clearAfternoon,
  _clearAfternoon,
  _foggyAfternoon,
  _foggyAfternoon,
  _foggyAfternoon,
  _clearEvening,
  _clearEvening,
  _foggyEvening,
  _night,
  _night,
  _night
] call BIS_fnc_selectRandom;
[] call _missionSetting;

// Set the actual values. Due to volumetric cloud simulation in Arma 3, this
// has to be done over a period of time, simulated here...
setDate _dateTime;
skiptime -24;
86400 setOvercast (_weather select 0);
86400 setFog (_weather select 1);
86400 setRain (_weather select 2);
86400 setLightnings (_weather select 3);
skipTime 24; 
0 = [] spawn {
  sleep 0.1; simulWeatherSync;
};

setWind _wind;
