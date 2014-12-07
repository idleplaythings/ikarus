Template.home.created = function(){
  Meteor.subscribe('MySquad');
  Meteor.subscribe('Servers');
};

Template.home.helpers({
  company: function() {
    return dic.get('CompanyRepository').getByPlayer(
      dic.get('PlayerRepository').getCurrent()
    );
  },

  squad: function() {
    var player = dic.get('PlayerRepository').getCurrent();
    if (! player)
      return null;

    return dic.get('SquadRepository').getByPlayer(player);
  },
})
