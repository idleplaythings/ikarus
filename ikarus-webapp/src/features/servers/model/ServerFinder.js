ServerFinder = function ServerFinder (){}

ServerFinder.prototype.findServer = function (squad) {
  var servers = Server.getAllWaiting();

  return servers.filter(function(server){
    return this.canHaveSquad(squad, server);
  }.bind(this)).pop();
};

ServerFinder.prototype.canHaveSquad = function (squad, server) {
  var hasTime = server.getStatusChanged().add(Server.TIME_WAIT_FOR_NEWSQUADS, 'minutes').isAfter(moment());

  return server.canFit(squad) &&
    hasTime &&
    server.doesNotHaveSquadsFromSameCompany(squad);
};