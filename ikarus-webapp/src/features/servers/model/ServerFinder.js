ServerFinder = function ServerFinder (){}

ServerFinder.prototype.findServer = function (squad) {
  var servers = Server.getAllWaiting();

  return servers.filter(function(server){
    return this.canHaveSquad(squad, server);
  }.bind(this)).pop();
};

ServerFinder.prototype.canHaveSquad = function (squad, server) {
  return server.canFit(squad) &&
    server.stillTimeToJoin() &&
    ! server.hasSquadsFromSameCompany(squad);
};