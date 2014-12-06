Meteor.publish('SquadsOnServer', function(serverId){
  var server = collections.ServerCollection.findOne({name: serverId});

  if ( ! server){
    this.ready();
    return;
  }

  return [
    collections.SquadCollection.find({serverId: server._id}),
    collections.SquadMemberCollection.find({serverId: server._id})
  ];
});