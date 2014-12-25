(function(){
Template.__checkName("players_status");
Template["players_status"] = new Template("Template.players_status", (function() {
  var view = this;
  return HTML.DIV("\n    ", HTML.DIV("\n      ", HTML.H2(Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("player"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("players_avatar"));
  }), " ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("player"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("players_name"));
  })), "\n    "), "\n  ");
}));

})();
