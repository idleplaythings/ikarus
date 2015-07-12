Template.squads_status.onCreated(function () {
  this.subscribe('MyCompanyAndSquads');

  var self = this;
  Tracker.autorun(function(){
    var squad = Squad.getCurrent();
    if (squad) {
      self.subscribe('SquadInventory', squad._id);
    }
  });
});

Template.squads_status.helpers({
  companyHasSquad: function () {
    return getCompanysSquads().length > 0;
  },

  companysSquads: function () {
    return getCompanysSquads();
  },

  joinableSquads: function () {
    return getCompanysSquads().filter(function(squad){
      return squad.isJoinable();
    });
  },

  reinforceableSquads: function () {
    var player = Player.getCurrent();
    return getCompanysSquads().filter(function(squad){
      return squad.isReinforceable(player);
    });
  },

  squadInventoryView: function() {
    var squadInventoryView = dic.get('SquadInventoryView');
    squadInventoryView.refresh();
    return squadInventoryView;
  }
});

Template.squads_status.events({
  'click .createSquad' : function () {
    Meteor.call('createSquad');
    evaluateSquads();
  },
  'click .joinSquad' : function (event, template) {
    var squadId = jQuery(event.target).attr("data-squadId");
    console.log(squadId);
    Meteor.call('joinSquad', squadId);
    evaluateSquads();
  },
  'click .leaveSquad' : function () {
    Meteor.call('leaveSquad');
    evaluateSquads();
  }
});

Template.squad_queue_status.destroyed = function () {
  if (countdowner) {
    countdowner.stop();
  }
  countdowner = null;
}

Template.squad_queue_status.helpers({
  inQueue: function() {
    var squad = Squad.getCurrent();

    if (! squad) {
      return false;
    }

    return ServerQueue.getBySquad(squad);
  },

  inGameServer: function() {
    var squad = Squad.getCurrent();

    if (! squad) {
      return false;
    }

    return Server.getByInGameSquad(squad);
  },

  canJoinGame: function() {
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
  },

  reinforceableServers: function () {
    var squad = Squad.getCurrent();
    if (! squad) {
      return [];
    }

    return Server.getAllPlaying().filter(function(server) {
      return server.canReinforce(squad);
    });
  },

  notInQueueOrGame: function(){
    var squad = Squad.getCurrent();
    if (! squad) {
      return false;
    }
    return ! ServerQueue.getBySquad(squad) && ! Server.getByInGameSquad(squad);
  },

  getTimeToJoinServer: function () {
    if (countdowner) {
      countdowner.stop();
    }

    var time = Squad.getCurrent().getConnectionDeadline();
    countdowner = new Countdowner(function() {
      return time;
    });
    return countdowner.getTime();
  }
});

var countdowner = null;


Template.squad_queue_status.events({
  'click .toggleReady' : function () {
    var player = Player.getCurrent();
    Meteor.call('setPlayerReady', !player.isReady());
  },
  'click .joinQueue' : function () {
    Meteor.call('enterSquadQueue');
    evaluateSquads();
  },
  'click .reinforce' : function (event, template) {
    var serverId = jQuery(event.target).attr("data-serverId");
    Meteor.call('reinforceServer', serverId);
    evaluateSquads();
  },
  'click .leaveQueue' : function () {
    Meteor.call('leaveSquadQueue');
    evaluateSquads();
  }
});

function getCompanysSquads () {
  var company = Company.getCurrent();

  if (! company) {
    return [];
  }

  return Squad.getByCompany(company);
}

function evaluateSquads() {
  if (isDevMode()) {
    Meteor.call('testingEvaluateSquads', false);
  }
}
