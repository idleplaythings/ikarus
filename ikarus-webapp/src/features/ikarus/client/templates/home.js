Template.home.created = function() {
  Meteor.subscribe('MySquad');
  Meteor.subscribe('Servers');
  Meteor.subscribe('Users');
};

Template.home.helpers({
  playerListContext: function() {
    return {
      getPlayers: function() {
        return Player.getAll();
      }
    }
  }
});

Template.home.events({
  'click .add-to-inventory': function(event, template){
    var armaClass = jQuery(event.target).attr("data-armaclass");
    Meteor.call(
      'addToInventory',
      armaClass,
      function (error, result) {
        if (error) {
          alert(error)
        }
      }
    );
  }
})

