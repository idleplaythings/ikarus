Router.map(function () {
  this.route('/servers', {
    name: 'servers',
    template: 'servers_list',
    layoutTemplate: 'ikarus_default'
  });

  this.route('/servers/:_id', {
    name: 'server',
    template: 'servers_status',
    layoutTemplate: 'ikarus_default',
    data: function() {
      return {
        serverId: this.params._id
      }
    },

    subscriptions: function () {
      var serverId = this.params._id;

      var subs = [];
      subs.push(Meteor.subscribe('MyCompanyAndSquads'));
      subs.push(Meteor.subscribe('Server', serverId));

      var server = Server.getById(serverId);

      if (server) {
        subs.push(Meteor.subscribe('PlayersInList', server.getPlayerIds()));
      }

      return subs;
    }
  });
});