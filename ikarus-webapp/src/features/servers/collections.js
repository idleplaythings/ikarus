
if (typeof collections == 'undefined'){
  collections = {};
}

collections.ServerCollection = new Meteor.Collection("servers");

collections.ServerQueueCollection = new Meteor.Collection("serverQueues");

Meteor.startup(function(){
  if (collections.ServerQueueCollection.find().fetch().length === 0) {
    collections.ServerQueueCollection.insert({
      queue: [],
      region: 'EU'
    });
  }
});