var limit = 10;

Template.combat_reports.onCreated(function() {
  limit = 10;
  this.subscribe('combatLogHeaders', limit);
});

Template.combat_reports.events({
  'click .js-load-more': function(event, template) {
    limit += 10;
    template.subscribe('combatLogHeaders', limit);
  },
});

Template.combat_reports.helpers({
  logs: function() {
    return CombatLog.getAll();
  },
});