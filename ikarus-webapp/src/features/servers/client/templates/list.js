Template.servers_list.helpers({
  created: function() {
    Meteor.subscribe('serverStatus');
  },
  servers: function() {
    return Server.getAll();
  },
});

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