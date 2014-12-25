(function(){Template.players_name.helpers({
  name: function() {
    if (this.name) {
      return this.name;
    }

    return null;
  }
});

})();
