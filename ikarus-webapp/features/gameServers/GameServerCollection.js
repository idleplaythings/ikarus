
if (typeof collections == 'undefined'){
  collections = {};
}

collections.GameServerCollection = new Meteor.Collection("gameServers");

if ( ! collections.GameServerCollection.findOne()) {
  collections.GameServerCollection.insert({
    _id: 'test-server',
    status: 'down',
    players: []
  })
}