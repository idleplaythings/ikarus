
module.exports = WebAppConnection;
ServerStatus = require('./serverStatus.js');

function WebAppConnection(args) {
  this._host = args.host;
  this._port = args.port;
  this._serverId = args.serverId;
};

WebAppConnection.prototype.reportStatusReady = function(){
  new ServerStatus('READY').send(this._host, this._port, this._serverId);
};
