Template.squad_objective.helpers({
  objectives: function() {
    return Objective.getObjectives();
  },

  getObjectiveClass: function() {

    if (isSelected(this)) {
      return "panel-info";
    }

    if (isInvalid(this)) {
      return "panel-danger";
    }
  },

  isSelected: function() {
    return isSelected(this);
  }

});

Template.squad_objective.events({
  'click .objective' : function(event, template) {
    var name = jQuery(event.target).attr("data-objectiveName");
    console.log(name);

    Meteor.call(
      'changeObjective',
      name,
      function (error, result) {
        console.log(error, result);
      }
    );
  }
});

function isSelected(objective) {
  var squad = Squad.getCurrent();
  var current = squad.getObjective();

  return current.name == objective.name;
}

function isInvalid(objective) {
  var squad = Squad.getCurrent();

  return ! objective.validate(squad);
}