var BattleNode = require('battle-node');
var fs = require('fs');

module.exports = ServerManager;

function ServerManager(config) {
  this._config = config;
}

ServerManager.prototype.lockServer = function(){
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

ServerManager.prototype.kickPlayer = function(uid){
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