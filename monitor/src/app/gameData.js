var Squad = require('../domain/squad.js');
var Inventory = require('../domain/inventory.js');
var SquadLoot = require('../domain/squadLoot.js');

module.exports = function(armaSerializer){
  'use strict';

  var testSquad = new Squad({
    _id: 'id',
    steamIds: ["_SP_PLAYER_", "_SP_AI_"],
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
      "WeaponCache1",
      "MedicalStation1"
    ]
  });

  var testInventories = [
    {
      squadId: "id",
      items: {
        'SatchelCharge_Remote_Mag': 10,
        'B_AssaultPack_khk': 1,
        'UAZ_Unarmed': 1
      }
    }
  ];

  function GameData(armaSerializer) {
    this._squads = [];
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

  GameData.prototype.getSquadData = function(demo){

    var squads = this._squads.slice(0);
    var inventories = this._inventories.slice(0);

    if (demo){
      squads.push(testSquad),
      inventories = inventories.concat(testInventories)
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

  return new GameData(armaSerializer);
};
