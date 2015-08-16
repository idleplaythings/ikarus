Meteor.publish('SquadsOnServer', function(serverName){
  var user = Meteor.users.findOne({_id: this.userId});
  if (!get(user, 'serverId')) {
    this.ready();
    return;
  }

  var server = collections.ServerCollection.findOne({name: serverName});

  if ( ! server){
    this.ready();
    return;
  }

  return [
    collections.ServerCollection.find({_id: server._id}),
    collections.SquadCollection.find({serverId: server._id}),
    collections.InventoryCollection.find({serverId: server._id})
  ];
});