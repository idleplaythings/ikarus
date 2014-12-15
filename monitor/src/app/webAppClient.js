function WebAppClient(ddpClient) {
  this._ddpClient = ddpClient;
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
      console.error('Reestablishment of a connection.');
    }

    console.log('DDP connection established');

    callback(error);
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

WebAppClient.prototype.call = function(name, args){

  var onResult = function(error, result){
    console.log("Meteor method response 2", error, result);
  }.bind(this);

  var onDone = function(error, result){
    console.log('DDP client data updated 2');
  }.bind(this);

  console.log("Calling meteor method '" + name +"' ");
  console.log(args);

  this._ddpClient.call(
    name,
    args,
    onResult,
    onDone
  );
};

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

WebAppClient.prototype.reportPlayerConnected = function(serverId, uid) {
  this.call('playerConnected', [serverId, uid]);
};

WebAppClient.prototype.reportPlayerDisconnected = function(serverId, uid) {
  this.call('playerDisconnected', [serverId, uid]);
};

WebAppClient.prototype.reportMissionLoot = function(serverId, squadId, loot) {
  this.call('missionLoot', [serverId, squadId, loot]);
};

WebAppClient.prototype.reportLockSquads = function(serverId) {
  this.call('lockSquads', [serverId]);
};

module.exports = WebAppClient;
