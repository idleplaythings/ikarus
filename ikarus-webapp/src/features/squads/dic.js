dic.register('SquadController', function (dic) {
  return new SquadController(
    dic.get('ServerQueueService')
  );
}, {shared: true});