module.exports = function(){
  'use strict';

  var rpc = require('sock-rpc');

  function RpcClient(port, gameData, webApp, armaServer){
    this._port = port;
    this._gameData = gameData;
    this._webApp = webApp;
    this._armaServer = armaServer;
  }

  RpcClient.prototype.register = function(name, callback) {
    rpc.register(name, function() {
      var args = Array.slice(arguments);
      var response = args.pop();

      try {
        response(null, callback.apply(this, args));
      }catch(e){
        console.log("error in rpc handler");
        console.log(e.message);
        console.log(e.stack);

        response(e.message, null);
      }
    });
  };

  RpcClient.prototype.listen = function(){
    this.register('squadsRetrieve',     squadsRetrieve);
    this.reqister('squadSubmit',        squadSubmit);
    this.reqister('gameWaiting',        gameWaiting);
    this.reqister('gameStart',          gameStart);
    this.reqister('gameEnd',            gameEnd);
    this.reqister('playerKilled',       playerKilled);
    this.reqister('playerHasNoSquad',   playerHasNoSquad);
    this.reqister('playerDisconnected', playerDisconnected);

    rpc.listen("::1", this._port);
  };

  var squadsRetrieve = function() {
    return this._gameData.getSquadData();
  };

  var squadSubmit = function(squadId, loot) {
    this._gameData.receiveSquadData(squadId, loot);
  };

  var gameWaiting = function() {
    this._webApp.reportStatusWaiting();
  };

  var gameStart = function() {
    this._armaServer.lockServer();
    this._webApp.reportStatusReady();
  };

  var gameEnd = function() {
    this._armaServer.shutDownServer();
    this._webApp.reportStatusReady();
  };

  var playerKilled = function(uid) {
    this._armaServer.kickPlayer(uid);
    this._gameData.playerKilled(uid);
    this._webApp.reportPlayerKilled(uid);
  };

  var playerHasNoSquad = function(uid) {
    this._armaServer.kickPlayer(uid);
    this._webApp.reportPlayerDisconnected(uid);
  };

  var playerDisconnected = function(uid, loot) {
    this._gameData.playerDisconnected(uid, loot)
    this._webApp.reportPlayerDisconnected(uid);
  };

  return RpcClient;
};