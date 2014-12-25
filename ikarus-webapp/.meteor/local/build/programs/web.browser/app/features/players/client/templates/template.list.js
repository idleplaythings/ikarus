(function(){
Template.__checkName("players_list");
Template["players_list"] = new Template("Template.players_list", (function() {
  var view = this;
  return HTML.DIV("\n    ", HTML.TABLE("\n      ", HTML.THEAD("\n        ", HTML.TR("\n          ", HTML.TH("Name"), "\n        "), "\n      "), "\n      ", HTML.TBODY("\n        ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("getPlayers"));
  }, function() {
    return [ "\n          ", HTML.TR("\n            ", HTML.TD(Blaze.View(function() {
      return Spacebars.mustache(view.lookup("name"));
    })), "\n          "), "\n        " ];
  }, function() {
    return [ "\n          ", HTML.TR("\n            ", HTML.TD({
      colspan: "1"
    }, "No players found."), "\n          "), "\n        " ];
  }), "\n      "), "\n    "), "\n  ");
}));

})();
