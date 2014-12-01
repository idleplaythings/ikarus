var dic = require('./dic');

var rpc = dic.get('RpcListener');
var wepApp = dic.get('WebAppListener');

rpc.listen();
wepApp.listen();
