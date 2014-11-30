Template.serverStatus.created = function() {
  Meteor.subscribe('serverStatus');
};

Template.serverStatus.servers = function() {
  return ServerCollection.find();
}