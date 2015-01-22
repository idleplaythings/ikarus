Meteor.publish('Servers', function(){
  return [
    collections.ServerCollection.find(),
    collections.ServerQueueCollection.find()
  ];
});