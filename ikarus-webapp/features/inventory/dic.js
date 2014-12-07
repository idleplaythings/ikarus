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

dic.register('InventoryRepository', function (dic) {
  return new InventoryRepository(
    collections.InventoryCollection,
    dic.get('InventoryFactory')
  );
}, {shared: true});