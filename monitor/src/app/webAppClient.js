var Q = require('q');

function WebAppClient(ddpClient) {
  this._ddpClient = ddpClient;
  this._promises = [];
};

WebAppClient.prototype.connect = function(host, port, callback) {
  this._ddpClient.host = host;
  this._ddpClient.port = port;

  var that = this;
  this._ddpClient.connect(function(error, wasReconnect) {
    if (error) {
      console.error('DDP connection error!');
      return;
    }

    if (wasReconnect) {
      console.error('Re-establishment of a connection.');
    } else {
      console.log('DDP connection established');
    }

    callback(error, wasReconnect);
  });
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

WebAppClient.prototype.login = function(serverId, password) {
  this.call('login', [
    { user : { username : serverId }, password : password }
  ]);
}

WebAppClient.prototype.registerServer = function(serverId) {
  this.call('registerServer', [ serverId ]);
}

WebAppClient.prototype.reportStatusDown = function(serverId) {
  this.call('updateServerStatus', [serverId, 'down']);
};

WebAppClient.prototype.reportStatusWaiting = function(serverId) {
  this.call('updateServerStatus', [serverId, 'waiting']);
};

WebAppClient.prototype.reportStatusPlaying = function(serverId) {
  this.call('updateServerStatus', [serverId, 'playing']);
};

WebAppClient.prototype.reportStatusIdle = function(serverId) {
  this.call('updateServerStatus', [serverId, 'idle']);
};

WebAppClient.prototype.updateDetails = function(serverId, details) {
  this.call('updateServerDetails', [serverId, details])
};

WebAppClient.prototype.reportPlayerConnected = function(serverId, uid) {
  this.call('playerConnected', [serverId, uid]);
};

WebAppClient.prototype.reportPlayerDisconnected = function(serverId, uid) {
  this.call('playerDisconnected', [serverId, uid]);
};

WebAppClient.prototype.reportMissionLoot = function(serverId, squad, loot) {
  this.call('missionLoot', [serverId, squad._id, loot, squad.objective]);
};

WebAppClient.prototype.reportLockSquads = function(serverId) {
  this.call('lockSquads', [serverId]);
};

module.exports = WebAppClient;
