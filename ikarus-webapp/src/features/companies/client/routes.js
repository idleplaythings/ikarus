Router.map(function () {
  this.route('/company/sellout', {
    name: 'company sellout',
    template: 'companies_sellout',
    layoutTemplate: 'ikarus_default',

    action: function() {
      if (this.ready()) {
        if (! Company.getCurrent()) {
          Router.go('home');
          return;
        }

        this.render();
      }
    },

    subscriptions: function () {
      return [
        Meteor.subscribe('MyCompanyAndSquads')
      ];
    }
  });

  this.route('/company', {
    name: 'my-company',
    template: 'companies_company',
    layoutTemplate: 'ikarus_default'
  });

  this.route('/companies', {
    name: 'companies',
    template: 'react',
    layoutTemplate: 'ikarus_default',
    action: function () {
      if (this.ready()) {
        Template.react.rendered = function () {
          Template.react.rendered = null;
          ReactDOM.render(React.createElement(CompanyList), document.querySelector('.ikarus-react'));
        };
        this.render();
      }
    }
  });

  this.route('/companies/:_id', {
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

  this.route('/company/players', {
    name: 'company players',
    template: 'company_manage_players',
    layoutTemplate: 'ikarus_default',

    action: function() {
      if (this.ready()) {
        var company = Company.getCurrent();
        if (! company || ! company.isOwner(Player.getCurrent())) {
          Router.go('my-company');
          return;
        }

        this.render();
      }
    },

    data: function () {
      if (this.ready()) {
        return Company.getCurrent();
      }
    },

    subscriptions: function () {
      return [
        Meteor.subscribe('MyCompanyAndSquads')
      ];
    }
  });
});