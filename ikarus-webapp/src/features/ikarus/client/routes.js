Router.map(function () {
  this.route('home', {
    path: '/',
    template: 'home',
    layoutTemplate: 'ikarus_default',

    subscriptions: function(){
      return Meteor.subscribe('UserData');
    }
  });

  this.route('howtoplay', {
    path: '/howtoplay',
    template: 'howtoplay',
    layoutTemplate: 'ikarus_default',

    subscriptions: function(){
      return Meteor.subscribe('UserData');
    }
  });
});