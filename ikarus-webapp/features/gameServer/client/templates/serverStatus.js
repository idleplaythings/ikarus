Template.serverStatus.helpers({
  created: function() {
    Meteor.subscribe('serverStatus');
  },
  servers: function() {
    return dic.get('GameServerRepository').getAll();
  }
});