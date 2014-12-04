var BattleNode = require('battle-node');

module.exports = function(){
  'use strict';

  function BattlEyeClient() {
  }

  BattlEyeClient.prototype.lockServer = function(config){
    var battleNode = new BattleNode(config);
    battleNode.login();
    battleNode.on(
      'login',
      function(error, success) {
        console.log("server locked");
        battleNode.sendCommand('#lock', function() {});
      }
    );
  };

  BattlEyeClient.prototype.kickPlayer = function(config, uid){
    var battleNode = new BattleNode(config);
    battleNode.login();
    battleNode.on(
      'login',
      function(error, success) {
        console.log("player " + uid + " kicked");
        battleNode.sendCommand('#kick '+ uid, function() {});
      }
    );
  };

  BattlEyeClient.prototype.shutDownServer = function(config, uid){
    console.log("TODO: implement battleye shutDownServer");
  };

  return new BattlEyeClient();
};
