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
});

Template.home.events({
  'click .add-to-inventory': function(event, template){
    var armaClass = jQuery(event.target).data().armaclass;
    Meteor.call(
      'addToInventory',
      armaClass,
      function (error, result){}
    );
  },

  'click .remove-from-inventory': function(event, template){
    var armaClass = jQuery(event.target).data().armaclass;
    Meteor.call(
      'removeFromInventory',
      armaClass,
      function (error, result){}
    );
  }
})

