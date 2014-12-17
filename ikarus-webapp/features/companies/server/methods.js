Meteor.methods({
  createCompany: function(name) {
    // @todo validation does not belong here
    if (! name || name.length < 5) {
      return;
    }

    var companyRepo = dic.get('CompanyRepository');
    var playerRepo = dic.get('PlayerRepository');

    var company = companyRepo.create(name);
    company.addPlayer(playerRepo.getCurrent());
  },

  inviteToCompany: function(playerName, companyId) {
    var companyRepo = dic.get('CompanyRepository');
    var playerRepo = dic.get('PlayerRepository');

    var company = companyRepo.getById(companyId);

    var playerToInvite = playerRepo.getByName(playerName);

    if (! playerToInvite || playerToInvite.hasInvite(company) || companyRepo.getByPlayer(playerToInvite)) {
      throw new Meteor.Error(404, 'Player not found, already belongs to a company, or already has an invite');
    }

    playerRepo.inviteToCompany(playerToInvite, company)
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
