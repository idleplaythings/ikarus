Meteor.methods({
  'registerGameServer': function(name) {
    return dic.get('GameServerService').registerServer(name);
  }
});