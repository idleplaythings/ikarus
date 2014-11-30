
module.exports = WebAppConnection;
ServerStatus = require('./serverStatus.js');

function WebAppConnection(args) {
  this._host = args.host;
  this._serverId = args.serverId;
};

WebAppConnection.prototype.reportStatusReady = function(){
  new ServerStatus('READY').send(this._host, this._serverId);
};
