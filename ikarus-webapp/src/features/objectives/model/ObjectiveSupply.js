ObjectiveSupply = function ObjectiveSupply() {
  Objective.call(this);

  this.name = "Supply";
  this.minPlayers = 1;
  this.maxPlayers = null;

  this.description = "Map will contain one or more supply depots."
   + " These supply depots will contain boxes, that will open when"
   + " 20 minutes of game time has elapsed and when a player has been"
   + " near to a box for a while. The box will contain loot backpacks"
   + " that you must bring back to the hideout";
};

ObjectiveSupply.prototype = Object.create(Objective.prototype);