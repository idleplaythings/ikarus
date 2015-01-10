Router.map(function () {
  this.route('home', {
    path: '/',
    template: 'home',
    layoutTemplate: 'ikarus_default',

    waitOn: function(){
      Meteor.subscribe('UserData');
    }
  });
});