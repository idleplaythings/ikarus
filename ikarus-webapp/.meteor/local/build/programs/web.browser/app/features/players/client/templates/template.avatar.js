(function(){
Template.__checkName("players_avatar");
Template["players_avatar"] = new Template("Template.players_avatar", (function() {
  var view = this;
  return HTML.IMG({
    src: function() {
      return Spacebars.mustache(view.lookup("avatarUrl"));
    }
  });
}));

})();
