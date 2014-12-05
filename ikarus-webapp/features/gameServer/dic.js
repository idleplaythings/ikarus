dic.register('GameServerRepository', function (dic) {
  return new GameServerRepository(
    collections.GameServerCollection
  );
}, {shared: true});
