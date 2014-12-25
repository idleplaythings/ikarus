(function(){Meteor.publish('SquadsOnServer', function(serverName){
  var server = collections.ServerCollection.findOne({name: serverName});

  if ( ! server){
    this.ready();
    return;
  }

  return [
    collections.SquadCollection.find({serverId: server._id}),
    collections.InventoryCollection.find({serverId: server._id})
  ];
});

})();
