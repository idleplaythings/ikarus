Meteor.methods({
  'changeStartingLocation': function(squadId, location) {
    var squadRepository = dic.get('SquadRepository');
    var player = dic.get('PlayerRepository').getCurrent();
    var squad = squadRepository.getByPlayer(player);

    console.log(squad);

    if (!squad || squad._id !== squadId) {
      throw new Meteor.Error(404, 'Squad on server not found');
    }

    if (squad.isLocked()) {
      return;
    }

    squad.startingLocation = location;

    squadRepository.persist(squad);
  }
});
