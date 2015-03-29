Template.companies_company.onCreated(function () {
  this.subscribe('MyCompaniesAndSquads');
});

Template.companies_company.helpers({
  companyName: function() {
    var company = Company.getCurrent();

    if (company) {
      return company.getName();
    }

    return null;
  },
  companyContext: function() {
    var company = Company.getCurrent();

    if (company) {
      return {
        companyId: company._id
      }
    }

    return null;
  }
});