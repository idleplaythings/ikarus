Router.map(function () {
  this.route('/server/:_id', {
    name: 'server',
    template: 'servers_status',
    layoutTemplate: 'ikarus_default',
    data: function() {
      return {
        serverId: this.params._id
      }
    }
  });
});