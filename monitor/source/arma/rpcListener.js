module.exports = function(port, gameData, webApp, armaServer){
  'use strict';

  var rpc = require('sock-rpc');

  function RpcListener(port, gameData, webApp, armaServer){
    this._port = port;
    this._gameData = gameData;
    this._webApp = webApp;
    this._armaServer = armaServer;
  }

  RpcListener.prototype.register = function(name, callback) {
    rpc.register(name, function() {
      console.log("received rpc call", name);
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

  RpcListener.prototype.listen = function(){
    this.register('squadsRetrieve',     squadsRetrieve);
    this.register('squadSubmit',        squadSubmit);
    this.register('gameWaiting',        gameWaiting);
    this.register('gameStart',          gameStart);
    this.register('gameEnd',            gameEnd);
    this.register('playerConnected',    playerConnected);
    this.register('playerKilled',       playerKilled);
    this.register('playerUnknown',      playerUnknown);
    this.register('playerDisconnected', playerDisconnected);

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
    this._webApp.reportStatusPlaying();
  };

  var gameEnd = function() {
    this._armaServer.shutDownServer();
    this._webApp.reportStatusIdle();
  };

  var playerConnected = function(uid) {
    this._gameData.playerConnected(uid);
    this._webApp.reportPlayerConnected(uid);
  };

  var playerKilled = function(uid) {
    this._armaServer.kickPlayer(uid);
    this._gameData.playerKilled(uid);
    this._gameData.playerDisconnected(uid);
    this._webApp.reportPlayerKilled(uid);
  };

  var playerUnknown = function(uid) {
    this._armaServer.kickPlayer(uid);
    this._webApp.reportPlayerDisconnected(uid);
  };

  var playerDisconnected = function(uid, loot) {
    this._gameData.playerDisconnected(uid, loot)
    this._webApp.reportPlayerDisconnected(uid);
  };

  return new RpcListener(port, gameData, webApp, armaServer);
};