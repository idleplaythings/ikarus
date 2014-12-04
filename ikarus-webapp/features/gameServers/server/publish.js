Meteor.publish('Servers', function(){
  return collections.GameServerCollection.find();
});