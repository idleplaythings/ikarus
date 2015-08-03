Router.map(function () {
  this.route('/character', {
    name: 'my-character',
    template: 'character_status',
    layoutTemplate: 'ikarus_default',

    action: function() {
      if (this.ready()) {
        if (! Meteor.user()) {
          Router.go('home');
        } else {
          this.render();
        }
      }
    },

    data: function () {
      if (this.ready()) {
        return Player.getCurrent();
      }
    },

    subscriptions: function(){
      return Meteor.subscribe('UserData');
    }
  });
});