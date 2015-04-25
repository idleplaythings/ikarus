dic.register('ServerQueueService', function (dic) {
  return new ServerQueueService(
    dic.get('QueueSquadService'),
    dic.get('ServerFinder')
  );
}, {shared: true});

dic.register('QueueSquadService', function (dic) {
  return new QueueSquadService();
}, {shared: true});

dic.register('ServerFinder', function (dic) {
  return new ServerFinder();
}, {shared: true});