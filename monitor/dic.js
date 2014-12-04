module.exports = (function(){
  var DIC = require('./lib/dic/DIC');
  var dic = new DIC();

  dic.register('Config', function(dic) {
    return require('./config');
  });

  dic.register('Monitor', function (dic) {
    var Monitor = require('./src/app/monitor');
    return new Monitor(
      require('sock-rpc'),
      require('./config'),
      dic.get('GameData'),
      dic.get('WebAppClient'),
      dic.get('BattlEyeClient')
    );
  });

  dic.register('GameData', function (dic) {
    var GameData = require('./src/app/gameData');
    return new GameData();
  });

  dic.register('WebAppClient', function (dic) {
    var WebAppClient = require('./src/app/webAppClient');
    var DDPClient = require('ddp');
    return new WebAppClient(
      new DDPClient()
    );
  });

  dic.register('BattlEyeClient', function (dic) {
    return require('./src/app/battlEyeClient')();
  });

  return dic;
})();