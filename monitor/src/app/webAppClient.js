var Q = require('q');

function WebAppClient(ddpClient, serverId, serverPassword) {
  this._ddpClient = ddpClient;
  this._promises = [];
  this._serverId = serverId;
  this._serverPassword = serverPassword;
  this._connectionRetries = 0;
};

WebAppClient.prototype.connect = function(host, port, callback) {
  this._ddpClient.host = host;
  this._ddpClient.port = port;

  console.log("DDP connecting... ");

  this._ddpClient.connect(function(error, wasReconnect) {
    if (error) {
      console.error('DDP connection error!', error);
      this._ddpClient.close();
      setTimeout(this.connect.bind(this, host, port, callback), 10000);
      return;
    }

    if (wasReconnect) {
      console.error('Re-establishment of a connection.');
    } else {
      console.log('DDP connection established');
    }

    callback(error, wasReconnect);
  }.bind(this));
}

WebAppClient.prototype.subscribe = function(collection, params, callback) {

  if ( ! params) {
    params = [];
  }

  if ( ! callback){
    callback = function(){
      console.log("Subscribed to ", collection)
    };
  }

  this._ddpClient.subscribe(
    collection,
    params,
    callback
  );
};

WebAppClient.prototype.getObserver = function(collection) {
  return this._ddpClient.observe(collection);
};

WebAppClient.prototype.getCollection = function(collection) {
  return this._ddpClient.collections[collection];
};

WebAppClient.prototype.getReadyPromise = function(){
  return Q.all(this._promises);
};

WebAppClient.prototype.disconnect = function(){
  this._ddpClient.close();
};

WebAppClient.prototype.call = function(name, args){

  var onResultPromise = Q.defer();
  var onDonePromise = Q.defer();

  this._promises.push(onResultPromise);
  this._promises.push(onDonePromise);

  var onResult = function(error, result){
    console.log("Meteor method response 2", error, result);
    onResultPromise.resolve();
    if (error && error.error == 401) {
      this.retry(name, args);
    } else {
      this._connectionRetries = 0;
    }
  }.bind(this);

  var onDone = function(error, result){
    onDonePromise.resolve();
  }.bind(this);

  console.log("Calling meteor method '" + name +"' ");

  this._ddpClient.call(
    name,
    args,
    onResult,
    onDone
  );
};

WebAppClient.prototype.retry = function(name, args) {
  this._connectionRetries++;

  if (this._connectionRetries > 10) {
    return;
  }

  this.login();
  this.call(name, args);
};

WebAppClient.prototype.login = function() {
  this.call('login', [
    { user : { username : this._serverId }, password : this._serverPassword }
  ]);
}

WebAppClient.prototype.registerServer = function() {
  this.call('registerServer', [ this._serverId ]);
}

WebAppClient.prototype.reportStatusDown = function() {
  this.call('updateServerStatus', [this._serverId, 'down']);
};

WebAppClient.prototype.reportStatusWaiting = function() {
  this.call('updateServerStatus', [this._serverId, 'waiting']);
};

WebAppClient.prototype.reportStatusPlaying = function() {
  this.call('updateServerStatus', [this._serverId, 'playing']);
};

WebAppClient.prototype.reportStatusIdle = function() {
  this.call('updateServerStatus', [this._serverId, 'idle']);
};

WebAppClient.prototype.updateDetails = function(details) {
  this.call('updateServerDetails', [this._serverId, details])
};

WebAppClient.prototype.reportPlayerConnected = function(uid) {
  this.call('playerConnected', [this._serverId, uid]);
};

WebAppClient.prototype.reportPlayerKilled = function (uid, killerUid, killerWeapon, position) {
  this.call('playerKilled', [this._serverId, uid, killerUid, killerWeapon, position]);
};

WebAppClient.prototype.reportPlayerDisconnected = function(uid) {
  this.call('playerDisconnected', [this._serverId, uid]);
};

WebAppClient.prototype.reportMissionLoot = function(squad, objective, loot) {
  this.call('missionLoot', [this._serverId, squad._id, loot, objective]);
};

WebAppClient.prototype.reportOutpostChanges = function(squad, changes) {
  this.call('outpostChanges', [this._serverId, squad._id, changes]);
};

WebAppClient.prototype.reportRaids = function(raids) {
  this.call('raids', [this._serverId, raids]);
};

WebAppClient.prototype.reportLockSquads = function() {
  this.call('lockSquads', [this._serverId]);
};

module.exports = WebAppClient;
