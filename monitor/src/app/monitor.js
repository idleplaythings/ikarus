function Monitor(rpcServer, config, gameData, webAppClient, battlEyeClient) {
  this._rpcServer = rpcServer;
  this._config = config;
  this._gameData = gameData;
  this._webAppClient = webAppClient;
  this._battlEyeClient = battlEyeClient;
}

Monitor.prototype.start = function() {
  this._registerRpcCallbacks();
  this._startRpcServer();
  this._connectToWebApp();
};

Monitor.prototype._registerRpcCallbacks = function() {
  this._registerRpcCallback('squadsRetrieve', squadsRetrieve);
  this._registerRpcCallback('squadSubmit', squadSubmit);
  this._registerRpcCallback('gameWaiting', gameWaiting);
  this._registerRpcCallback('gameStart', gameStart);
  this._registerRpcCallback('gameEnd', gameEnd);
  this._registerRpcCallback('playerConnected', playerConnected);
  this._registerRpcCallback('playerKilled', playerKilled);
  this._registerRpcCallback('playerUnknown', playerUnknown);
  this._registerRpcCallback('playerDisconnected', playerDisconnected);
};

Monitor.prototype._registerRpcCallback = function(name, callback) {
  this._rpcServer.register(name, function() {
    console.log("received rpc call", name);
    var args = Array.prototype.slice.call(arguments);
    var response = args.pop();

    try {
      response(null, callback.apply(this, args));
    } catch(e) {
      console.log("error in rpc handler");
      console.log(e.message);
      console.log(e.stack);

      response(e.message, null);
    }
  }.bind(this));
};

Monitor.prototype._startRpcServer = function() {
  this._rpcServer.listen("::1", this._config.rpc.port);
};

Monitor.prototype._connectToWebApp = function() {
  this._webAppClient.connect(
    this._config.webApp.host,
    this._config.webApp.port,
    function(err) {
      this._webAppClient.registerServer(this._config.arma.serverId);
      var squadObserver = this._webAppClient.getObserver('squads');

      squadObserver.added = function(id) {
        console.log('Added ' + id + ' to squads');
      };

      squadObserver.changed = function(id, oldFields, clearedFields, newFields) {
        console.log('Changed ' + id + ' in squads');
      };

      squadObserver.removed = function(id, old) {
        console.log('Removed ' + id + ' in squads, old: ' + old);
      };

    }.bind(this)
  );
};

Monitor.prototype._initDdpObservers = function() {

};

var squadsRetrieve = function() {
  return this._gameData.getSquadData();
};

var squadSubmit = function(squadId, loot) {
  this._gameData.receiveSquadData(squadId, loot);
};

var gameWaiting = function() {
  this._webAppClient.reportStatusWaiting();
};

var gameStart = function() {
  this._battlEyeClient.lockServer();
  this._webAppClient.reportStatusPlaying();
};

var gameEnd = function() {
  this._battlEyeClient.shutDownServer();
  this._webAppClient.reportStatusIdle();
};

var playerConnected = function(uid) {
  this._gameData.playerConnected(uid);
  this._webAppClient.reportPlayerConnected(uid);
};

var playerKilled = function(uid) {
  this._battlEyeClient.kickPlayer(uid);
  this._gameData.playerKilled(uid);
  this._gameData.playerDisconnected(uid);
  this._webAppClient.playerDisconnected(uid);
};

var playerUnknown = function(uid) {
  this._battlEyeClient.kickPlayer(uid);
  this._webAppClient.reportPlayerDisconnected(uid);
};

var playerDisconnected = function(uid, loot) {
  this._gameData.playerDisconnected(uid, loot)
  this._webAppClient.reportPlayerDisconnected(uid);
};

module.exports = Monitor;
