Template.startLocation.events({
  'click #altis-map': function(event, template){
    var element = jQuery(template.find('#altis-map'));

    var position = {
        x: (event.pageX - element.offset().left) / element.width() * 30000,
        y: (element.height() - (event.pageY - element.offset().top)) / element.height() * 27000 + 1000
    };

    Meteor.call('changeStartingLocation', this._id, position);
  }
});

Template.startLocation.helpers({
  squad: function() {
    var player = Player.getCurrent();

    if (!player) {
      return null;
    }

    var squad = player.getSquad();

    if (!squad) {
      return null;
    }

    return squad;
  }
});