Objective = function Objective() {
  this.name = "";
  this.minPlayers = 1;
  this.maxPlayers = null;

  this.description = "";
};

Objective.getObjectives = function() {
  return [
    new ObjectiveSupply(),
    new ObjectiveGuard(),
    new ObjectiveHold()
  ];
}

Objective.prototype.getPlayerRequirementString = function() {
  var s = this.minPlayers + "";
  if (! this.maxPlayers){
    s += "+";
  } else {
    s += "-" + this.maxPlayers;
  }

  return s;
};

Objective.prototype.allowLoot = function() {
  return true;
};

Objective.prototype.transformLoot = function(loot) {
  var transform = {
    'supply_objective_opening_reward1': [
      'IKRS_loot_smg_weapons'
    ]
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

  console.log("SMG mission transform loot", result);

  return result;
};

Objective.prototype.validate = function(squad) {
  return true;
};