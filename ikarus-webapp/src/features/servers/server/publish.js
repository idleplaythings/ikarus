Meteor.publish('Servers', function(){
  return [
    collections.ServerCollection.find(),
    collections.ServerQueueCollection.find()
  ];
});

Meteor.publish('Server', function(serverId){
  return [
    collections.ServerCollection.find({_id: serverId})
  ];
});

Meteor.publish('PlayersInList', function(ids){
  return Meteor.users.find(
    {
      'services.steam.id': {$in: ids}
    },
    {
      fields: {
        'services.steam': 1,
        'companyId': 1,
        'invites': 1
      }
    });
});