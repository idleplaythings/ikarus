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

WebAppClient.prototype.registerServer = function(serverId) {
  this._ddpClient.call(
    'registerGameServer',
    [ serverId ],
    function(err, result) {
      console.log(result);
    },
    function() {
      console.log('DDP client data updated');
    }
  );
}

WebAppClient.prototype.getObserver = function(collection) {
  return this._ddpClient.observe(collection);
}

WebAppClient.prototype.reportStatusDown = function() {
  // @todo conver to method call
  // new ServerStatus({serverStatus: 'down'}).send(this._host, this._port, this._serverId);
};

WebAppClient.prototype.reportStatusWaiting = function() {
  // @todo conver to method call
  // new ServerStatus({serverStatus: 'waiting'}).send(this._host, this._port, this._serverId);
};

WebAppClient.prototype.reportStatusPlaying = function() {
  // @todo conver to method call
  // new ServerStatus({serverStatus: 'playing'}).send(this._host, this._port, this._serverId);
};

WebAppClient.prototype.reportStatusIdle = function() {
  // @todo conver to method call
  // new ServerStatus({serverStatus: 'idle'}).send(this._host, this._port, this._serverId);
};

WebAppClient.prototype.reportPlayerConnected = function(uid) {
  // @todo conver to method call
  // new ServerStatus({playerStatus: {uid: uid, status:'connected'}})
  //   .send(this._host, this._port, this._serverId);
}

WebAppClient.prototype.reportPlayerDisconnected = function(uid) {
  // @todo conver to method call
  // new ServerStatus({playerStatus: {uid: uid, status:'disconnected'}})
  //   .send(this._host, this._port, this._serverId);
}

module.exports = WebAppClient;
