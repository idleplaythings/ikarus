var child_process = require('child_process');

function Monitor(rpcServer, config, gameData, webAppClient, battlEyeClient) {
  this._rpcServer = rpcServer;
  this._config = config;
  this._gameData = gameData;
  this._webAppClient = webAppClient;
  this._battlEyeClient = battlEyeClient;
}

Monitor.prototype.start = function() {
  this._startArma();
  this._registerRpcCallbacks();
  this._startRpcServer();
  this._connectToWebApp();
};

Monitor.prototype._startArma = function(){

  if (process.env.ENV === 'dev') {
    return;
  }

  var location = this._config.arma.location;
  var command = location + "/arma3server -name=server -config=server.cfg -sock_host=::1 -sock_port=1337 -mod=@ikrs;";
  var options = {
    cwd: location
  };

  child_process.exec(command, options, function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }

    process.exit();
  });
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
  this._registerRpcCallback('lockSquads', lockSquads);
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
    function(err, reconnect) {
      this._gameData.reset();

      if (! reconnect){
        this._webAppClient.registerServer(serverId);
        this._webAppClient.reportStatusIdle(serverId);
        this._initDdpObservers();
      }

      this._webAppClient.subscribe('SquadsOnServer', [serverId]);
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
  var squadLoot = this._gameData.receiveSquadData(squadId, loot);
  this._webAppClient.reportMissionLoot(
    this._config.arma.serverId, squadId, squadLoot.loot
  );
};

var gameWaiting = function() {
  this._webAppClient.reportStatusWaiting(this._config.arma.serverId);
};

var gameStart = function() {
  this._battlEyeClient.lockServer();
  this._webAppClient.reportStatusPlaying(this._config.arma.serverId);
  this._gameData.startGame();
};

var gameEnd = function() {
  this._battlEyeClient.shutDownServer();
  this._webAppClient.reportStatusIdle(this._config.arma.serverId);
  this._gameData.endGame();
};

var playerConnected = function(uid) {
  this._gameData.playerConnected(uid);
  this._webAppClient.reportPlayerConnected(this._config.arma.serverId, uid);
};

var playerKilled = function(uid) {
  this._battlEyeClient.kickPlayer(uid);
  this._gameData.playerKilled(uid);
  this._gameData.playerDisconnected(uid);
  this._webAppClient.reportPlayerDisconnected(this._config.arma.serverId, uid);
};

var playerUnknown = function(uid) {
  this._battlEyeClient.kickPlayer(uid);
  this._webAppClient.reportPlayerDisconnected(this._config.arma.serverId, uid);
};

var playerDisconnected = function(uid) {
  this._battlEyeClient.kickPlayer(uid);
  this._webAppClient.reportPlayerDisconnected(this._config.arma.serverId, uid);
};

var lockSquads = function() {
  this._webAppClient.reportLockSquads(this._config.arma.serverId);
};

module.exports = Monitor;
