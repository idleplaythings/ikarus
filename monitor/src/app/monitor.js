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
  var serverId = this._config.arma.serverId;

  this._webAppClient.connect(
    this._config.webApp.host,
    this._config.webApp.port,
    function(err) {
      this._webAppClient.registerServer(serverId);
      this._webAppClient.reportStatusIdle(serverId);
      this._webAppClient.subscribe('SquadsOnServer', [serverId]);
      this._initDdpObservers();
    }.bind(this)
  );
};



Monitor.prototype._initDdpObservers = function() {
  var squadObserver = this._webAppClient.getObserver('squads');
  squadObserver.added = this._setSquads.bind(this);
  squadObserver.changed = this._setSquads.bind(this);
  squadObserver.removed = this._setSquads.bind(this);

  var memberObserver = this._webAppClient.getObserver('inventories');
  memberObserver.added = this._setSquads.bind(this);
  memberObserver.changed = this._setSquads.bind(this);
  memberObserver.removed = this._setSquads.bind(this);
};

Monitor.prototype._setSquads = function(){
  this._gameData.setSquads(
    this._webAppClient.getCollection('squads'),
    this._webAppClient.getCollection('inventories')
  );
};

var squadsRetrieve = function(test) {
  return this._gameData.getSquadData(test);
};

var squadSubmit = function(squadId, loot) {
  this._gameData.receiveSquadData(squadId, loot);
};

var gameWaiting = function() {
  this._webAppClient.reportStatusWaiting(this._config.arma.serverId);
};

var gameStart = function() {
  this._battlEyeClient.lockServer(this._config.battlEye);
  this._webAppClient.reportStatusPlaying(this._config.arma.serverId);
  this._gameData.startGame();
};

var gameEnd = function() {
  this._battlEyeClient.shutDownServer(this._config.battlEye);
  this._webAppClient.reportStatusIdle(this._config.arma.serverId);
  this._gameData.endGame();
};

var playerConnected = function(uid) {
  this._gameData.playerConnected(uid);
  this._webAppClient.reportPlayerConnected(this._config.arma.serverId, uid);
};

var playerKilled = function(uid) {
  this._battlEyeClient.kickPlayer(this._config.battlEye, uid);
  this._gameData.playerKilled(uid);
  this._gameData.playerDisconnected(uid);
  this._webAppClient.reportPlayerDisconnected(this._config.arma.serverId, uid);
};

var playerUnknown = function(uid) {
  this._battlEyeClient.kickPlayer(this._config.battlEye, uid);
  this._webAppClient.reportPlayerDisconnected(this._config.arma.serverId, uid);
};

var playerDisconnected = function(uid, loot) {
  this._gameData.reportPlayerDisconnected(uid, loot)
  this._webAppClient.reportPlayerDisconnected(this._config.arma.serverId, uid);
};

module.exports = Monitor;
