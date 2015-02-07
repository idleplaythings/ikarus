Template.squads_status.created = function () {
  Meteor.subscribe('MyCompanyAndSquads');

  Tracker.autorun(function(){
    var squad = Squad.getCurrent();
    if (squad) {
      Meteor.subscribe('SquadInventory', squad._id);
    }
  });
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
  },

  squadInventoryView: function() {
    var view = new InventoryView({
      sourceInventory: Inventory.getByCompany(Company.getCurrent()),
      targetInventory: Inventory.getBySquad(Squad.getCurrent())
    });

    view.addGroup(new InventoryColumn({
      title: 'Primary Weps',
      policy: function(itemWrapper) {
        return itemWrapper.item.hasTags(['rifle', 'assault-rifle', 'sniper-rifle', 'smg', 'lmg', 'mmg']);
      },
      sort: function(itemWrapperA, itemWrapperB) {
        var nameA = itemWrapperB.item.name.toLowerCase();
        var nameB = itemWrapperA.item.name.toLowerCase();

        return nameB.localeCompare(nameA);
      }
    }));

    view.addGroup(new InventoryColumn({
      title: 'Support Weps',
      policy: function(itemWrapper) {
        return itemWrapper.item.hasTags(['law', 'rpg', 'grenade-launcher', 'grenade']);
      },
      sort: function(itemWrapperA, itemWrapperB) {
        var nameA = itemWrapperB.item.name.toLowerCase();
        var nameB = itemWrapperA.item.name.toLowerCase();

        return nameB.localeCompare(nameA);
      }
    }));

    view.addGroup(new InventoryColumn({
      title: 'Secondary Weps',
      policy: function(itemWrapper) {
        return itemWrapper.item.hasTags(['handgun']);
      },
      sort: function(itemWrapperA, itemWrapperB) {
        var nameA = itemWrapperB.item.name.toLowerCase();
        var nameB = itemWrapperA.item.name.toLowerCase();

        return nameB.localeCompare(nameA);
      }
    }));

    view.addGroup(new InventoryColumn({
      title: 'Gear & Sights',
      policy: function(itemWrapper) {
        return itemWrapper.item.hasTags(['helmet', 'tactical-vest', 'backpack', 'binoculars', 'scope', 'sight']);
      },
      sort: function(itemWrapperA, itemWrapperB) {
        var nameA = itemWrapperB.item.name.toLowerCase();
        var nameB = itemWrapperA.item.name.toLowerCase();

        return nameB.localeCompare(nameA);
      }
    }));

    view.refresh();

    return view;
  }
});

Template.squads_status.events({
  'click .createSquad' : function () {
    Meteor.call('createSquad');
    evaluateSquads();
  },
  'click .joinSquad' : function () {
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
  'click .toggleReady' : function () {
    var player = Player.getCurrent();
    Meteor.call('setPlayerReady', !player.isReady());
  },
  'click .joinQueue' : function () {
    Meteor.call('enterSquadQueue');
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
