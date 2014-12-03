dic.register('SquadService', function (dic) {
  return new SquadService(
    dic.get('UserService'),
    dic.get('SquadRepository')
  );
}, {shared: true});

dic.register('SquadRepository', function (dic) {
  return new SquadRepository(
    collections.SquadCollection
  );
}, {shared: true});