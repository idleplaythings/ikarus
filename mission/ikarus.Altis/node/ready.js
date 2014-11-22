"use strict"; 

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('test.db');

db.run('UPDATE foobar SET ready = 1');
