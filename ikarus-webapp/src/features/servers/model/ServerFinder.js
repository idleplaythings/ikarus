ServerFinder = function ServerFinder (){}

ServerFinder.prototype.findServer = function (squad) {
  var servers = Server.getAllWaiting();

  return servers.filter(function(server){
    var hasTime = server.getStatusChanged().add(Server.TIME_WAIT_FOR_NEWSQUADS, 'minutes').isAfter(moment());

    return server.canFit(squad) && hasTime;
  }).pop();
}