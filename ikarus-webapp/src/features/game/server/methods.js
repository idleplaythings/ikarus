Meteor.methods({
  'missionLoot': function(serverName, squadId, loot, objectiveName){
    console.log("loot received", serverName, squadId, loot);
    dic.get('LootController').receiveLoot(squadId, loot, objectiveName);
  }
});