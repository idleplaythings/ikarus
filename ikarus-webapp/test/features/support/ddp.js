var DDPClient = require("ddp");
var ddpClient = new DDPClient({
  // All properties optional, defaults shown
  host : "localhost",
  port : 3000,
  path : "websocket",
  ssl  : false,
  autoReconnect : false,
  autoReconnectTimer : 500,
  maintainCollections : true,
  ddpVersion : '1'  // ['1', 'pre2', 'pre1'] available
});

module.exports = {
  ddpClient: ddpClient
};
