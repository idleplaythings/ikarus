ObjectiveAssasination = function ObjectiveAssasination() {
  Objective.call(this);

  this.name = "Assasination";
  this.minPlayers = 1;
  this.maxPlayers = 1;

  this.description = "Assasination";
};

ObjectiveAssasination.prototype = Object.create(Objective.prototype);