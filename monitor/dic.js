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
    console.log("gamedata dic:", dic.get('ArmaSerializer'));
    return new GameData(
      dic.get('ArmaSerializer')
    );
  });

  dic.register('ArmaSerializer', function (dic) {
    var ArmaSerializer = require('./src/app/armaSerializer');
    console.log("ArmaSerializer dic:", ArmaSerializer);
    return new ArmaSerializer();
  });


  dic.register('WebAppClient', function (dic) {
    var WebAppClient = require('./src/app/webAppClient');
    var DDPClient = require('ddp');
    return new WebAppClient(
      new DDPClient()
    );
  });

  dic.register('BattlEyeClient', function (dic) {
    return require('./src/app/battlEyeClient')(
      dic.get('Config').battlEye
    );
  });

  return dic;
})();