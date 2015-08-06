var child_process = require('child_process');

var _ = require('underscore');

function Monitor(rpcServer, config, gameData, webAppClient, battlEyeClient) {
  this._rpcServer = rpcServer;
  this._config = config;
  this._gameData = gameData;
  this._webAppClient = webAppClient;
  this._battlEyeClient = battlEyeClient;
  this._armaServerProcess = null;

  this._connectedSteamIds = [];
  this._deadSteamIds = [];
  this._status = Monitor.STATUS_DOWN;
}

Monitor.STATUS_IDLE = 'idle';
Monitor.STATUS_PLAYING = 'playing';
Monitor.STATUS_WAITING = 'waiting';
Monitor.STATUS_DOWN = 'down';

Monitor.prototype.die = function () {
  console.log('Monitor closing down');

  this._webAppClient.reportStatusDown();
  this._webAppClient.getReadyPromise().then(function(){
    console.log("WEBAPP CLIENT READY");
    this._webAppClient.disconnect();
    if (this._armaServerProcess) {
      console.log('killing arma');

      this._armaServerProcess.kill('SIGTERM');
    } else {
      process.exit();
    }

  }.bind(this));
}

Monitor.prototype.start = function() {

  process.on("SIGINT", this.die.bind(this));
  process.on("SIGTERM", this.die.bind(this));

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

  if (this._armaServerProcess) {
    return;
  }

  console.log("START ARMA SERVER");
  if (process.env.ENV === 'dev') {
    return;
  }

  var location = this._config.arma.location;
  var configLocation = this._config.arma.config;
  var sockPort = this._config.rpc.port;
  var armaPort = this._config.arma.port;
  var BEpath = this._config.arma.BEpath;
  var command = location + "/arma3server";

  var args = [
    "-name=server",
    "-config="+configLocation,
    "-sock_host=::1",
    "-sock_port="+sockPort,
    "-port="+armaPort,
    "-mod=@ikrs;",
    "-BEpath="+BEpath
    //"-noLogs"
  ];

  var options = {
    cwd: location,
    stdio: [
      0, // use parents stdin for child
      'pipe', // pipe child's stdout to parent
      'pipe'
    ],
    maxBuffer: 16192*1024
  };

  this._armaServerProcess = child_process.spawn(command, args, options);
  this._armaServerProcess.on("error", function(error) {
    console.log("Arma server error:", error);
  })

  this._armaServerProcess.on("exit", function(code, signal) {
    console.log("Arma server dead, code:", code, "signal:", signal);
    process.exit();
  })

  this._armaServerProcess.stdout.on('data', function(data) {
    console.log("ARMA STDOUT says: ", data.toString());
  });

  this._armaServerProcess.stderr.on('data', function(data) {
    console.log("ARMA STDERR says: ", data.toString());
  });
};

