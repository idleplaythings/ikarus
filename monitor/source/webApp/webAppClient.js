
module.exports = function(host, port, serverId){
  var ServerStatus = require('./serverStatus.js');

  function WebAppClient(host, port, serverId) {
    this._host = host;
    this._port = port;
    this._serverId = serverId;
  };

  WebAppClient.prototype.reportStatusDown = function(){
    new ServerStatus({serverStatus: 'down'}).send(this._host, this._port, this._serverId);
  };

  WebAppClient.prototype.reportStatusWaiting = function() {
    new ServerStatus({serverStatus: 'waiting'}).send(this._host, this._port, this._serverId);
  };

  WebAppClient.prototype.reportStatusPlaying = function() {
    new ServerStatus({serverStatus: 'playing'}).send(this._host, this._port, this._serverId);
  };

  WebAppClient.prototype.reportStatusIdle = function() {
    new ServerStatus({serverStatus: 'idle'}).send(this._host, this._port, this._serverId);
  };

  WebAppClient.prototype.reportPlayerConnected = function(uid) {
    new ServerStatus({playerStatus: {uid: uid, status:'connected'}})
      .send(this._host, this._port, this._serverId);
  }

  WebAppClient.prototype.reportPlayerDisconnected = function(uid) {
    new ServerStatus({playerStatus: {uid: uid, status:'disconnected'}})
      .send(this._host, this._port, this._serverId);
  }

  return new WebAppClient(host, port, serverId);
};

