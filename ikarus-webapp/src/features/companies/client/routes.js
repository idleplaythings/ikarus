Router.map(function () {
  this.route('/company/:_id', {
    name: 'company',
    template: 'companies_status',
    layoutTemplate: 'ikarus_default',
    data: function() {
      return {
        companyId: this.params._id
      }
    }
  });
});