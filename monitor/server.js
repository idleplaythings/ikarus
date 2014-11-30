"use strict"; 

var BEconfig = {
  ip: '127.0.0.1',
  port: 2302,
  rconPassword: 'kiiski'
};

var serverManager = new (require('./serverManager.js'))(BEconfig);
var gameDataController = new (require('./gameData/gameDataController.js'))();

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('test.db');

var rpc = require('sock-rpc'); 

rpc.register('getSquadData', function(callback) {
  console.log("getSquadData");
  
  var squadData = gameDataController.getSquadData();
  callback(null, squadData);
  
});

rpc.register('submitSquadData', function(squadId, loot, callback) {
  console.log("submitSquadData");
  gameDataController.receiveSquadData(squadId, loot);
  callback(null, null);
});

rpc.register('lockServer', function(callback) {
  console.log("lock server call");
  serverManager.lockServer();
  callback(null, "");  
});

rpc.register('kickPlayer', function(uid, callback) {
  console.log("call to kick " + uid);
  console.log(arguments);
  serverManager.kickPlayer(uid);
  callback(null, "");  
});

rpc.listen("::1", 1337);
