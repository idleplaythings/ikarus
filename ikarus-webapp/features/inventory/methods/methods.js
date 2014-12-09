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
  var player = dic.get('PlayerRepository').getCurrent();

  if (! player){
    throw new Meteor.Error(404, 'Player not found');
  }

  var squad = dic.get('SquadRepository').getByPlayer(player);

  if (! squad){
    throw new Meteor.Error(404, 'Squad not found');
  }

  return player;
}

function getCompany(player){
  var company = dic.get('CompanyRepository').getByPlayer(player);

  if (! company){
    throw new Meteor.Error(404, 'Company not found');
  }

  return company;
}
