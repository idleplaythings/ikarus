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
    repo.moveFromInventory(
      repo.getByPlayer(player),
      repo.getByCompany(company),
      armaClass
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
