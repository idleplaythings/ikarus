Template.squads_status.helpers({
  companyHasSquad: function () {
    return getCompanysSquads().length > 0;
  },

  companysSquads: function () {
    return getCompanysSquads();
  },

  joinableSquads: function () {
    return getCompanysSquads().filter(function(squad){
      return ! squad.isLocked() && squad.getSteamIds().length < Squad.MAX_MEMBERS;
    })
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
  if (! this.countdowners) {
    Object.keys(this.countdowners).forEach(function (key) {
      this.countdowners[key].stop();
    });
  }
};

Template.squad_queue_status.helpers({
  inQueue: function() {
    return ServerQueue.getBySquad(Squad.getCurrent());
  },

  inGameServer: function() {
    var server = Server.getByInGameSquad(Squad.getCurrent());
    return server && server.isWaiting();
  },

  notInQueueOrGame: function(){
    var squad = Squad.getCurrent();
    return ! ServerQueue.getBySquad(Squad.getCurrent()) && ! Server.getByInGameSquad(squad);
  },

  getTimeToJoinServer: function () {
    var server = Server.getByInGameSquad(Squad.getCurrent());
    if ( server && server.isWaiting()) {
      return getCountdowner(Template.instance(), this).getTime();
    }
    return "";
  }
});

function getCountdowner(template, squad) {
  if (! template.countdowners) {
    template.countdowners = {};
  }

  if (! template.countdowners[squad._id]) {
    template.countdowners[squad._id] = new Countdowner(function(){
      return squad.getConnectionDeadline();
    },
    "mm:ss");
  }

  return template.countdowners[squad._id];
};

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