
module.exports = (function(){
  var ServerStatus = require('./serverStatus.js');

  function WebAppClient(host, port, serverId) {
    this._host = host;
    this._port = port;
    this._serverId = serverId;
  };

  WebAppClient.prototype.reportStatusReady = function(){
    new ServerStatus('READY').send(this._host, this._port, this._serverId);
  };

  return WebAppClient;
})();

