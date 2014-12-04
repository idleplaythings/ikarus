dic.register('UserService', function (dic) {
  return new UserService();
}, {shared: true});

dic.register('GameController', function (dic) {
  return new GameController(
    dic.get('UserService'),
    dic.get('GameServerService'),
    dic.get('SquadService'),
    dic.get('SquadOnServerService')
  );
}, {shared: true});