dic.register('CompanyRepository', function (dic) {
  return new CompanyRepository(
    collections.CompanyCollection
  );
}, {shared: true});
