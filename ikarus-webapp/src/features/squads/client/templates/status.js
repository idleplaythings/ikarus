Template.squads_status.created = function () {
  Meteor.subscribe('MyCompanyAndSquads');
};

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
  }
});

Template.squads_status.events({
  'click .createSquad' : function () {
    Meteor.call('createSquad');
  },
  'click .joinSquad' : function () {
    var squadId = jQuery(event.target).attr("data-squadId");
    console.log(squadId);
    Meteor.call('joinSquad', squadId);
  },
  'click .leaveSquad' : function () {
    Meteor.call('leaveSquad');
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
    return server && server.isWaiting();
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
  'click .joinQueue' : function () {
    Meteor.call('enterSquadQueue');
  },
  'click .leaveQueue' : function () {
    Meteor.call('leaveSquadQueue');
  }
});

function getCompanysSquads () {
  var company = Company.getCurrent();

  if (! company) {
    return [];
  }

  return Squad.getByCompany(company);
}