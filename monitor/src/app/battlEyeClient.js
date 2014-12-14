var BattleNode = require('battle-node');

module.exports = function(){
  'use strict';

  function BattlEyeClient() {}

  BattlEyeClient.prototype.login  = function(config, callback){
    var battleNode = new BattleNode(config);
    battleNode.login();
    battleNode.on(
      'login',
      function(error, success) {
        if (error){
          throw new Error("Unable to log in to battle eye");
        }

        if (success == false) {
          throw new Error("Unable to log in to battle eye (success false)");
        }

        callback(battleNode);
      }
    );
  });

  BattlEyeClient.prototype.lockServer = function(config){
    this.login(config, function(battleNode){
      battleNode.sendCommand('#lock', function() {
        console.log("server locked");
      });
    });
  };

  BattlEyeClient.prototype.kickPlayer = function(config, uid){
    this.login(config, function(battleNode){
      battleNode.sendCommand('#kick '+ uid, function() {
        console.log("player " + uid + " kicked");
      });
    });
  };

  BattlEyeClient.prototype.shutDownServer = function(config, uid){
    this.login(config, function(battleNode){
      battleNode.sendCommand('#shutdown', function() {
        console.log("server shutdown");
      });
    });
  };

  return new BattlEyeClient();
};
