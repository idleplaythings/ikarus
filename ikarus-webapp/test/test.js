var util = require('./util');
var fixtures = require('./fixtures');
var ddpClient = require('./ddp').ddpClient;

describe('something', function() {
  beforeEach(function(done) {
    function onConnection() {
      util.info('DDP connection opened');
    }

    function onSubscribe() {
      util.info('Subscribed to testing publication');
    }

    connect()
      .then(onConnection)
      .then(subscribe('testing', []))
      .then(onSubscribe)
      .then(done)
      .catch(handleError)
  });

  afterEach(function(done) {
    removeTestUsers()
      .then(done);
  })

  it('logs in as test user', function(done) {
    createUser('testiukko', '123123123', 'salakala')
      .then(login('testiukko', 'salakala'))
      .then(done)
      .catch(handleError);
  })


});

var connect = util.asPromised(ddpClient.connect, ddpClient);
var subscribe = util.asPromised(ddpClient.subscribe, ddpClient);
var createUser = util.asPromised(fixtures.callCreateUser(ddpClient));
var login = util.asPromised(fixtures.callLogin(ddpClient));
var removeTestUsers = util.asPromised(fixtures.callRemoveTestUsers(ddpClient));

function handleError(error) {
  util.error(error);
}
