dic.register('GameController', function (dic) {
  return new GameController(
    dic.get('ServerQueueService')
  );
}, {shared: true});

dic.register('LootController', function (dic) {
  return new LootController(
    dic.get('ItemFactory'),
    dic.get('Dice')
  );
}, {shared: true});
