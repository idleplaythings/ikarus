dic.register('GameController', function (dic) {
  return new GameController(
    dic.get('InventoryRepository')
  );
}, {shared: true});

dic.register('LootController', function (dic) {
  return new LootController(
    dic.get('ItemFactory'),
    dic.get('InventoryRepository'),
    dic.get('Dice')
  );
}, {shared: true});
