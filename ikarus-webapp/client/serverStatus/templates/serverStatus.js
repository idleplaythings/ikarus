Template.serverStatus.helpers({
  created: function() {
    Meteor.subscribe('serverStatus');
  },
  servers: function() {
    var s = dic.get('GameServerRepository').getServers();
    console.log(s); return s;
  }
});