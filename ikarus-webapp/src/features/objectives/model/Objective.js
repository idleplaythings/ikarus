Objective = function Objective() {
  this.name = "";
  this.minPlayers = 1;
  this.maxPlayers = null;

  this.description = "";

  this._lootTransform = {};
};

Objective.getObjectives = function() {
  return [
    new ObjectiveSupply(),
    new ObjectiveGuard(),
    new ObjectiveHold()
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

Objective.prototype.getLootTransform = function(loot) {
  return this._lootTransform;
};

Objective.prototype.getAdditionalLoot = function(loot) {
  var result = [];
  var lootTransform = this.getLootTransform(loot);

  loot
    .map(function(lootEntry){
      if (lootTransform[lootEntry]){
        return lootTransform[lootEntry];
      }
      return null;
    }.bind(this))
    .filter(_.identity)
    .forEach(function(lootEntry){
      result = result.concat(lootEntry);
    });

  if (loot.indexOf('IKRS_signal_transmitter_activation_reward') !== -1
    && loot.indexOf('IKRS_signal_box_opening_reward') !== -1) {
    result.push('IKRS_signal_total_completion');
  }

  var deliverySuccesses = loot.filter(function (entry) {
    return entry == 'IKRS_delivery_delivery_success';
  });

  var deliveryDenys = loot.filter(function (entry) {
    return entry == 'IKRS_delivery_deny';
  });

  if (deliverySuccesses.length > 0) {
    result.push('IKRS_delivery_reward_' + deliverySuccesses.length);
  }

  if (deliveryDenys.length > 0) {
    result.push('IKRS_delivery_reward_deny_' + deliveryDenys.length);
  }

  return result;
};

Objective.prototype.validate = function(squad) {
  return true;
};