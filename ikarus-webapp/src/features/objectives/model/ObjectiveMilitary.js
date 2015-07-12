ObjectiveMilitary = function ObjectiveMilitary() {
  Objective.call(this);

  this.name = "Military Base raid";
  this.minPlayers = 1;
  this.maxPlayers = 1;

  this.description = "Military Base raid";

};

ObjectiveMilitary.prototype = Object.create(Objective.prototype);