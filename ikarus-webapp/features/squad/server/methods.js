Meteor.methods({
  ChangeStartingLocation: function(squadOnServerId, location){
    var squadService = dic.get('SquadOnServerService');
    var squad = squadService.getSquadOnServerForCurrentPlayer();

    if (squad._id !== squadOnServerId) {
      throw new Meteor.Error(404, 'Squad on server not found');
    }

    if (squad.locked) {
      return;
    }

    squad.startingLocation = location;

    squadService.save(squad);
  }

});
