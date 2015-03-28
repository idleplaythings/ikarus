Router.map(function () {
  this.route('/company/:_id/base', {
    name: 'company base',
    template: 'base_status',
    layoutTemplate: 'ikarus_default',

    action: function() {
      if (this.ready()) {
        var company = Company.getById(this.params._id);
        var player = Player.getCurrent();

        if (! company) {
          Router.go('home');
          return;
        }

        if (! player.isMemberOf(company)) {
          Router.go('company', {_id: this.params._id});
          return;
        }

        this.render();
      }
    },

    data: function() {
      if (this.ready()){
        return Company.getById(this.params._id)
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