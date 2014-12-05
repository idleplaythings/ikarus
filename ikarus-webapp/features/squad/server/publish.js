Meteor.publish('SquadsOnServer', function(serverId){
  var server = collections.GameServerCollection.findOne({name: serverId});

  if ( ! server){
    this.ready();
    return;
  }

  return collections.SquadCollection.find({serverId: server._id});
});