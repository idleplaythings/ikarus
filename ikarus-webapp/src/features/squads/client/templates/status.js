Template.squads_status.helpers({
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
  },
  company: function() {
    var player = Player.getCurrent();

    if (!player) {
      return null;
    }

    var company = player.getCompany();

    if (!company) {
      return null;
    }

    return company;
  }
})