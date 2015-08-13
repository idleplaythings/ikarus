Meteor.methods({
  'missionLoot': function(serverName, squadId, loot, objectiveName){
    var server = Server.getByName(serverName);
    server.authenticateOrError();
    dic.get('LootController').receiveLoot(squadId, loot, objectiveName);
  },

  'outpostChanges': function(serverName, squadId, changes){
    var server = Server.getByName(serverName);
    server.authenticateOrError();
   	dic.get('OutpostController').outpostChanges(squadId, changes);
  },

  'raids': function(serverName, raids){
    var server = Server.getByName(serverName);
    server.authenticateOrError();
    dic.get('RaidController').receiveRaidResults(server, raids);
  },
});