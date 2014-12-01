module.exports = (function(){

  var DIC = require('./dic/DIC');
  var dic = new DIC();
  var config = require('./config');

  dic.register('GameData', function (dic) {
    var GameData = require('./gameData/gameData');
    return new GameData();
  });

  dic.register('RpcClient', function (dic) {
    var RpcClient = require('./arma/rpcClient');

    return new RpcClient(
      config.rpc.port,
      dic.get('GameData'),
      dic.get('WebAppClient'),
      dic.get('BattlEyeClient')
    );
  });

  dic.register('BattlEyeClient', function (dic) {
    var BattlEyeClient = require('./arma/battlEyeClient');

    return new BattlEyeClient(
      config.battlEye
    );
  });

  dic.register('WebAppClient', function (dic) {
    var WebAppClient = require('./webApp/webAppClient');

    return new WebAppClient(
      config.webApp.host,
      config.webApp.port,
      config.arma.serverId
    );
  });

  return dic;
})();
