Meteor.methods({
  'updateServerDetails': function(name, details) {
    var server = Server.getByName(name);
    server.authenticateOrError();

    if (! server){
      throw new Meteor.Error(404, "server not found");
    }

    server.updateDetails(details);
  },

  'updateServerStatus': function(name, status) {
    var server = Server.getByName(name);
    server.authenticateOrError();

    if (! server){
      throw new Meteor.Error(404, "server not found");
    }

    console.log("update server status",name,  status);

    dic.get('ServerQueueService').updateServerStatus(server, status);
  }
});