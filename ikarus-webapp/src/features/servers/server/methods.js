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
  },

  'SetServerSetting': function (serverId, settings) {

    var server = Server.getById(serverId);

    if (! server){
      throw new Meteor.Error(404, "server not found");
    }

    if (! Player.getCurrent() || ! Player.getCurrent().isAdmin()) {
      throw new Meteor.Error(404, 'Method not found');
    }

    Object.keys(settings).forEach(function(key) {
      if (key !== 'squadsToAbort' &&
        key !== 'squadsToStart' &&
        key !== 'waitingTime' &&
        key !== 'maxPlayers'
      ) {
        throw new Meteor.Error(400, 'Unidentified server setting: ' + key);
      }

      if (! isInt(settings[key])) {
        throw new Meteor.Error(400, 'Unacceptable server settings value ' + settings[key]);
      }
    });

    server.updateSettings(settings);
  }
});

function isInt(value) {
  return ! isNaN(value) &&
    parseInt(Number(value)) == value &&
   ! isNaN(parseInt(value, 10));
}