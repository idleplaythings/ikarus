"use strict"; 

var config = {
  ip: '127.0.0.1',
  port: 2302,
  rconPassword: 'kiiski'
};

var serverManager = new (require('./serverManager.js'))(config);

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('test.db');

db.run('CREATE TABLE IF NOT EXISTS foobar (ready INTEGER PRIMARY KEY)', function(err) {
  db.run('DELETE FROM foobar', function(err) {
    db.run('INSERT INTO foobar (ready) VALUES (0)');            
  });    
});

var rpc = require('sock-rpc'); 

rpc.register('isReady', function(callback) {
  console.log("isReady");
  db.get('SELECT * FROM foobar', function(err, result) {
    console.log(result.ready);
    callback(null, result.ready);
  });
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
