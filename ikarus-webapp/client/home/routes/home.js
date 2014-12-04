Router.map(function () {
  this.route('home', {
    path: '/',
    template: 'home',

    waitOn: function(){
      Meteor.subscribe('UserData');
    }
  });
});