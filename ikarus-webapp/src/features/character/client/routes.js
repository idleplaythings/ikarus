Router.map(function () {
  this.route('/character', {
    name: 'character',
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

    subscriptions: function(){
      return Meteor.subscribe('UserData');
    }
  });
});