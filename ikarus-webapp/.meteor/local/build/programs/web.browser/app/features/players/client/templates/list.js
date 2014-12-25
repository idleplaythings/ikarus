(function(){Template.players_list.helpers({
  players: function() {
    if (typeof this.getPlayers === 'function') {
      return this.getPlayers()
    }

    return null;
  },
});

})();
