Objective = function Objective() {
  this.name = "";
  this.minPlayers = 1;
  this.maxPlayers = null;

  this.description = "";
};

Objective.getObjectives = function() {
  return [
    new ObjectiveSupply(),
    new ObjectiveGuard()
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

Objective.prototype.transformLoot = function() {
  return [];
};

Objective.prototype.validate = function(squad) {
  return true;
};