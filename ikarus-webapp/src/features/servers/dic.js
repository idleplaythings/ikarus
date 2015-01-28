dic.register('ServerQueueService', function (dic) {
  return new ServerQueueService(
    dic.get('QueueSquadService')
  );
}, {shared: true});

dic.register('QueueSquadService', function (dic) {
  return new QueueSquadService();
}, {shared: true});