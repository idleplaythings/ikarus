Router.map(function () {
  var process = function (methods) {
    try {
      var method = this.request.method;

      if (Object.keys(methods).indexOf(method) !== -1) {

        var payload = this.request.body;
        var params = this.params;


        methods[method](payload, params, respond.bind(this));
      } else {
        this.response.writeHead(405, {'Allow': Object.keys(methods).join(', ')});
        this.response.end();
      }
    } catch (e) {
      console.log(method, this.request.url);
      console.log(this.request.body);
      console.log(e.stack);

      this.response.writeHead(500, {'Content-Type': 'application/json'});
      this.response.end(JSON.stringify({
        message: e.message,
        stack: e.stack,
      }));
    }
  };

  var respond = function(message) {
    if (! message){
      this.response.writeHead(204, {'Content-Type': 'application/json'});
      this.response.end();
    }
    else
    {
      this.response.writeHead(200, {'Content-Type': 'application/json'});
      this.response.end(JSON.stringify(message));
    }
  };

  this.route('gameServer_status', {
      path: '/gameServerApi/status/:serverId',
      where: 'server',
      action: function () {
        process.call(this, {
          POST: function(payload, params, respond) {
            var serverId = params.serverId;
            var response = dic.get('GameServerService').updateServerStatus(
            serverId, payload);
            respond();
          }
        });
      }
    });
});