(function(){Template.companies_list.helpers({
  companies: function() {
    return dic.get('CompanyRepository').getAll();
  },
});

Template.companies_list.events({
  'click .js-request-invite': function(event, template) {
    Meteor.call(
      'inviteToCompany',
      dic.get('PlayerRepository').getCurrent().name,
      jQuery(event.target).data('companyId'),
      function(error, result) {
        console.log(error, result);
      }
    );
  }
})

})();
