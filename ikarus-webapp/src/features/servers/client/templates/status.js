Template.servers_status.onCreated(function () {
  this.subscribe('Users');
  this.subscribe('Servers');
  this.subscribe('Companies');
});

Template.servers_status.helpers({
  server: function () {
    return Server.getById(this.serverId);
  }
});


var debouncedServerSetting = _.debounce(setServerSetting, 500);

Template.servers_status.events({
  'keyup .serverSetting': function(event, status) {
    var target = jQuery(event.target).attr("data-target");
    var serverId = jQuery(event.target).attr("data-serverId");
    debouncedServerSetting(serverId, target);
  }
});

function setServerSetting(serverId, target) {
  var value = jQuery(".serverSetting."+target).val();
  console.log(target, value);

  var settings = {};
  settings[target] = value;

  Meteor.call('SetServerSetting', serverId, settings);
};