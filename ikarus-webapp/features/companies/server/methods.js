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
  }
});
