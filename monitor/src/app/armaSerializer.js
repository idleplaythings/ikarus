
module.exports = ArmaSerializer;

function ArmaSerializer(){};

ArmaSerializer.prototype.serializeForArma = function(squads, inventories){
  return squads.map(function(squad){
    return serializeSquad(
      squad,
      getInventoryForSquad(squad, inventories)
    );
  });
}

function getInventoryForSquad(squad, inventories){
  return inventories.filter(function(inventory){
    return inventory.squadId === squad._id;
  }).pop();
}

function serializeSquad(squad, inventory){

  return [
    squad._id,
    squad.steamIds,
    [squad.startingLocation.x, squad.startingLocation.y],
    serializeInventory(inventory),
    null,
    null,
    [],
    squad.objective,
    [],
    [],
    serializeGear(squad.gear)
  ];
};

function serializeInventory(inventory){
  if (! inventory) {
    return [];
  }

  return Object.keys(inventory.items).map(function(key){
    return [key, inventory.items[key]];
  });
};

function serializeGear(gear){
  if (! gear) {
    return [];
  }

  return gear.map(function(entry){
    return [entry.steamId, entry.headgear, entry.vest, entry.uniform];
  });
};