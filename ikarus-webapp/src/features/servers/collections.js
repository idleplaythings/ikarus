
if (typeof collections == 'undefined'){
  collections = {};
}

collections.ServerCollection = new Meteor.Collection("servers");

collections.ServerQueueCollection = new Meteor.Collection("serverQueues");