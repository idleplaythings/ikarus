Template.servers_list.created = function () {
  Meteor.subscribe('Servers');
};

Template.servers_list.destroyed = function () {
  if (! this.countdowners) {
    Object.keys(this.countdowners).forEach(function (key) {
      this.countdowners[key].stop();
    });
  }
};

Template.servers_list.helpers({
  created: function() {
    Meteor.subscribe('serverStatus');
  },
  servers: function() {
    return Server.getAll();
  },

  getTimePlayed: function() {
    if (this.isPlaying()){
      return getCountdowner(Template.instance(), this).getTime();
    }

    return "";
  }
});

function getCountdowner(template, server) {
  if (! template.countdowners) {
    template.countdowners = {};
  }

  if (! template.countdowners[server.getName()]) {
    template.countdowners[server.getName()] = new Countdowner(function(){
      return server.getStatusChanged();
    });
  }

  return template.countdowners[server.getName()];
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