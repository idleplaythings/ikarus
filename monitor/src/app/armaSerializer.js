
module.exports = ArmaSerializer;

function ArmaSerializer(){};

ArmaSerializer.prototype.serializeForArma = function(squads, inventories){
  return squads.map(function(squad){
    return serializeSquad(
      squad,
      getInventoriesForSquad(squad, inventories)
    );
  });
}

function getInventoriesForSquad(squad, inventories){

  return squad.steamIds.map(function(steamId){
    return inventories.filter(function(inventory){
      return inventory.steamId === steamId;
    }).pop()
  }).filter(function(inventory){
    return Boolean(inventory);
  });

}

function serializeSquad(squad, inventories){

  return [
    squad._id,
    squad.steamIds,
    [squad.startingLocation.x, squad.startingLocation.y],
    inventories.map(serializeInventory),
    null,
    null,
    [],
    squad.objectives,
    [],
    []
  ];
};

function serializeInventory(inventory){
  return [
    inventory.steamId,
    Object.keys(inventory.items).map(function(key){
      return [key, inventory.items[key]];
    })
  ];
};