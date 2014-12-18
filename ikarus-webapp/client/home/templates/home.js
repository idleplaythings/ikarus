Template.home.created = function(){
  Meteor.subscribe('MySquad');
  Meteor.subscribe('Servers');
};

Template.home.helpers({
  company: function() {
    return dic.get('CompanyRepository').getByPlayer(
      Player.getCurrent()
    );
  },

  squad: function() {
    var player = Player.getCurrent();
    if (! player)
      return null;

    return Squad.getByPlayer(player);
  },
});

Template.home.events({
  'click .add-to-inventory': function(event, template){
    var armaClass = jQuery(event.target).attr("data-armaclass");
    console.log("add", armaClass);
    Meteor.call(
      'addToInventory',
      armaClass,
      function (error, result){}
    );
  },

  'click .remove-from-inventory': function(event, template){
    var armaClass = jQuery(event.target).attr("data-armaclass");
    console.log("remove", armaClass);
    Meteor.call(
      'removeFromInventory',
      armaClass,
      function (error, result){}
    );
  }
})

