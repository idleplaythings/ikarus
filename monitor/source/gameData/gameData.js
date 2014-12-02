
module.exports = function(){
  'use strict';

  var Squad = require('./squad.js');
  var SquadEquipment = require('./squadEquipment.js');
  var SquadLoot = require('./squadLoot.js');

  var squads = [
    new Squad({
      id: 'id',
      playerIds: ["76561198007087657", "76561197962172634", "76561197970345650", "_SP_PLAYER_", "_SP_AI_"],
      startingLocation: [14812.0, 22600.0],
      equipment: new SquadEquipment(["arifle_Katiba_F","arifle_Katiba_F","arifle_Katiba_F","arifle_Katiba_F"], ["30Rnd_65x39_caseless_green"], [], []),
      objectives: ['SUPPLY']
    })
  ];

  function GameData() {
    this._squads = squads;
  }

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
