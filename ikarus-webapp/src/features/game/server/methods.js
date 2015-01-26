Meteor.methods({
  'missionLoot': function(serverName, squadId, loot, objectiveName){
    var server = Server.getByName(serverName);
    server.authenticateOrError();

    console.log("loot received", serverName, squadId, loot);
    dic.get('LootController').receiveLoot(squadId, loot, objectiveName);
  }
});