ObjectiveRaid = function ObjectiveRaid() {
  Objective.call(this);

  this.name = "Raid";
  this.minPlayers = 4;
  this.maxPlayers = null;

  this.description = "";
};

ObjectiveRaid.prototype = Object.create(Objective.prototype);