Router.map(function () {
  this.route('home', {
    path: '/',
    template: 'home',
    layoutTemplate: 'ikarus_default',

    subscriptions: function(){
      return Meteor.subscribe('UserData');
    }
  });
});