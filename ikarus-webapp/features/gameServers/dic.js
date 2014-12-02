dic.register('GameServerService', function (dic) {
  return new GameServerService(
    dic.get('GameServerRepository')
  );
}, {shared: true});

dic.register('GameServerRepository', function (dic) {
  return new GameServerRepository(
    collections.GameServerCollection
  );
}, {shared: true});