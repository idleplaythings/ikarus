(function(){
Template.__checkName("startLocation");
Template["startLocation"] = new Template("Template.startLocation", (function() {
  var view = this;
  return [ HTML.Raw('<img id="altis-map" src="/altis.jpg" width="100%" height="100%">\n  <label>Click map to select start location</label>\n  <br>\n  <label>x: </label>'), HTML.INPUT({
    id: "start-location-x",
    type: "text",
    value: function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("startingLocation"), "x"));
    }
  }), HTML.Raw("\n  <label>y: </label>"), HTML.INPUT({
    id: "start-location-y",
    type: "text",
    value: function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("startingLocation"), "y"));
    }
  }) ];
}));

})();