Monitor.prototype._registerRpcCallbacks = function() {
  this._registerRpcCallback('squadsRetrieve', squadsRetrieve);
  this._registerRpcCallback('squadSubmit', squadSubmit);
  this._registerRpcCallback('outpostsSubmit', outpostsSubmit);
  this._registerRpcCallback('gameEnd', gameEnd);
  this._registerRpcCallback('playerConnected', playerConnected);
  this._registerRpcCallback('playerKilled', playerKilled);
  this._registerRpcCallback('playerUnknown', playerUnknown);
  this._registerRpcCallback('playerDisconnected', playerDisconnected);
  this._registerRpcCallback('shouldStartGame', shouldStartGame);
  this._registerRpcCallback('getSquadForUid', getSquadForUid);
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
  var serverPassword = this._config.webApp.serverPassword;

  this._webAppClient.connect(
    this._config.webApp.host,
    this._config.webApp.port,
    function(err, reconnect) {

      if (! reconnect){
        console.log("connected to webApp");
        this._webAppClient.login();
        this._webAppClient.reportStatusIdle();
        this._webAppClient.updateDetails(
            _.pick(this._config.arma, 'host', 'port', 'password')
        );
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


  if (nextStatus && nextStatus !== this._status) {
    console.log("change status from", this._status, "to", nextStatus);
    this._changeStatus(nextStatus);
  }
};

Monitor.prototype._changeStatus = function(status) {

  var oldStatus = this._status;
  this._status = status;

  if (status == Monitor.STATUS_PLAYING && oldStatus == Monitor.STATUS_WAITING) {
    console.log("I AM SERIOUSLY DOING IT")
  }

  if (status == Monitor.STATUS_WAITING) {
    this._startArma();
 }

  if (status == Monitor.STATUS_DOWN) {
    console.log("Monitor told to go status down");
    this.die();
  }

};

var squadsRetrieve = function(test) {
  var squads = this._gameData.getSquadData(this._connectedSteamIds, test);
  console.log("MONITOR RETURING", squads.length, " SQUADS");
  return squads;
};

var squadSubmit = function(squadId, objective, loot) {
  console.log("SQUAD SUBMIT", squadId, objective);
  var squad = this._gameData.getSquadById(squadId);
  var squadLoot = this._gameData.receiveSquadData(squadId, loot);
  this._webAppClient.reportMissionLoot(squad, objective, squadLoot.loot);
};

var outpostsSubmit = function(squadId, changes) {
  var squad = this._gameData.getSquadById(squadId);
  var objectChanges = {
    newOutposts: changes[0].map(function (location) {
      return {x: location[0], y: location[1]};
    }),
    removedOutposts: changes[1].map(function (location) {
      return {x: location[0], y: location[1]};
    }),
  };

  console.log("OUTPOST SUBMIT", squadId, objectChanges);

  this._webAppClient.reportOutpostChanges(squad, objectChanges);
};

var gameEnd = function() {
  console.log("Game ending, monitor dying");
  this.die();
};

var getSquadForUid = function(uid) {
  return this._gameData.getSquadDataForUid(uid);
};

var playerConnected = function(uid) {

  if (! this._gameData.recognizeUid(uid)) {
    console.log("Player not recognized");
    this._battlEyeClient.kickPlayer(uid);
    return false;
  }

  if (this._deadSteamIds.indexOf(uid) !== -1) {
    console.log("Player already dead, kicking");
    this._battlEyeClient.kickPlayer(uid);
    return false;
  }

  if (this._connectedSteamIds.indexOf(uid) === -1) {
    this._connectedSteamIds.push(uid);
  }

  this._gameData.playerConnected(uid);
  this._webAppClient.reportPlayerConnected(uid);
  return true;
};

var playerKilled = function(uid, killerUid, killerWeapon, position) {
  console.log("MONITOR: ", uid, "killed", "killer", killerUid, "with", killerWeapon, "at", position);
  this._battlEyeClient.kickPlayer(uid);
  this._gameData.playerKilled(uid);
  if (position) {
    position = {
      x: position[0],
      y: position[1]
    };
  }

  if (this._status == Monitor.STATUS_PLAYING && this._deadSteamIds.indexOf(uid) == -1) {
    this._deadSteamIds.push(uid);
  }

  this._webAppClient.reportPlayerKilled(uid, killerUid, killerWeapon, position);
};

var playerUnknown = function(uid) {
  this._connectedSteamIds = this._connectedSteamIds.filter(function(connectedUid) {
    return connectedUid != uid;
  });

  this._battlEyeClient.kickPlayer(uid);
  this._webAppClient.reportPlayerDisconnected(uid);
};

var playerDisconnected = function(uid) {
  console.log("MONITOR", uid, "disconnected");
  this._connectedSteamIds = this._connectedSteamIds.filter(function(connectedUid) {
    return connectedUid != uid;
  });

  if (this._status == Monitor.STATUS_PLAYING && this._deadSteamIds.indexOf(uid) == -1) {
    this._deadSteamIds.push(uid);
  }

  this._gameData.playerDisconnected(uid);
  this._battlEyeClient.kickPlayer(uid);
  this._webAppClient.reportPlayerDisconnected(uid);
};

var shouldStartGame = function(test) {
  if (test) {
    return true;
  }

  var start = this._status == Monitor.STATUS_PLAYING;
  console.log('should start?', this._status, start);
  return start;
};

module.exports = Monitor;
