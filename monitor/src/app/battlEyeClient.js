var BattleNode = require('battle-node');
var Q = require('q');

module.exports = function(config){
  'use strict';

  function BattlEyeClient(config) {
    this._config = config;
    this._client = null;
  }

  BattlEyeClient.prototype.runCommand = function(callback) {
    if (this._client === null){
      this._client = this.login();
    }

    this._client
      .then(callback)
      .fail(function(){
        this._client = null;
        this.runCommand(callback)
      }.bind(this));
  };

  BattlEyeClient.prototype.login  = function(){
    var deferred = Q.defer();
    var battleNode = new BattleNode(this._config);
    battleNode.login();
    battleNode.on(
      'login',
      function(error, success) {
        if (error){
          console.log("Unable to log in to battle eye");
          deferred.reject(new Error("Unable to log in to battle eye"));
        }else if (success == false) {
          console.log("Unable to log in to battle eye (success false)");
          deferred.reject(new Error("Unable to log in to battle eye (success false)"));
        }else {
          deferred.resolve(battleNode);
        }
      }
    );

    battleNode.on(
      'disconnected',
      function() {
        console.log("BattlEye disconnected");
        deferred.reject();
        this._client = null;
      }.bind(this)
    );

    return deferred.promise;
  };

  BattlEyeClient.prototype.lockServer = function(){
    this.runCommand(function(battleNode){
      battleNode.sendCommand('#lock', function() {
        console.log("server locked");
      });
    });
  };

  BattlEyeClient.prototype.kickPlayer = function(uid){
    this.runCommand(function(battleNode){
      battleNode.sendCommand('#kick '+ uid, function() {
        console.log("player " + uid + " kicked");
      });
    });
  };

  return new BattlEyeClient(config);
};
