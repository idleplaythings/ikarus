ObjectiveHold = function ObjectiveHold() {
  this.name = "Hold";
  this.minPlayers = 1;
  this.maxPlayers = null;
  this.defaultsTo = new ObjectiveSupply();

  this.description = "You must take and hold one of the depots."
   + " When you have held the depot for 10 minutes, you will get a location"
   + " of a supply drop. Secure and loot that drop.";
};

ObjectiveHold.prototype = Object.create(Objective.prototype);

ObjectiveGuard.prototype.validate = function(squad) {
  if (squad.getSteamIds().length >= this.minPlayers) {
    return true;
  }

  return false;
};