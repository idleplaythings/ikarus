(function(){
Template.__checkName("squads_status");
Template["squads_status"] = new Template("Template.squads_status", (function() {
  var view = this;
  return HTML.DIV(HTML.Raw("\n    <h2>Squad</h2>\n    "), Blaze.If(function() {
    return Spacebars.call(view.lookup("squad"));
  }, function() {
    return [ "\n      ", HTML.DIV({
      "class": "container-fluid"
    }, "\n        ", HTML.DIV({
      "class": "row"
    }, "\n          ", Spacebars.With(function() {
      return Spacebars.call(view.lookup("squad"));
    }, function() {
      return [ "\n            ", HTML.DIV({
        "class": "col-md-4"
      }, "\n              ", HTML.H3("Hideout"), "\n              ", Spacebars.include(view.lookupTemplate("startLocation")), "\n            "), "\n            ", HTML.DIV({
        "class": "col-md-4"
      }, "\n              ", Spacebars.include(view.lookupTemplate("squadMemberInventory")), "\n            "), "\n          " ];
    }), "\n          ", HTML.DIV({
      "class": "col-md-4"
    }, "\n            ", HTML.H3("Armory"), "\n            ", Spacebars.With(function() {
      return Spacebars.call(view.lookup("company"));
    }, function() {
      return [ "\n              ", Spacebars.include(view.lookupTemplate("armory")), "\n            " ];
    }), "\n          "), "\n\n        "), "\n      "), "\n    " ];
  }, function() {
    return [ "\n      ", HTML.P("You are not a member of a squad. Connect to a server to join a squad."), "\n    " ];
  }), "\n  ");
}));

})();
