Template.nextGameAvailable.onCreated(function () {
  this.subscribe('Servers');
  this.subscribe('MyCompanyAndSquads');
  this.subscribe('serverStatus');
});

Template.nextGameAvailable.helpers({
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

    return "";
  },

  text: function () {
    var server = getNextServer();
    dependency.depend();

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

    return "";
  }
});

function getNextServer() {
  var squad = Squad.getCurrent();
  return dic.get('ServerFinder').getNextServer();
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