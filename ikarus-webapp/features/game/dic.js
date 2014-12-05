dic.register('GameController', function (dic) {
  return new GameController(
    dic.get('PlayerRepository'),
    dic.get('GameServerRepository'),
    dic.get('CompanyService'),
    dic.get('SquadOnServerService')
  );
}, {shared: true});
