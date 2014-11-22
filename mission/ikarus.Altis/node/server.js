"use strict"; 

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('test.db');

db.run('CREATE TABLE IF NOT EXISTS foobar (ready INTEGER PRIMARY KEY)', function(err) {
    db.run('DELETE FROM foobar', function(err) {
        db.run('INSERT INTO foobar (ready) VALUES (0)');            
    });    
});

var rpc = require('sock-rpc'); 

rpc.register('isReady', function(callback) {
    db.get('SELECT * FROM foobar', function(err, result) {
        console.log(result.ready);
        callback(null, result.ready);
    });
});

rpc.listen("::1", 1337);  
