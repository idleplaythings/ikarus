Template.serverStatus.helpers({
  created: function() {
    Meteor.subscribe('serverStatus');
  },
  servers: function() {
    return dic.get('ServerRepository').getAll();
  },
});

Template.serverStatus.events({
  'click .js-server-register': function(event, template) {
    Meteor.call('registerServer', template.find('[name=server-name]').value);
  },
  'click .js-server-connect': function(event, template) {
    Meteor.call(
      'playerConnected',
      jQuery(event.target).data('serverName'),
      dic.get('PlayerRepository').getCurrent().steamId
    );
  },
  'click .js-server-disconnect': function(event, template) {
    Meteor.call(
      'playerDisconnected',
      jQuery(event.target).data('serverName'),
      dic.get('PlayerRepository').getCurrent().steamId
    );
  },
});