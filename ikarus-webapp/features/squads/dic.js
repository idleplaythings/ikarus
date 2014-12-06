dic.register('SquadRepository', function (dic) {
  return new SquadRepository(
    collections.SquadCollection
  );
}, {shared: true});

dic.register('SquadMemberRepository', function (dic) {
  return new SquadMemberRepository(
    collections.SquadMemberCollection,
    dic.get('InventoryFactory')
  );
}, {shared: true});