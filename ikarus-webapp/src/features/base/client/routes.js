Router.map(function () {
  this.route('/company/base', {
    name: 'company base modules',
    template: 'base_modules',
    layoutTemplate: 'ikarus_default',

    action: function() {
      if (this.ready()) {
        var company = Company.getCurrent();

        if (! company) {
          Router.go('home');
          return;
        }

        this.render();
      }
    },

    data: function() {
      if (this.ready()){
        return Company.getCurrent();
      }
    },

    subscriptions: function () {
      return [
        Meteor.subscribe('MyCompanyAndSquads'),
        Meteor.subscribe('UserData')
      ];
    }
  });

  this.route('/company/baseLocation', {
    name: 'company base location',
    template: 'base_location',
    layoutTemplate: 'ikarus_default',

    action: function() {
      if (this.ready()) {
        var company = Company.getCurrent();

        if (! company) {
          Router.go('home');
          return;
        }

        this.render();
      }
    },

    data: function() {
      if (this.ready()){
        return Company.getCurrent();
      }
    },

    subscriptions: function () {
      return [
        Meteor.subscribe('MyCompanyAndSquads'),
        Meteor.subscribe('UserData')
      ];
    }
  });
});