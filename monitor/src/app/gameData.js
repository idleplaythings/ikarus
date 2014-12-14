var Squad = require('../domain/squad.js');
var Inventory = require('../domain/inventory.js');
var SquadLoot = require('../domain/squadLoot.js');

module.exports = function(armaSerializer){
  'use strict';

  var testSquad = new Squad({
    _id: 'id',
    steamIds: ["_SP_PLAYER_", "_SP_AI_"],
    startingLocation: {x:14812.0, y:22600.0},
    companyId: 'company'
  });

  var testInventories = [
    {
      steamId: "_SP_PLAYER_",
      items: {
        'CUP_arifle_AK74': 1,
        'CUP_30Rnd_545x39_AK_M': 5
      }
    },
    {
      steamId: "_SP_AI_",
      items: {}
    }
  ];

  function GameData(armaSerializer) {
    this._squads = [];
    this._inventories = [];
    this._gameStarted = false;
    this._armaSerializer = armaSerializer;
    console.log("gamedata:", armaSerializer);
  }

  GameData.prototype.setSquads = function(squads, inventories){
    if (this._gameStarted)
      return;

    /*
    console.log("SET SQUADS");
    console.log(squads);
    console.log();
    console.log(inventories);
    */

    if (squads){
      this._squads = Object.keys(squads).map(function(key){
        return new Squad(squads[key]);
      }, this);
    }

    if (inventories){
      this._inventories = Object.keys(inventories).map(function(key){
        var serialized = inventories[key];
        return {
          steamId: serialized.steamId,
          items: serialized.items
        };
      }, this);
    }

    //console.log(this.getSquadData());
  };

  GameData.prototype.startGame = function(){
    this._gameStarted = true;
  };

  GameData.prototype.endGame = function(){
    this._gameStarted = false;
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

  GameData.prototype.receiveSquadData = function(id, serializedLoot){
    var squad = this.getSquadById(id);
    var loot = new SquadLoot(id).deserializeFromArma(serializedLoot);
    return loot;
  };

  return new GameData(armaSerializer);
};
