module.exports = function(port){
  'use strict';

  var http = require('http');

  function WebAppListener(port){
    this._port = port;
    this._server = null;
  }

  WebAppListener.prototype.listen = function(){
    this._server = http.createServer(function(request, response){

    }.bind(this));

    this._server.listen(this._port);
  };
  return new WebAppListener(port);
};