module.exports = (function(){

  var DIC = require('./source/dic/DIC');
  var dic = new DIC();
  var config = require('./config');

  dic.register('GameData', function (dic) {
    var GameData = require('./source/gameData/gameData');
    return new GameData();
  });

  dic.register('RpcListener', function (dic) {
    return require('./source/arma/rpcListener')(
      config.rpc.port,
      dic.get('GameData'),
      dic.get('WebAppClient'),
      dic.get('BattlEyeClient')
    );
  });

  dic.register('BattlEyeClient', function (dic) {
    return require('./source/arma/battlEyeClient')(
      config.battlEye
    );
  });

  dic.register('WebAppClient', function (dic) {
    return require('./source/webApp/webAppClient')(
      config.webApp.host,
      config.webApp.port,
      config.arma.serverId
    );
  });

  dic.register('WebAppListener', function (dic) {
    return require('./source/webApp/webAppListener')(
      config.webAppListener.port
    );
  });

  return dic;
})();
