Objective = function Objective() {
  this.name = "";
  this.minPlayers = 1;
  this.maxPlayers = null;

  this.description = "";

  this._lootTransform = {
    'supply_objective_opening_reward1': [
      'IKRS_loot_smg_weapons'
    ]
  };
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

Objective.prototype.getLootTransform = function(loot) {
  return this._lootTransform;
};

Objective.prototype.getAdditionalLoot = function(loot) {
  var result = [];
  var lootTransform = this.getLootTransform();

  loot
    .map(function(lootEntry){
      if (lootTransform[lootEntry]){
        return lootTransform[lootEntry];
      }
      return null;
    }.bind(this))
    .filter(_.identity)
    .forEach(function(lootEntry){
      result = result.concat(lootEntry);
    });

  return result;
};

Objective.prototype.validate = function(squad) {
  return true;
};