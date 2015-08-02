dic.register('CombatLogFactory', function (dic) {
  return new CombatLogFactory(
    dic.get('ItemFactory')
  );
}, {shared: true});
