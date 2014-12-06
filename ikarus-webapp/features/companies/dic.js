dic.register('CompanyRepository', function (dic) {
  return new CompanyRepository(
    collections.CompanyCollection,
    dic.get('InventoryFactory')
  );
}, {shared: true});
