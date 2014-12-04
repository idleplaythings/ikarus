Template.home.created = function(){
  Meteor.subscribe('MySquad');
  Meteor.subscribe('Servers');
};
