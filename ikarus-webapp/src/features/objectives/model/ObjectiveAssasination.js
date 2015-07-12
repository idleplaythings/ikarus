ObjectiveAssasination = function ObjectiveAssasination() {
  Objective.call(this);

  this.name = "Assasination";
  this.minPlayers = 1;
  this.maxPlayers = 1;

  this.description = "Assasination";

  this._lootTransform = {
    'assasination_objective_reward1': [
      'IKRS_loot_valuables',
      'IKRS_loot_valuables'
    ],
    'assasination_objective_reward2': [
      'IKRS_loot_valuables',
      'IKRS_loot_assasin'
    ],
  };

};

ObjectiveAssasination.prototype = Object.create(Objective.prototype);