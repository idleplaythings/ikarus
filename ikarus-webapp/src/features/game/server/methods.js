Meteor.methods({
  'missionLoot': function(serverName, squadId, loot){
    console.log("loot received", serverName, squadId, loot);
    dic.get('LootController').receiveLoot(squadId, loot);
  }
});