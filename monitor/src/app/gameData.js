var Squad = require('../domain/squad.js');
var Inventory = require('../domain/inventory.js');
var SquadLoot = require('../domain/squadLoot.js');

module.exports = function(armaSerializer){
  'use strict';

  var testIntel = { 
    _id: 'hmjCizy7vMyqqWeqz',
    currentWeather: 
    { 
      type: 'Clear',
      overcast: '0.1',
      fog: '0.0',
      rain: '0.0',
      lightnings: '0.0',
      wind: { windSpeed: '5.7', easterly: '4.7', northerly: '-3.3' },
      waves: 0.4 
    },
    forecast: 
    { 
      type: 'Clear',
      overcast: '0.1',
      fog: '0.0',
      rain: '0.0',
      lightnings: '0.0',
      wind: { windSpeed: '3.2', easterly: '2.9', northerly: '1.3' },
      waves: 0.4 
    },
    nextWeather: 
    { 
      type: 'Clear',
      overcast: '0.1',
      fog: '0.0',
      rain: '0.0',
      lightnings: '0.0',
      wind: { windSpeed: '8.5', easterly: '-1.1', northerly: '8.4' },
      waves: 0.6 },
    dateTime: 
    { 
      type: 'Dawn',
      year: '2035',
      month: '11',
      day: '3',
      hour: '6',
      minute: '47' 
    } 
  };

  var testSquad = new Squad({
    _id: 'id',
    steamIds: ["_SP_PLAYER_"],
    startingLocation: {x:8500.0, y:11200.0},
    companyId: 'company',
    objective: 'Supply',
    gear: [
      {
        steamId: "_SP_PLAYER_",
        headgear: ["H_Watchcap_cbr"],
        vest: ["V_Chestrig_oli"],
        uniform: ["Niko_USA_M81OD"]
      }
    ],
    baseModules: [
      "Garage1",
      "Primary1",
      "OutpostMap1",
      "MedicalStation1"
    ],
    outposts: [
      {x:9500.0, y:11200.0},
      {x:9500.0, y:17200.0}
    ],
    renown: 1000,
    companyName: "Manatee-Men"
  });

  var testSquad2 = new Squad({
    _id: 'id2',
    steamIds: ["_SP_AI_"],
    startingLocation: {x:9500.0, y:11200.0},
    companyId: 'company',
    objective: 'Supply',
    gear: [
      {
        steamId: "_SP_AI_",
        headgear: ["H_Watchcap_cbr"],
        vest: ["V_Chestrig_oli"],
        uniform: ["Niko_USA_M81OD"]
      }
    ],
    baseModules: [
      "Garage1",
      "Primary1",
      "WeaponCache1",
      "MedicalStation1"
    ],
    renown: 2000,
    companyName: "Fifty shades of Gay"
  });

  var testInventories = [
    {
      squadId: "id",
      items: {
        'SatchelCharge_Remote_Mag': 10,
        'B_AssaultPack_khk': 1,
        'B_Heli_Light_01_F': 1,
        'IKRS_intelligence_helo': 1,
        'IKRS_outpost_backpack': 3
      }
    },
    {
      squadId: "id2",
      items: {
        'SatchelCharge_Remote_Mag': 10,
        'B_AssaultPack_khk': 1,
        'UAZ_Unarmed': 1,
        'IKRS_intelligence_helo': 1
      }
    }
  ];

  function GameData(armaSerializer) {
    this._squads = [];
    this._intel = {};
    this._inventories = [];
    this._locked = false;
    this._armaSerializer = armaSerializer;
    console.log("gamedata:", armaSerializer);
  }

  GameData.prototype.reset = function(){
    this._squads = [];
    this._inventories = [];
  };

  GameData.prototype.setSquads = function(squads, inventories){
    if (this._locked)
      return;

    if (squads){
      this._squads = Object.keys(squads).map(function(key){
        return new Squad(squads[key]);
      }, this);
    } else {
      this._squads = [];
    }

    if (inventories){
      this._inventories = Object.keys(inventories).map(function(key){
        var serialized = inventories[key];
        return {
          squadId: serialized.squadId,
          items: serialized.items
        };
      }, this);
    } else {
      this._inventories = [];
    }
  };

  GameData.prototype.setIntel = function(intel){
    if (this._locked)
      return;

    if (intel){
      this._intel = intel[Object.keys(intel)[0]];
    } else {
      this._intel = {};
    }
  };

  GameData.prototype.recognizeUid = function(uid) {
    return Boolean(this._squads.filter(function(squad){
      return squad.steamIds.indexOf(uid) !== -1;
    }).pop());
  };

  GameData.prototype.lock = function(){
    this._locked = true;
  };

  GameData.prototype.unlock = function(){
    this._locked = false;
  };

  GameData.prototype.playerKilled = function(id){
    console.log("player id:", id, "killed");
  };

  GameData.prototype.playerDisconnected = function(id, loot){
    console.log("player id:", id, "disconnected");
  };

  GameData.prototype.playerConnected = function(id){
    console.log("player id:", id, "connected");
  };

  GameData.prototype.getSquadById = function(id){
    return this._squads.filter(function(squad){
      return squad._id == id;
    }).pop();
  };

  GameData.prototype.getSquadData = function(connectedSteamIds, demo){

    var squads = this._squads.slice(0);
    var inventories = this._inventories.slice(0);

    if (demo){
      squads.push(testSquad);
      squads.push(testSquad2);
      inventories = inventories.concat(testInventories)
    }

    if (! demo) {
      squads = squads.filter(function (squad) {
        return squad.steamIds.some(function(steamId) {
          return connectedSteamIds.indexOf(steamId) !== -1;
        });
      });
    }

    return this._armaSerializer.serializeForArma(
      squads, inventories
    );
  };

  GameData.prototype.getSquadDataForUid = function(uid){

    var squads = this._squads.slice(0);
    var inventories = this._inventories.slice(0);

    var squad = squads.filter(function (squad) {
      return squad.steamIds.indexOf(uid) !== -1;
    }).pop();

    return this._armaSerializer.serializeSquadForArma(squad, inventories);
  };

  GameData.prototype.receiveSquadData = function(id, serializedLoot){
    var loot = new SquadLoot(id).deserializeFromArma(serializedLoot);
    return loot;
  };

  GameData.prototype.getWeather = function(demo){
    var intel = demo ? testIntel : this._intel;
    return this._serializeWeatherObject(intel.currentWeather);
  };

  GameData.prototype.getNextWeather = function(demo){
    var intel = demo ? testIntel : this._intel;
    return this._serializeWeatherObject(intel.nextWeather);
  };

  GameData.prototype.getMissionDateTime = function(demo){
    var intel = demo ? testIntel : this._intel;
    return intel.dateTime.year + ',' +
           intel.dateTime.month + ',' +
           intel.dateTime.day + ',' +
           intel.dateTime.hour + ',' +
           intel.dateTime.minute;
  };

  GameData.prototype._serializeWeatherObject = function(weather) {
    return weather.overcast + ',' +
           weather.fog + ',' +
           weather.rain + ',' +
           weather.lightnings + ',' +
           weather.wind.easterly + ',' +
           weather.wind.northerly + ',' +
           weather.waves;
  };

  return new GameData(armaSerializer);
};
