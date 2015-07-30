Template.ikarus_default.onCreated(function() {
  this.subscribe('UserData');
  this.subscribe('MyCompanyAndSquads');
  this.subscribe('Servers');
  this.subscribe('MyCompanyGameEnds');
});

Template.ikarus_default.helpers({
  noSteamConfigured: function() {
    return Accounts.loginServiceConfiguration.find({ service: 'steam' }).count() === 0;
  },

  gamesActive: function () {
    return Server.getAllPlaying().length;
  }
});

Template.ikarus_default.events({
  'click .js-reset': function() {
    Meteor.call('testing_removeFixtures');
    Meteor.call('testing_createDataSet');
  },

  'mouseenter .show-item-tooltip-small': showItem,
  'mouseleave .show-item-tooltip-small': hideItem,
  'mouseenter .show-item-tooltip-small img': hideItem
});

var itemTooltip = null;

function showItem(event, template) {

  if (itemTooltip) {
    return;
  }

  var $elem = jQuery(event.target);
  var armaClass = event.target.attributes.getNamedItem('data-armaclass').value;
  var $parent = $elem.parent();

  itemTooltip = Blaze.renderWithData(
    Template.itemTooltipSmall,
    {armaClass: armaClass},
    //$parent[0],
    $elem[0]
  );
}

function hideItem(event, template) {
  if (itemTooltip) {
    Blaze.remove(itemTooltip);
    itemTooltip = null;
  }
}