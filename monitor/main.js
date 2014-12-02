var dic = require('./dic');

var rpc = dic.get('RpcListener');
var wepApp = dic.get('WebAppListener');
var wepAppClient = dic.get('WebAppClient');

rpc.listen();
wepApp.listen();
wepAppClient.reportStatusIdle();
