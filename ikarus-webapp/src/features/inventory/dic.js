dic.register('ItemFactory', function (dic) {
  return new ItemFactory(
    ItemDefinitions
  );
}, {shared: true});

dic.register('InventoryFactory', function (dic) {
  return new InventoryFactory(
    dic.get('ItemFactory')
  );
}, {shared: true});