
var http = require('http');

module.exports = ServerStatus;

function ServerStatus(status) {
  this._status = status;
};

ServerStatus.prototype.send = function(host, port, serverId){
  var options = {
    hostname: host,
    port: port,
    path: '/gameServerApi/status/' + serverId,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  var req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  // write data to request body
  req.write(JSON.stringify(this._status));
  req.end();
};
