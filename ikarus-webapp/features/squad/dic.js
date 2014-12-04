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

dic.register('SquadOnServerRepository', function (dic) {
  return new SquadOnServerRepository(
    collections.SquadsOnServerCollection
  );
}, {shared: true});

dic.register('SquadOnServerService', function (dic) {
  return new SquadOnServerService(
    dic.get('SquadOnServerRepository')
  );
}, {shared: true});