ObjectiveGuard = function ObjectiveGuard() {
  this.name = "Guard";
  this.minPlayers = 1;
  this.maxPlayers = 3;
  this.defaultsTo = new ObjectiveSupply();

  this.description = "You will be guarding one of the objective depots."
   + " You will be provided with default equipment, but please take"
   + " other equipment too in case you don't get the this mission";
};

ObjectiveGuard.prototype = Object.create(Objective.prototype);

ObjectiveGuard.prototype.allowLoot = function() {
  return false;
};

ObjectiveGuard.prototype.transformLoot = function(loot) {
  var transform = {
    'guard_objective_reward1': [
      'IKRS_loot_civilian_weapons',
      'IKRS_loot_old_RU_weapons'
    ],
    'guard_objective_reward2': [
      'IKRS_loot_common_RU_weapons'
    ],
  };

  var result = [];

  loot.map(function(lootEntry){
    if (transform[lootEntry]){
      return transform[lootEntry];
    }
    return null;
  }).filter(function(lootEntry){
    return lootEntry;
  }).forEach(function(lootEntry){
    result = result.concat(lootEntry);
  });

  console.log("guard mission transfomr loot", result);

  return result;
};

ObjectiveGuard.prototype.validate = function(squad) {

  if (squad.getSteamIds().length <= this.maxPlayers
    && squad.getSteamIds().length >= this.minPlayers) {
    return true;
  }

  return false;
};