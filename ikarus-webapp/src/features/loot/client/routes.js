Router.map(function () {
  this.route('/loot/:_name', {
    name: 'loot',
    template: 'loot',
    layoutTemplate: 'ikarus_default',

    data: function() {
      return dic.get('LootFactory').create(this.params._name);
    },
  });
});