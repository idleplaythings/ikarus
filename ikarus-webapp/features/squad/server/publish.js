Meteor.publish('MySquad', function(){
  if (! this.userId){
    this.ready();
    return;
  }

  var user = Meteor.users.findOne({_id: this.userId});
  var steamId = user.services.steam.id;

  return [
    collections.SquadCollection.find({members: {$in: [steamId]}}),
    collections.SquadsOnServerCollection.find({squadId: user.squadId})
  ];
});

Meteor.publish('SquadsOnServer', function(serverId){
  collections.SquadsOnServerCollection.find({serverId: serverId});
});