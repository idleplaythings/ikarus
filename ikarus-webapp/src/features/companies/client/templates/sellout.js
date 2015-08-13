Template.companies_sellout.events({
  'click .js-sell-out': function () {
    Meteor.call('sellout');
  }
});

Template.companies_sellout.helpers({
  canSellOut: function () {
    var company = Company.getCurrent();

    if (! company) {;
      return false;
    }

    var squads =  Squad.getByCompany(company);

    if (! squads || squads.length === 0) {
      return true;
    }

    return squads.every(function (squad) {
      return ! squad.getServerId();
    });
  },

  renown: function () {
    var company = Company.getCurrent();

    if (! company) {
      return "";
    }

    return company.getRenown();
  },

  money: function () {
    var company = Company.getCurrent();

    if (! company) {
      return "";
    }

    return company.getAmountOfMoneyFromSellout();
  }
});