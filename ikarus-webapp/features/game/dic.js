dic.register('GameController', function (dic) {
  return new GameController(
    dic.get('PlayerRepository'),
    dic.get('ServerRepository'),
    dic.get('CompanyRepository'),
    dic.get('SquadRepository'),
    dic.get('InventoryRepository')
  );
}, {shared: true});

dic.register('LootController', function (dic) {
  return new LootController(
    dic.get('SquadRepository'),
    dic.get('CompanyRepository'),
    dic.get('ItemFactory'),
    dic.get('InventoryRepository'),
    dic.get('Dice')
  );
}, {shared: true});
