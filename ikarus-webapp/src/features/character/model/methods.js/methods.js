Meteor.methods({
  changeAppearance: function(gear) {
    var player = Player.getCurrent();

    if (! player) {
      throw new Meteor.Error(404, "Player not found");
    }

    dic.get('AppearanceService').changeAppearance(player, gear);
  }
})