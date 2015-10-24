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

  this.route('rewards', {
    path: '/rewards',
    template: 'rewards',
    layoutTemplate: 'ikarus_default',
  });

  this.route('credits', {
    path: '/credits',
    template: 'credits',
    layoutTemplate: 'ikarus_default'
  });

  this.route('concepts', {
    path: '/concepts',
    template: 'concepts',
    layoutTemplate: 'ikarus_default'
  });

  this.route('objectives', {
    path: '/objectives',
    template: 'objectives',
    layoutTemplate: 'ikarus_default'
  });
});