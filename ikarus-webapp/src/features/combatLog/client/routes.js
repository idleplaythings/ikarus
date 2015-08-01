Router.map(function () {
  this.route('/combatReport/:_id', {
    name: 'combat report',
    template: 'combat_report',
    layoutTemplate: 'ikarus_default',

    data: function() {
      var id = this.params._id;

      if (this.ready()){
        return CombatLog.getById(id);
      }
    },

    subscriptions: function () {
      var id = this.params._id;

      return Meteor.subscribe('combatLogById', id);
    }
  });

  this.route('/combatReport', {
    name: 'combat reports',
    template: 'combat_reports',
    layoutTemplate: 'ikarus_default',
  });
});