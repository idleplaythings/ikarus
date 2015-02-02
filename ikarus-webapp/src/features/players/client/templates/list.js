
var debouncedSearch = _.debounce(searchPlayers, 500);
var searchDependency = new Tracker.Dependency();

Template.players_list.events({
  'keyup #search-players': function (event, template) {
    debouncedSearch();
  },

  'click #invite-to-company': function (event, template) {
    var player = Player.getCurrent();
    var company = Company.getByPlayer(player);

    var playerId = jQuery(event.target).attr("data-playerId");

    Meteor.call(
      'inviteToCompany',
      playerId
    );
  }
});

Template.players_list.helpers({
  getPlayers: function () {
    if (this.getPlayers) {
      return this.getPlayers();
    }

    searchDependency.depend();
    var search = jQuery('#search-players').val();

    if (! search) {
      return [];
    }

    return Player.getByPartialName(search);
  },

  canInvite: function (id) {
    if (! Player.getCurrent()) {
      return false;
    }

    if (! Company.getCurrent()) {
      return false;
    }

    var invitee = Player.getByMeteorId(id);

    if (Company.getByPlayer(invitee)) {
      return false;
    }

    if (invitee.hasInvite(Company.getCurrent())) {
      return false;
    }

    return true;
  }
});

function searchPlayers() {
  var search = jQuery('#search-players').val();

  searchDependency.changed();
  if (! search && search.length < 3) {
    return;
  }

  Meteor.subscribe('SearchPlayers', search);
}