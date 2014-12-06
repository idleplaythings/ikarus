dic.register('GameController', function (dic) {
  return new GameController(
    dic.get('PlayerRepository'),
    dic.get('GameServerRepository'),
    dic.get('CompanyRepository'),
    dic.get('SquadRepository')
  );
}, {shared: true});
