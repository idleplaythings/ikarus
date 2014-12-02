
module.exports = function(config){
  'use strict';

  var BattleNode = require('battle-node');

  function BattlEyeClient(config) {
    this._config = config;
  }

  BattlEyeClient.prototype.lockServer = function(){
    var battleNode = new BattleNode(this._config);
    battleNode.login();
    battleNode.on(
      'login',
      function(error, success) {
        console.log("server locked");
        battleNode.sendCommand('#lock', function() {});
      }
    );
  };

  BattlEyeClient.prototype.kickPlayer = function(uid){
    var battleNode = new BattleNode(this._config);
    battleNode.login();
    battleNode.on(
      'login',
      function(error, success) {
        console.log("player " + uid + " kicked");
        battleNode.sendCommand('#kick '+ uid, function() {});
      }
    );
  };
  
  BattlEyeClient.prototype.shutDownServer = function(uid){
    console.log("TODO: implement battleye shutDownServer");
  };

  return new BattlEyeClient(config);
};
