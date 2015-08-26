Template.nextGameAvailable.onCreated(function () {
  this.subscribe('Servers');
  this.subscribe('MyCompanyAndSquads');
  this.subscribe('serverStatus');
});

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