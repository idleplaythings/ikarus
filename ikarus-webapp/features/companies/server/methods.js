Meteor.methods({
  createCompany: function(name){
    // @todo validation does not belong here
    if (! name || name.length < 5) {
      return;
    }

    var companyRepo = dic.get('CompanyRepository');
    var playerRepo = dic.get('PlayerRepository');

    var company = companyRepo.create(name);
    company.addPlayer(playerRepo.getCurrent());
    companyRepo.persist(company);
    playerRepo.updateCurrentCompanyId(company);
  },

  inviteToCompany: function(name){
    var companyRepo = dic.get('CompanyRepository');
    var playerRepo = dic.get('PlayerRepository');

    var company = companyRepo.getByPlayer(playerRepo.getCurrent());
    var playerToInvite = playerRepo.getByName(name);

    if (! playerToInvite || playerToInvite.hasInvite(company) || companyRepo.getByPlayer(playerToInvite)){
      throw new Meteor.Error(404, 'Player not found, already belongs to a company, or already has an invite');
    }

    playerRepo.inviteToCompany(playerToInvite, company)
  },

  joinCompany: function(companyId) {
    var companyRepo = dic.get('CompanyRepository');
    var playerRepo = dic.get('PlayerRepository');

    var company = companyRepo.getById(companyId);

    if (! company){
      throw new Meteor.Error(404, "Company not found");
    }

    company.addPlayer(playerRepo.getCurrent());
    companyRepo.persist(company);
    playerRepo.updateCurrentCompanyId(company);
  }
});
