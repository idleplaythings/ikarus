Template.home.created = function(){
  Meteor.subscribe('MySquad');
  Meteor.subscribe('Servers');
};

Template.home.helpers({
  squadOnServer: function() {
    return dic.get('SquadOnServerService').getSquadOnServerForCurrentPlayer();
  }
})
