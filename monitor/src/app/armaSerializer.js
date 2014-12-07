
module.exports = ArmaSerializer;

function ArmaSerializer(){};

ArmaSerializer.prototype.serializeForArma = function(squads, members){
  return squads.map(function(squad){
    return serializeSquad(
      squad,
      getMembersForSquad(squad, members)
    );
  });
}

function getMembersForSquad(squad, members){

  return squad.steamIds.map(function(steamId){
    return members.filter(function(member){
      return member.steamId === steamId;
    }).pop()
  }).filter(function(member){
    return Boolean(member);
  });

}

function serializeSquad(squad, squadMembers){

  return [
    squad._id,
    squad.steamIds,
    [squad.startingLocation.x, squad.startingLocation.y],
    squadMembers.map(serializeMember),
    null,
    null,
    [],
    squad.objectives,
    []
  ];
};

function serializeMember(member){
  return [
    member.steamId,
    serializeInventory(member.inventory)
  ];
};

function serializeInventory(inventory){
  return Object.keys(inventory.items).map(function(key){
    return [key, inventory.items[key]];
  });
};