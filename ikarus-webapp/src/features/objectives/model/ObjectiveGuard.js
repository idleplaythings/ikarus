ObjectiveGuard = function ObjectiveGuard() {
  Objective.call(this);

  this.name = "Guard";
  this.minPlayers = 1;
  this.maxPlayers = 3;
  this.defaultsTo = new ObjectiveSupply();

  this._lootTransform = {
    'guard_objective_reward1': [
      'IKRS_guard_kill_reward',
    ],
    'guard_objective_reward2': [
      'IKRS_guard_survive_reward'
    ],
  };

  this._lootTransformPenalty = {
    'guard_objective_reward1': [
      'IKRS_guard_kill_reward'
    ]
  };

  this.description = "You will be guarding one of the objective depots."
   + " You will be provided with default equipment, but please take"
   + " other equipment too in case you don't get this mission";
};

var ObjectiveGuard_PENALTY = "guard_objective_penalty";

ObjectiveGuard.prototype = Object.create(Objective.prototype);

ObjectiveGuard.prototype.getLootTransform = function(loot) {
  var penaltyCount = loot.filter(function(entry) {
    return entry == ObjectiveGuard_PENALTY;
  }).length;

  if (penaltyCount == 1) {
    return this._lootTransformPenalty;
  }

  if (penaltyCount > 1) {
    return [];
  }

  return this._lootTransform;
};

ObjectiveGuard.prototype.allowLoot = function() {
  return true;
};

ObjectiveGuard.prototype.validate = function(squad) {

  if (squad.getSteamIds().length <= this.maxPlayers
    && squad.getSteamIds().length >= this.minPlayers) {
    return true;
  }

  return false;
};