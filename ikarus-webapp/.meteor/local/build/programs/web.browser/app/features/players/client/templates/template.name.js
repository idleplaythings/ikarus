(function(){
Template.__checkName("players_name");
Template["players_name"] = new Template("Template.players_name", (function() {
  var view = this;
  return HTML.SPAN({
    "class": "players-name"
  }, Blaze.View(function() {
    return Spacebars.mustache(view.lookup("name"));
  }));
}));

})();
