"use strict"; 

var rpc = require('sock-rpc'); 
console.log(rpc);
/** 
 *  Echo back all arguments passed. 
 *  echo(...,callback); 
 */ 
rpc.register("echo", function () { 
  var args = Array.prototype.slice.call(arguments, 0); 
  var callback = args.pop(); 
  callback(null, args); 
}); 

/** 
 *  Get date (no arguments) 
 */ 
rpc.register("getDate", function (callback) { 
  callback(null, new Date().toString()); 
}); 

rpc.listen("::1", 1337);  
