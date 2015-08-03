Router.map(function () {
  this.route('/players/:_id', {
    name: 'player stats',
    template: 'player_stats',
    layoutTemplate: 'ikarus_default',

    data: function() {
      if (this.ready()) {
        return Player.getByMeteorId(this.params._id);
      }
    },

    subscriptions: function () {
      return Meteor.subscribe('Player', this.params._id);
    }
  });

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