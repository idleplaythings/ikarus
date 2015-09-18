ObjectiveGuard = function ObjectiveGuard() {
  Objective.call(this);

  this.name = "Guard";
  this.minPlayers = 1;
  this.maxPlayers = 3;
  this.defaultsTo = new ObjectiveSupply();

  this.description = "You will be guarding one of the objective depots."
   + " You will be provided with default equipment, but please take"
   + " other equipment too in case you don't get this mission";
};

ObjectiveGuard.prototype = Object.create(Objective.prototype);

ObjectiveGuard.prototype.validate = function(squad) {};