var Squad = require('../domain/squad.js');
var SquadEquipment = require('../domain/squadEquipment.js');
var SquadLoot = require('../domain/squadLoot.js');

module.exports = function(){
  'use strict';

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

  function GameData() {
    this._squads = [testSquad];
    this._gameStarted = false;
  }

  GameData.prototype.setSquads = function(data){
    if (this._gameStarted)
      return;

    this._squads = Object.keys(data).map(function(key){
      return new Squad(data[key]);
    }, this);

    this._squads.push(testSquad);
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

  GameData.prototype.getSquadData = function(){
    return this._squads.map(function(squad){
      return squad.serializeForArma();
    });
  };

  GameData.prototype.receiveSquadData = function(id, serializedLoot){
    var squad = this.getSquadById(id);
    var loot = new SquadLoot().deserializeFromArma(serializedLoot);
  };

  return new GameData();
};
