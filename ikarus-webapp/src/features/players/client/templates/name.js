Template.players_name.helpers({
  name: function() {
    if (this.getName) {
      return this.getName();
    }
  }
});
