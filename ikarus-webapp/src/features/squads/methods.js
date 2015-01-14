var namespace = this;

Meteor.methods({
  'changeObjective' : function(name) {
    var squad = Squad.getCurrent();

    if (! squad) {
      throw new Meteor.Error('Not found', 'Squad not found');
    }

    var objective = namespace['Objective' + name]
      ? new namespace['Objective' + name] : null;

    if (! objective) {
      throw new Meteor.Error('Not found', 'Objective not found');
    }

    if (! objective.validate(squad)) {
      throw new Meteor.Error('Invalid objective', 'Invalid objective');
    }

    if (squad.isLocked()) {
      return;
    }

    squad.setObjective(objective);
  }
});