ServerFinder = function ServerFinder (){}

ServerFinder.prototype.findServer = function (squad) {
  var servers = Server.getAllWaiting();

  servers.filter(function(server){
    return ! server.canFit(squad);
  });

  return servers.pop();
}