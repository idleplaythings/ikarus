Template.servers_status.created = function () {
  Meteor.subscribe('Users');
  Meteor.subscribe('Servers');
  Meteor.subscribe('Companies');
};

Template.servers_status.helpers({
  server: function () {
    return Server.getById(this.serverId);
  }
});
