Meteor.methods({
  'addToInventory': function(armaClass){
    var player = getPlayer();
    var company = getCompany(player);
    var repo = dic.get('InventoryRepository');
    repo.moveFromInventory(
      repo.getByCompany(company),
      repo.getByPlayer(player),
      armaClass
    );
  },

  'removeFromInventory': function(armaClass){
    var player = getPlayer();
    var company = getCompany(player);

    var repo = dic.get('InventoryRepository');

    var armory = repo.getByCompany(company);
    repo.moveFromInventory(
      repo.getByPlayer(player),
      armory,
      armaClass
    );

    var inventory = repo.getByPlayer(player);

    inventory.getOrphanedMagazines().forEach(
      function (orphan){
        repo.moveFromInventory(
          inventory,
          armory,
          orphan.armaClass
        )
      }
    );
  }
});

function getPlayer(){
  var player = Player.getCurrent();

  if (! player){
    throw new Meteor.Error(404, 'Player not found');
  }

  var squad = Squad.getByPlayer(player);

  if (! squad){
    throw new Meteor.Error(404, 'Squad not found');
  }

  return player;
}

function getCompany(player) {
  return player.getCompany();
}
