var child_process = require('child_process');

function Monitor(rpcServer, config, gameData, webAppClient, battlEyeClient) {
  this._rpcServer = rpcServer;
  this._config = config;
  this._gameData = gameData;
  this._webAppClient = webAppClient;
  this._battlEyeClient = battlEyeClient;
  this._armaServerProcess = null;

  this._connectedSteamIds = [];
  this._status = Monitor.STATUS_DOWN;
}

Monitor.STATUS_IDLE = 'idle';
Monitor.STATUS_PLAYING = 'playing';
Monitor.STATUS_WAITING = 'waiting';
Monitor.STATUS_DOWN = 'down';

Monitor.prototype.start = function() {

  process.on( "SIGINT", function() {
    console.log('CLOSING [SIGINT]');

    if (this._armaServerProcess){
      this._armaServerProcess.kill();
    }

    process.exit();
  });

  try {
    this._registerRpcCallbacks();
    this._startRpcServer();
    this._connectToWebApp();
  } catch (e) {
    if (this._armaServerProcess){
      this._armaServerProcess.kill();
    }

    throw e;
  }

};

Monitor.prototype._startArma = function(){

  if (process.env.ENV === 'dev') {
    return;
  }

  var location = this._config.arma.location;
  var command = location + "/arma3server -name=server -config=server.cfg -sock_host=::1 -sock_port=1337 -mod=@ikrs;";
  var options = {
    cwd: location,
    stdio: [
      0, // use parents stdin for child
      'pipe', // pipe child's stdout to parent
      'pipe'
    ]
  };

  this._armaServerProcess = child_process.exec(command, options, function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
      process.exit();
    }
  });

  this._armaServerProcess.stdout.on('data', function(data) {
    console.log("ARMA STDOUT says: ", data);
  });

  this._armaServerProcess.stderr.on('data', function(data) {
    console.log("ARMA STDERR says: ", data);
  });
};

Monitor.prototype._registerRpcCallbacks = function() {
  this._registerRpcCallback('squadsRetrieve', squadsRetrieve);
  this._registerRpcCallback('squadSubmit', squadSubmit);
  this._registerRpcCallback('gameEnd', gameEnd);
  this._registerRpcCallback('playerConnected', playerConnected);
  this._registerRpcCallback('playerKilled', playerKilled);
  this._registerRpcCallback('playerUnknown', playerUnknown);
  this._registerRpcCallback('playerDisconnected', playerDisconnected);
  this._registerRpcCallback('shouldStartGame', shouldStartGame);
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
        this._status = Monitor.STATUS_IDLE;
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

  var inventoryObserver = this._webAppClient.getObserver('inventories');
  inventoryObserver.added = this._setSquads.bind(this);
  inventoryObserver.changed = this._setSquads.bind(this);
  inventoryObserver.removed = this._setSquads.bind(this);

  var serverObserver = this._webAppClient.getObserver('servers');
  serverObserver.added = this._checkServerStatus.bind(this);
  serverObserver.changed = this._checkServerStatus.bind(this);
  serverObserver.removed = this._checkServerStatus.bind(this);
};

Monitor.prototype._setSquads = function(){
  this._gameData.setSquads(
    this._webAppClient.getCollection('squads'),
    this._webAppClient.getCollection('inventories')
  );

  this._connectedSteamIds.forEach(function(uid) {
    if (! this._gameData.recognizeUid(uid)) {
      this._battlEyeClient.kickPlayer(uid);
    }
  }, this);
};

Monitor.prototype._checkServerStatus = function() {
  var collection = this._webAppClient.getCollection('servers');
  var server = collection[Object.keys(collection).pop()];
  var nextStatus = server.status;
  console.log(server);

  console.log("statuses", nextStatus, this._status);
  if (nextStatus !== this._status) {
    console.log("set new nextstatus", nextStatus);
    this._changeStatus(nextStatus);
  }
};

Monitor.prototype._changeStatus = function(status) {

  this._status = status;

  if (status == Monitor.STATUS_PLAYING) {
    this._battlEyeClient.lockServer();
    this._gameData.lock();
  }

  if (status == Monitor.STATUS_WAITING) {
    this._startArma();
    this._webAppClient.reportStatusWaiting(this._config.arma.serverId);
  }

  if (status == Monitor.STATUS_IDLE) {
    if (this._armaServerProcess){
      this._armaServerProcess.kill();
    }
    this._webAppClient.reportStatusIdle(this._config.arma.serverId);
  }

};

var squadsRetrieve = function(test) {
  return this._gameData.getSquadData(test);
};

var squadSubmit = function(squadId, loot) {
  var squad = this._gameData.getSquadById(squadId);
  var squadLoot = this._gameData.receiveSquadData(squadId, loot);
  this._webAppClient.reportMissionLoot(
    this._config.arma.serverId, squad, squadLoot.loot
  );
};

var gameEnd = function() {
  this._webAppClient.reportStatusDown(this._config.arma.serverId);
  this._webAppClient.getReadyPromise().then(function(){

    this._battlEyeClient.shutDownServer().then(function(){
      console.log("done, exiting");
      process.exit();
    });

  }.bind(this));
};

var playerConnected = function(uid) {

  if (! this._gameData.recognizeUid(uid)) {
    this._battlEyeClient.kickPlayer(uid);
    return;
  }

  if (this._connectedSteamIds.indexOf(uid) === -1) {
    this._connectedSteamIds.push();
  }

  this._gameData.playerConnected(uid);
  this._webAppClient.reportPlayerConnected(this._config.arma.serverId, uid);


};

var playerKilled = function(uid) {
  console.log("MONITOR: ", uid, "killed");
  this._battlEyeClient.kickPlayer(uid);
  this._gameData.playerKilled(uid);
};

var playerUnknown = function(uid) {
  this._connectedSteamIds = this._connectedSteamIds.filter(function(connectedUid) {
    return connectedUid != uid;
  });

  this._battlEyeClient.kickPlayer(uid);
  this._webAppClient.reportPlayerDisconnected(this._config.arma.serverId, uid);
};

var playerDisconnected = function(uid) {
  console.log("MONITOR", uid, "disconnected");
  this._connectedSteamIds = this._connectedSteamIds.filter(function(connectedUid) {
    return connectedUid != uid;
  });

  this._gameData.playerDisconnected(uid);
  this._battlEyeClient.kickPlayer(uid);
  this._webAppClient.reportPlayerDisconnected(this._config.arma.serverId, uid);
};

var shouldStartGame = function(test) {
  if (test) {
    return true;
  }

  var start = this._status == Monitor.STATUS_PLAYING;

  if (start) {
    this._webAppClient.reportStatusPlaying(this._config.arma.serverId);
  }

  console.log('should start?', this._status, start);
  return start;
};

module.exports = Monitor;
