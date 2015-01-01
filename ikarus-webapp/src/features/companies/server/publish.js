Meteor.publish('MySquad', function(){
  if (! this.userId){
    this.ready();
    return;
  }

  var user = Meteor.users.findOne({_id: this.userId});
  var steamId = user.services.steam.id;

  return [
    // collections.CompanyCollection.find({playerIds: {$in: [steamId]}}),
    collections.CompanyCollection.find({}),
    collections.SquadCollection.find({squadId: user.squadId}),
    collections.InventoryCollection.find({$or: [{steamId: steamId}, {companyId: user.companyId}]})
  ];
});