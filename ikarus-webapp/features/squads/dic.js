dic.register('SquadRepository', function (dic) {
  return new SquadRepository(
    collections.SquadCollection
  );
}, {shared: true});
