Router.map(function () {
  this.route('/company/:_id', {
    name: 'company',
    template: 'companies_status',
    layoutTemplate: 'ikarus_default',
    data: function() {
      return {
        companyId: this.params._id
      }
    },

    subscriptions: function () {
      return [
        Meteor.subscribe('MyCompanyAndSquads'),
        Meteor.subscribe('Company', this.params._id),
        Meteor.subscribe('UserData')
      ];
    }
  });

  this.route('/companies', {
    name: 'companies',
    template: 'companies_list',
    layoutTemplate: 'ikarus_default',

    subscriptions: function () {
      return [
        Meteor.subscribe('Companies')
      ];
    }
  });
});