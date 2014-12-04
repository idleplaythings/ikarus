Meteor.publish('MySquad', function(){
  if (! this.userId){
    this.ready();
    return;
  }

  var user = Meteor.users.findOne({_id: this.userId});
  var steamId = user.services.steam.id;
  console.log(user.squadId);

  return [
    collections.SquadCollection.find({members: {$in: [steamId]}}),
    collections.SquadsOnServerCollection.find({squadId: user.squadId})
  ];
});

Meteor.publish('SquadsOnServer', function(serverId){
  var server = collections.GameServerCollection.findOne({name: serverId});

  if ( ! server){
    this.ready();
    return;
  }

  return collections.SquadsOnServerCollection.find({serverId: server._id});
});