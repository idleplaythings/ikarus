Router.map(function () {
  this.route('/squad', {
    name: 'my-squad',
    template: 'squad_squad',
    layoutTemplate: 'ikarus_default',

    data: function() {
      return {
        search: true
      };
    }
  });
});