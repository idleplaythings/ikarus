Meteor.methods({
  'submitLog': function (serverName, serialized) {
    var server = Server.getByName(serverName);

    if (! server) {
      throw new Meteor.Error('Not found', 'Server not found');
    }

    server.authenticateOrError();

    var log = new EventLog(serialized);
    dic.get('LogController').process(log);
  }
})