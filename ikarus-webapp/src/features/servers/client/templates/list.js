Template.servers_list.created = function () {
  Meteor.subscribe('Servers');
};

var countdowners = {};

Template.servers_list.destroyed = function () {

  Object.keys(countdowners).forEach(function (key) {
    countdowners[key].stop();
  });

  countdowners = {};
};

Template.servers_list.helpers({
  created: function() {
    Meteor.subscribe('serverStatus');
  },
  servers: function() {
    return Server.getAll();
  },

  getTimePlayed: function() {
    var server = this;
    var time = server.getStatusChanged();
    if (this.isPlaying()){
      return getCountdowner(this, time).getTime();
    }

    return "";
  }
});

function getCountdowner(server, time) {
  if (! countdowners) {
    countdowners = {};
  }

  if (countdowners[server.getName()]) {
    countdowners[server.getName()].stop();
  }

  countdowners[server.getName()] = new Countdowner(function(){
    return time;
  });


  return countdowners[server.getName()];
};

Template.servers_list.events({
  'click .js-server-register': function(event, template) {
    Meteor.call('registerServer', template.find('[name=server-name]').value);
  },
  'click .js-server-connect': function(event, template) {
    Meteor.call(
      'playerConnected',
      jQuery(event.target).data('serverName'),
      Player.getCurrent().getSteamId()
    );
  },
  'click .js-server-disconnect': function(event, template) {
    Meteor.call(
      'playerDisconnected',
      jQuery(event.target).data('serverName'),
      Player.getCurrent().getSteamId()
    );
  },
});