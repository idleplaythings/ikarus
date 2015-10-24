dic.register('LootFactory', function (dic) {
  return new LootFactory(dic.get('ItemFactory'));
}, {shared: true});