var autorunHandle = null;

Template.nextGameAvailable.onCreated(function () {
  this.subscribe('Servers');
  this.subscribe('MyCompanyAndSquads');
  this.subscribe('serverStatus');

  Tracker.autorun(function () {
    var player = Player.getCurrent();
    var waitingServers = Server.getAllWaiting().length;
    var numberOfWaiting = getAmountOfWaitingServersOnLastCheck();

    Tracker.afterFlush(function () {
      setAmountOfWaitingServersOnLastCheck(waitingServers);

      if (numberOfWaiting === null || waitingServers <= numberOfWaiting) {
        return;
      }

      Meteor.call('shouldNotify', function (error, result) {
        if (result) {
          notify();
        }
      });
    });
  });
});

Template.nextGameAvailable.onDestroyed(function () {
  if (autorunHandle !== null) {
    autorunHandle.stop();
    autorunHandle = null;
  }
});

function getAmountOfWaitingServersOnLastCheck () {
  var amount = Session.get('amountOfWaitingServers');
  if (amount === undefined) {
    return null;
  }

  return amount;
};

function setAmountOfWaitingServersOnLastCheck (amount) {
  Session.set('amountOfWaitingServers', amount);
};

function notify () {
  if (! Notification) {
    return;
  }

  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {

    var time = moment().format("H:mm:ss");
    var notification = new Notification(
      'Ikarus game ' + time,
      {
        icon: 'https://ikarus.idleplaythings.com/logo-small-round_blue2.png',
        body: "Ikarus game is waiting for players or reinforcements."
      }
    );

    notification.onclick = function () {
      window.open("https://ikarus.idleplaythings.com");
    };

    Meteor.setTimeout(notification.close.bind(notification), 1000*60*30);
  }
}

function canJoin() {
  var squad = Squad.getCurrent();
  if (! squad) {
    return false;
  }

  var server = Server.getByInGameSquad(squad);
  var player = Player.getCurrent();

  if (! player || ! server || server.isDead(player)) {
    return false;
  }
  return server.isWaiting() || server.isPlaying();
}

function canReinforce (server) {
  var squad = Squad.getCurrent();

  return squad ? server.canReinforce(squad) : server.canReinforceWithoutSquad();
}

Template.nextGameAvailable.helpers({

  canJoin: canJoin,

  inGameServer: function () {
    var squad = Squad.getCurrent();

    if (! squad) {
      return false;
    }

    return Server.getByInGameSquad(squad);
  },

  nextGameClass: function () {
    var server = getNextServer();
    dependency.depend();

    if (! server || server.isDown() || ! server.getStatus()) {
      return 'danger';
    }

    if (server.isIdle()) {
      var squadsInQueue = ServerQueue.getByRegion('EU').getLength();
      var need = server.getSquadsRemainingToStart() - squadsInQueue;
      if (need == 1) {
        return 'success';
      }
    }

    if (server.isWaiting()) {
      return "success";
    }

    if (canReinforce(server)) {
      return "success";
    }

    return "";
  },

  text: function () {
    dependency.depend();

    var server = getNextServer();

    if (! server || server.isDown() || ! server.getStatus()) {
      return 'No servers available';
    }

    if (server.isPlaying()) {
      return '~ ' + Math.round(server.getTimeRemainingToApproximateGameEnd() / 60 )+ " minutes.";
    }

    if (server.isIdle()) {
      var squadsInQueue = ServerQueue.getByRegion('EU').getLength();
      var need = server.getSquadsRemainingToStart();
      return 'Need ' + (need - squadsInQueue) + " more squads";
    }

    if (server.isWaiting()) {
      return server.getStartTimeLeft() + " seconds.";
    }

    if (canReinforce(server)) {
      return "Reinforce now!";
    }

    return "";
  }
});

function getNextServer() {
  var squad = Squad.getCurrent();
  return dic.get('ServerFinder').getNextServer(squad);
};

function changeDependency(dependency) {
  var loop = function () {
    dependency.changed();
    Meteor.setTimeout(loop, 1000);
  };

  Meteor.setTimeout(loop, 1000);
};

var dependency = new Tracker.Dependency();
changeDependency(dependency);