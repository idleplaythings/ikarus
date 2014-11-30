var BattleNode = require('battle-node');
var fs = require('fs');

module.exports = ServerManager;

function ServerManager(config) {
  this._config = config;
}

ServerManager.prototype.lockServer = function(){
  var battleNode = new BattleNode(config);
  battleNode.login();
  battleNode.on(
    'login', 
    function(error, success) {
      bnode.sendCommand('#lock', function() {});
    }
  );
};