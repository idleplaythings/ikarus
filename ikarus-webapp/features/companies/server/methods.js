Meteor.methods({
  createCompany: function(name) {
    // @todo validation does not belong here
    if (! name || name.length < 5) {
      return;
    }

    var company = Company.create();
    company.setName(name);
    company.addPlayer(Player.getCurrent());
  },

  inviteToCompany: function(playerName, companyId) {
    var company = Company.getById(companyId);
    var player = Player.getByName(playerName);

    if (! player || player.hasInvite(company) || Company.getByPlayer(player)) {
      throw new Meteor.Error(404, 'Player not found, already belongs to a company, or already has an invite');
    }

    company.invite(player);
  },

  joinCompany: function(playerId, companyId) {
    var player = Player.getById(playerId);
    var company = Company.getById(companyId);
    company.addPlayer(player);
  },

  leaveCompany: function(playerId, companyId) {
    var player = Player.getById(playerId);
    var company = Company.getById(companyId);
    company.removePlayer(player);
  }
});
