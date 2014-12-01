
module.exports = function(host, port, serverId){
  var ServerStatus = require('./serverStatus.js');

  function WebAppClient(host, port, serverId) {
    this._host = host;
    this._port = port;
    this._serverId = serverId;
  };

  WebAppClient.prototype.reportStatusReady = function(){
    new ServerStatus('READY').send(this._host, this._port, this._serverId);
  };

  WebAppClient.prototype.reportStatusWaiting = function() {};

  WebAppClient.prototype.reportStatusPlaying = function() {}

  WebAppClient.prototype.reportStatusIdle = function() {}

  WebAppClient.prototype.reportPlayerConnected = function(uid) {}

  WebAppClient.prototype.reportPlayerKilled = function(uid) {}

  WebAppClient.prototype.reportPlayerDisconnected = function(uid) {}


  return new WebAppClient(host, port, serverId);
};

