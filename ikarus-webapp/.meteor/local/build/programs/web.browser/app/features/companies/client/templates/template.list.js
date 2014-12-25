(function(){
Template.__checkName("companies_list");
Template["companies_list"] = new Template("Template.companies_list", (function() {
  var view = this;
  return HTML.DIV(HTML.Raw("\n    <h2>Companies</h2>\n\n    "), HTML.TABLE("\n      ", HTML.THEAD("\n        ", HTML.TR("\n          ", HTML.TH("Name"), "\n          ", HTML.TH("Players"), "\n          ", Blaze.If(function() {
    return Spacebars.call(view.lookup("debug"));
  }, function() {
    return [ "\n            ", HTML.TH("Debug"), "\n          " ];
  }), "\n        "), "\n      "), "\n      ", HTML.TBODY("\n        ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("companies"));
  }, function() {
    return [ "\n          ", HTML.TR("\n            ", HTML.TD(Blaze.View(function() {
      return Spacebars.mustache(view.lookup("name"));
    })), "\n            ", HTML.TD(Blaze.View(function() {
      return Spacebars.mustache(view.lookup("playerCount"));
    })), "\n            ", Blaze.If(function() {
      return Spacebars.call(view.lookup("debug"));
    }, function() {
      return [ "\n              ", HTML.TD(HTML.BUTTON({
        "class": "js-request-invite",
        "data-company-id": function() {
          return Spacebars.mustache(view.lookup("_id"));
        }
      }, "Request Invite")), "\n            " ];
    }), "\n          "), "\n        " ];
  }, function() {
    return [ "\n          ", HTML.TR("\n            ", HTML.TD({
      colspan: "4"
    }, "No companies found."), "\n          "), "\n        " ];
  }), "\n      "), "\n    "), "\n  ");
}));

})();
