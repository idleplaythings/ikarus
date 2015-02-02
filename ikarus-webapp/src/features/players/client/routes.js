Router.map(function () {
  this.route('/players', {
    name: 'players',
    template: 'players_list',
    layoutTemplate: 'ikarus_default',

    data: function() {
      return {
        search: true
      };
    },

    subscriptions: function () {
      return [
        Meteor.subscribe('UserData'),
        Meteor.subscribe('MyCompanyAndSquads')
      ];
    }
  });
});