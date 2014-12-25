(function(){Template.players_avatar.helpers({
  avatarUrl: function() {
    if (this.getAvatarUrl) {
      return this.getAvatarUrl();
    }
  }
});

})();
