var Squad = require('../domain/squad.js');
var Inventory = require('../domain/inventory.js');
var SquadLoot = require('../domain/squadLoot.js');

module.exports = function(armaSerializer){
  'use strict';
/*
  var testSquad = new Squad({
    squadId: 'id',
    membersOnServer: ["_SP_PLAYER_", "_SP_AI_"],
    startingLocation: {x:14812.0, y:22600.0},
    missionItems: new SquadEquipment({
      weapons: ["arifle_Katiba_F","arifle_Katiba_F","arifle_Katiba_F","arifle_Katiba_F"],
      magazines: ["30Rnd_65x39_caseless_green"],
      items: [],
      backpacks: []
    })
  });
*/

  function GameData(armaSerializer) {
    this._squads = [];
    this._members = [];
    this._gameStarted = false;
    this._armaSerializer = armaSerializer;
    console.log("gamedata:", armaSerializer);
  }

  GameData.prototype.setSquads = function(squads, members){
    if (this._gameStarted)
      return;

    console.log("SET SQUADS");
    console.log(squads);
    console.log();
    console.log(members);

    if (squads){
      this._squads = Object.keys(squads).map(function(key){
        return new Squad(squads[key]);
      }, this);
    }

    if (members){
      this._members = Object.keys(members).map(function(key){
        var serialized = members[key];
        return {
          steamId: serialized.steamId,
          inventory: new Inventory(serialized.inventory)
        };
      }, this);
    }

    console.log(this.getSquadData());
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
    return this._armaSerializer.serializeForArma(
      this._squads, this._members
    );
  };

  GameData.prototype.receiveSquadData = function(id, serializedLoot){
    var squad = this.getSquadById(id);
    var loot = new SquadLoot().deserializeFromArma(serializedLoot);
  };

  return new GameData(armaSerializer);
};
