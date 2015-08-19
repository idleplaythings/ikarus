ObjectiveManhunt = function ObjectiveManhunt() {
  Objective.call(this);

  this.name = "Manhunt";
  this.minPlayers = 1;
  this.maxPlayers = null;

  this.description = "";
};

ObjectiveManhunt.prototype = Object.create(Objective.prototype);