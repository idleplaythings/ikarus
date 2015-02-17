Meteor.startup(function(){
  Company.getAll().filter(function(company) {
    return company.isEmpty();
  }).forEach(function(company) {
    Inventory.removeByCompany(company);
    company.remove();
  });
});